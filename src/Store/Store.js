import { configureStore } from "@reduxjs/toolkit";
import bookreducer from "../Reducers/bookreducer.js";

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    localStorage.setItem("applicationstate", JSON.stringify(getState()));
    return next(action);
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem("applicationstate" !== null)) {
    return JSON.parse(localStorage.getItem("applicationstate"));
  }
};

const store = configureStore({
  reducer: {
    bookreducer,
  },
  devTools: true,
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

store.subscribe(() => console.log("successfully subscribed", store.getState()));

export default store;
