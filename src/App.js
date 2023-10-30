import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import Book from "./Components/Book";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// dotenv.config();

const stripePromise = loadStripe(
  "pk_test_51O6yhlSJBU0eXMnJvsIYest6gjdbRXOfuq7UlmJnL3zW86DsyksROCjVMEQLau6KVDau4v6tAQwOrOAeNOwjKQl900jbqoi2Fy"
);
function App() {
  // dotenv.config();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
                 <Route
            path="/book"
            element={
              <Elements stripe={stripePromise}>
                <Book />
              </Elements>
            }
          />
          <Route path="/history" element={<BookingHistory />} />

          <Route path="/" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
