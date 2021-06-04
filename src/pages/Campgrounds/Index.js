import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import CampgroundList from "../../components/campgrounds/CampgroundList";
import useHttp from "../../hooks/use-http";

export default function Index() {
  const [campgrounds, setCampgrounds] = useState([]);

  const { isLoading, error, sendRequest: fetchCampgrounds } = useHttp();

  useEffect(() => {
    const transformData = (responseData) => {
      const transformedCampgrounds = responseData.campgrounds.map(
        ({ _id, title, description, location, images, createdAt }) => {
          return {
            _id,
            title,
            description,
            location,
            images,
            createdAt,
          };
        }
      );

      setCampgrounds(transformedCampgrounds);
    };

    fetchCampgrounds(
      { url: `${process.env.REACT_APP_BACKEND_URL}/campgrounds` },
      transformData
    );
  }, [fetchCampgrounds]);

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
