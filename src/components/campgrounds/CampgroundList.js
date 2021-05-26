import React from "react";
import { Row } from "react-bootstrap";
import CampgroundItem from "./CampgroundItem";

export default function CampgroundList({ items }) {
  return (
    <Row>
      {items.map(({ _id, ...otherItemProps }) => (
        <CampgroundItem key={_id} id={_id} {...otherItemProps} />
      ))}
    </Row>
  );
}
