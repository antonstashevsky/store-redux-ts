import React, { useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { addOrder, clearCartItems, toggleCart } from "../features/itemsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { User } from "../interfaces/user";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  let cartIsOpen = useAppSelector((state) => state.items.cartIsOpen);
  const cartItems = useAppSelector((state) => state.items.cartItems);
  const totalPrice = cartItems.reduce((sum, item) => item.price + sum, 0);
  const total = Number(totalPrice.toFixed(2));
  const totalWithDiscount = Number((total * 0.9).toFixed(2));
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [isCheckout, setIsCheckout] = useState(false);
  const onCartClicked = () => dispatch(toggleCart());
  console.log(cartIsOpen);

  const onOrder = () => {
    setIsCheckout((prev) => true);
  };

  const onCancel = () => {
    setIsCheckout((prev) => false);
  };

  const onConfirm = (orderData: User) => {
    dispatch(addOrder(orderData));
    dispatch(toggleCart());
    dispatch(clearCartItems());
    onCancel();
  };

  return (
    <Offcanvas show={cartIsOpen} onHide={onCartClicked} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fs-3">Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          {total > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-5 fw-bold fs-5">
              <span>Total Price :</span>
              {isLoggedIn && (
                <Offcanvas.Title
                  className="fs-6"
                  style={{ fontStyle: "italic", color: "red" }}
                >
                  10% discount
                </Offcanvas.Title>
              )}
              {isLoggedIn && (
                <span style={{ textDecoration: "line-through red" }}>
                  ${total}
                </span>
              )}
              {!isLoggedIn && <span>${total}</span>}
              {isLoggedIn && <span>${totalWithDiscount}</span>}
            </div>
          )}
          {!total && <h4>Add something to the cart 😉</h4>}
          {total > 0 && <Button onClick={onOrder}>Order</Button>}
          {isCheckout && <Checkout onConfirm={onConfirm} onCancel={onCancel} />}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
