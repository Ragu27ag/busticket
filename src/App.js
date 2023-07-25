import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import Book from "./Components/Book";
import BookingHistory from "./Components/BookingHistory";

// dotenv.config();

function App() {
  // dotenv.config();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book" element={<Book />} />
          <Route path="/history" element={<BookingHistory />} />

          <Route path="/" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
