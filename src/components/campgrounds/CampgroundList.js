import React from "react";
import { Row } from "react-bootstrap";
import CampgroundItem from "./CampgroundItem";

export default function CampgroundList({ items }) {
  return (
    <>
      <p className="text-pink font-weight-bolder text-uppercase letter-spacing-wider mb-1">
        Experiences from around the Philippines
      </p>
      <h3 className="font-weight-bolder">All Campgrounds</h3>
      <Row>
        {items.map(({ _id, ...otherItemProps }) => (
          <CampgroundItem key={_id} id={_id} {...otherItemProps} />
        ))}
      </Row>
    </>
  );
}
