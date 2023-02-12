import React from "react";
import { Button, Nav } from "react-bootstrap";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  activePage: number;
  paginate: (pageNUmber: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  activePage,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Nav className="d-flex justify-content-center align-items-center gap-3">
      {pageNumbers.map((number) => (
        <Button
          key={number}
          active={number === activePage}
          variant="outline-primary"
          onClick={() => paginate(number)}
        >
          {number}
        </Button>
      ))}
    </Nav>
  );
};

export default Pagination;
