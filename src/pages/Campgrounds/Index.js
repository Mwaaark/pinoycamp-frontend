import React, { useCallback, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import CampgroundList from "../../components/campgrounds/CampgroundList";

export default function Index() {
  const [campgrounds, setCampgrounds] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCampgroundsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/campgrounds`);
      if (!response.ok) throw new Error("Something went wrong.");

      const data = await response.json();
      if (!data) throw new Error("Found no campgrounds.");

      // const transformedData = data.campgrounds.map(
      //   ({ _id, title, description, location, image, createdAt }) => {
      //     return {
      //       id: _id,
      //       title,
      //       description,
      //       location,
      //       image,
      //       createdAt,
      //     };
      //   }
      // );

      setCampgrounds(data.campgrounds);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCampgroundsHandler();
  }, [fetchCampgroundsHandler]);

  let content;

  if (campgrounds.length > 0) {
    content = <CampgroundList items={campgrounds} />;
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
