import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import useHttp from "../../hooks/use-http";

export default function EditForm({
  _id,
  title,
  description,
  location,
  images,
}) {
  const [checkedImage, setCheckedImage] = useState(
    new Array(images.length).fill(false)
  );
  const [forDeletion, setForDeletion] = useState(
    new Array(images.length).fill("")
  );

  const titleInputRef = useRef();
  const locatioInputRef = useRef();
  const descriptionInputRef = useRef();
  const imagesInputRef = useRef();

  const { isLoading, error, sendRequest: sendEditCampground } = useHttp();

  const history = useHistory();

  // with bug, unchecked but still remove image
  const handleOnChange = (position, filename) => {
    const updatedCheckedImage = checkedImage.map((item, index) =>
      index === position ? !item : item
    );

    const forDeletionHandler = forDeletion.map((item, index) =>
      index === position ? filename : item
    );

    setCheckedImage(updatedCheckedImage);
    setForDeletion(forDeletionHandler);
  };

  const editCampgroundHandler = async (event) => {
    event.preventDefault();

    let files = imagesInputRef.current.files;

    const transformCampground = (responseData) => {
      history.push(`/campgrounds/${_id}`);
    };

    const formData = new FormData();
    formData.append("title", titleInputRef.current.value);
    formData.append("location", locatioInputRef.current.value);
    formData.append("description", descriptionInputRef.current.value);
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("deleteImages", JSON.stringify(forDeletion));

    sendEditCampground(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${_id}`,
        method: "PUT",
        body: formData,
      },
      transformCampground
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow" style={{ width: "35rem" }}>
        <Card.Header className="text-center">Edit campground</Card.Header>
        <Card.Body>
          {error && <p>{error}</p>}
          <Form onSubmit={editCampgroundHandler} encType="multipart/form-data">
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                ref={titleInputRef}
                defaultValue={title}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                ref={locatioInputRef}
                defaultValue={location}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={descriptionInputRef}
                defaultValue={description}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                id="images"
                label="Image(s):"
                accept=".jpg,.png,.jpeg"
                ref={imagesInputRef}
                multiple
              />
            </Form.Group>
            <div>
              <Row>
                {images.map(({ _id, thumbnail, filename }, index) => (
                  <Col key={_id}>
                    <Image src={thumbnail} thumbnail />
                    <Form.Group controlId={`image-${index}`}>
                      <Form.Check
                        type="checkbox"
                        label="Delete?"
                        value={filename}
                        checked={checkedImage[index]}
                        onChange={() => handleOnChange(index, filename)}
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </div>
            <Button variant="dark" type="submit">
              {isLoading ? "Sending" : "Submit"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
