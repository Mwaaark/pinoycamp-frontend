import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import useHttp from "../../hooks/use-http";
import bsCustomFileInput from "bs-custom-file-input";

export default function NewForm() {
  const { isLoading, error, sendRequest: sendNewCampground } = useHttp();
  const [validated, setValidated] = useState(false);
  const titleInputRef = useRef();
  const locationInputRef = useRef();
  const descriptionInputRef = useRef();
  const imagesInputRef = useRef();

  const history = useHistory();

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
    if (enteredDescription === "") {
      console.log("Description is required (at least 5 characters long).");
      return;
    }

    if (pickedImages.length < 1) {
      console.log("Image is required.");
      return;
    }

    const transformCampground = (responseData) => {
      history.push(`/campgrounds/${responseData.campground._id}`);
    };

    const formData = new FormData();

    formData.append("title", enteredTitle);
    formData.append("location", enteredLocation);
    formData.append("description", enteredDescription);
    for (let i = 0; i < pickedImages.length; i++) {
      formData.append("images", pickedImages[i]);
    }

    sendNewCampground(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/campgrounds`,
        method: "POST",
        body: formData,
      },
      transformCampground
    );
  };

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow" style={{ width: "35rem" }}>
        <Card.Header className="text-center">Create new campground</Card.Header>
        <Card.Body>
          {error && <p>{error}</p>}
          <Form
            onSubmit={onSubmitHandler}
            encType="multipart/form-data"
            validated={validated}
            noValidate
          >
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" ref={titleInputRef} required />
              <Form.Control.Feedback type="valid">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" ref={locationInputRef} required />
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
                required
                minLength={5}
              />
              <Form.Control.Feedback type="valid">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid description (at least 5 characters long).
              </Form.Control.Feedback>
            </Form.Group>
            <div className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.File id="images" custom>
                <Form.File.Input
                  accept=".jpg,.png,.jpeg"
                  ref={imagesInputRef}
                  required
                  multiple
                />
                <Form.File.Label data-browse="Browse">
                  Choose files
                </Form.File.Label>
                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide an image.
                </Form.Control.Feedback>
              </Form.File>
            </div>
            <Button variant="dark" type="submit">
              {isLoading ? "Creating campground..." : "Submit"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
