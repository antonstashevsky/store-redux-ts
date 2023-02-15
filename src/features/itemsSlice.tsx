import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../interfaces/item";
import { User } from "../interfaces/user";
import { RootState } from "./store";
import { toast } from "react-toastify";

interface ItemsState {
  itemsList: Item[];
  cartItems: Item[];
  cartIsOpen: boolean;
  loading: boolean;
  error: string | null;
}

export const fetchData = createAsyncThunk<
  Item[],
  undefined,
  { rejectValue: string }
>("items/fetchData", async (_, { rejectWithValue }) => {
  const response = await fetch("https://fakestoreapi.com/products");
  console.log(response);

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const responseData = await response.json();

  return responseData;
});

export const addOrder = createAsyncThunk(
  "items/addOrder",
  async (userData: User, { getState }) => {
    const appState = getState() as RootState;
    const usersOrder = appState.items.cartItems;
    const totalPrice = usersOrder.reduce((sum, item) => item.price + sum, 0);

    console.log(usersOrder);

    const response = await fetch(
      "https://sneackerstorets-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: { usersOrder, totalPrice },
        }),
      }
    );
  }
);

const initialState: ItemsState = {
  itemsList: [],
  cartItems: [],
  cartIsOpen: false,
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Item>) {
      state.cartItems.push({
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        imgUrl: action.payload.imgUrl,
        inCart: action.payload.inCart,
        title: action.payload.title,
        image: action.payload.image,
      });
    },
    deleteFromCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleCart(state) {
      state.cartIsOpen = !state.cartIsOpen;
    },
    clearCartItems(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.itemsList = action.payload;
        state.loading = false;
      })
      .addCase(addOrder.fulfilled, (state) => {
        toast.success("Thank you for your order!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  },
});

export const { addToCart, deleteFromCart, toggleCart, clearCartItems } =
  itemsSlice.actions;

export default itemsSlice.reducer;
