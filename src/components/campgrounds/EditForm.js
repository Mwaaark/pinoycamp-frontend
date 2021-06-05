import React, { useEffect, useRef, useState, Fragment } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router";
import useHttp from "../../hooks/use-http";
import bsCustomFileInput from "bs-custom-file-input";

export default function EditForm({
  _id,
  title,
  description,
  location,
  images,
}) {
  const { isLoading, error, sendRequest: sendEditCampground } = useHttp();
  const [validated, setValidated] = useState(false);
  const titleInputRef = useRef();
  const locationInputRef = useRef();
  const descriptionInputRef = useRef();
  const imagesInputRef = useRef();
  const [checkedImages, setCheckedImages] = useState(
    new Array(images.length).fill(false)
  );
  const [forDeletion, setForDeletion] = useState(
    new Array(images.length).fill("")
  );

  const history = useHistory();

  // with bug, unchecked but still remove image
  const onFileChangeHandler = (position, filename) => {
    const updatedCheckedImages = checkedImages.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedImages(updatedCheckedImages);

    const forDeletionHandler = forDeletion.map((item, index) =>
      index === position ? filename : item
    );
    setForDeletion(forDeletionHandler);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const enteredTitle = titleInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const pickedImages = imagesInputRef.current.files;

    if (enteredTitle === "") {
      console.log("Title is required.");
      return;
    }

    if (enteredLocation === "") {
      console.log("Location is required.");
      return;
    }
    if (enteredDescription.length < 5) {
      console.log("Description is required (at least 5 characters long).");
      return;
    }

    const transformData = (responseData) => {
      history.push(`/campgrounds/${_id}`);
    };

    const formData = new FormData();
    formData.append("title", enteredTitle);
    formData.append("location", enteredLocation);
    formData.append("description", enteredDescription);
    for (let i = 0; i < pickedImages.length; i++) {
      formData.append("images", pickedImages[i]);
    }
    formData.append("deleteImages", JSON.stringify(forDeletion));

    sendEditCampground(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${_id}`,
        method: "PUT",
        body: formData,
      },
      transformData
    );
  };

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow" style={{ width: "35rem" }}>
        <Card.Header className="text-center">Edit campground</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form
            onSubmit={onSubmitHandler}
            encType="multipart/form-data"
            validated={validated}
            noValidate
          >
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                ref={titleInputRef}
                defaultValue={title}
                required
              />
              <Form.Control.Feedback type="valid">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                ref={locationInputRef}
                defaultValue={location}
                required
              />
              <Form.Control.Feedback type="valid">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid location.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={descriptionInputRef}
                defaultValue={description}
                minLength={5}
                required
              />
              <Form.Control.Feedback type="valid">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid description (at least 5 characters long).
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Images</Form.Label>
              <Form.File id="images" custom>
                <Form.File.Input
                  accept=".jpg,.png,.jpeg"
                  ref={imagesInputRef}
                  multiple
                />
                <Form.File.Label data-browse="Browse">
                  Add more images
                </Form.File.Label>
              </Form.File>
            </Form.Group>
            <Row>
              {images.map(({ _id, thumbnail, filename }, index) => (
                <Col key={_id}>
                  <Image src={thumbnail} thumbnail />
                  <Form.Group controlId={`image-${index}`}>
                    <Form.Check
                      type="checkbox"
                      label="Delete?"
                      value={filename}
                      checked={checkedImages[index]}
                      onChange={() => onFileChangeHandler(index, filename)}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
            <Button variant="dark" type="submit">
              {isLoading ? (
                <Fragment>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-1"
                  />
                  Editing campground...
                </Fragment>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
