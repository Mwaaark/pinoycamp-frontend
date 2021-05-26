import React, { useCallback, useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import EditForm from "../../components/campgrounds/EditForm";

export default function Edit() {
  const [campground, setCampground] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const fetchCampgroundHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${id}`
      );
      if (!response.ok) throw new Error("Something went wrong.");

      const data = await response.json();
      if (!data) throw new Error("Found no campgrounds.");

      setCampground(data.campground);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchCampgroundHandler();
  }, [fetchCampgroundHandler]);

  let content;

  if (campground) {
    content = <EditForm {...campground} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }

  return (
    <section>
      <Container>{content}</Container>
    </section>
  );
}
