import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Pagination from "../components/Pagination";
import StoreItem from "../components/StoreItem";
import { useAppSelector } from "../hooks/hooks";

const Store = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setActivePage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const itemList = useAppSelector((state) => state.items.itemsList);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage((prev) => pageNumber);
    setActivePage((prev) => pageNumber);
  };

  return (
    <div className="p-3 bg-light">
      <h1 className="m-5">Store</h1>
      <Row
        lg={4}
        md={3}
        sm={1}
        className="d-flex justify-content-center align-items-center m-5 gap-5"
      >
        {currentItems.map((item) => (
          <Col>{<StoreItem {...item} key={item.id} />}</Col>
        ))}
      </Row>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={itemList.length}
        paginate={paginate}
        activePage={activePage}
      />
    </div>
  );
};

export default Store;
