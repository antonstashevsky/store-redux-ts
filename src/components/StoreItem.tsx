import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { addToCart } from "../features/itemsSlice";
import { useAppDispatch } from "../hooks/hooks";
import { Item } from "../interfaces/item";

// interface StoreItemProps {
//   id: number;
//   name: string;
//   price: number;
//   imgUrl: string;
// }

const StoreItem: React.FC<Item> = ({
  id,
  name,
  price,
  imgUrl,
  inCart,
  title,
  image,
}) => {
  // const [inCart, setInCart] = useState(false);
  const dispatch = useAppDispatch();

  const addItemToCart = (
    id: number,
    name: string,
    price: number,
    imgUrl: string,
    inCart: boolean
  ) =>
    dispatch(
      addToCart({ id, name, price, imgUrl, inCart: true, title, image })
    );

  return (
    <Card>
      <Card.Img
        src={image}
        alt={name}
        style={{ height: "260px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column mt-5">
        <Card.Title className="d-flex flex-column align-items-center">
          <h2 className="text-center ">
            {title?.split(" ").slice(0, 4).join(" ")}
          </h2>
          <h4 className="text-muted">${price}</h4>
          <Button
            className={`btn-lg ${inCart && "btn-success"}`}
            onClick={() => addItemToCart(id, name, price, imgUrl, inCart)}
          >
            {!inCart ? "Add" : "Item in Cart"}
          </Button>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
