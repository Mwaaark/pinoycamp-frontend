import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import Campground from "../../components/campgrounds/Campground";
import useHttp from "../../hooks/use-http";

export default function Show() {
  const [campground, setCampground] = useState();
  const { isLoading, error, sendRequest: fetchCampground } = useHttp();

  const { id } = useParams();

  useEffect(() => {
    const transformData = (responseData) => {
      setCampground(responseData.campground);
    };

    fetchCampground(
      {
        url: `${process.env.REACT_APP_BACKEND_URL}/campgrounds/${id}`,
      },
      transformData
    );
  }, [fetchCampground, id]);

  let content;

  if (campground) {
    content = <Campground {...campground} />;
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
