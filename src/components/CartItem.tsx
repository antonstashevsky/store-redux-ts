import React from "react";
import { Button, Stack } from "react-bootstrap";
import { deleteFromCart } from "../features/itemsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Item } from "../interfaces/item";

const CartItem: React.FC<Item> = ({
  id,
  name,
  price,
  imgUrl,
  title,
  image,
}) => {
  const dispatch = useAppDispatch();
  const deleteItem = (id: number) => dispatch(deleteFromCart(id));
  return (
    <Stack className="d-flex align-items-center" direction="horizontal" gap={2}>
      <img
        src={image}
        alt={name}
        style={{ height: "75px", width: "125px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {title}
          <span className="text-muted" style={{ fontSize: "0.7rem" }}>
            x 1
          </span>
        </div>
        <div className="text-muted" style={{ fontSize: "0.8rem" }}>
          ${price}
        </div>
      </div>
      <div>${price}</div>
      <Button onClick={() => deleteItem(id)} variant="outline-danger" size="sm">
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
