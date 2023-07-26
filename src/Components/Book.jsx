import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import backendinstance from "../Axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "./Loading";


const Book = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { no } = useSelector((state) => state.bookreducer);
  localStorage.setItem("no", no);
  const busno = localStorage.getItem("no");
  const [bookdata, setbookdata] = useState("");
  const [tickets, setTickets] = useState("");
  // const arr = [];
    const [intervalcount, setintervalcount] = useState(0);


  const getData = useCallback(async () => {
    // console.log(no);
    const { data } = await backendinstance.get(`/tickets/${busno}`);

    setbookdata(data);
  }, [busno, no]);

  const navigate = useNavigate();

  // const mem = useMemo(() => getData(), [getData]);

  useEffect(() => {
    getData();
     return () => {
      // console.log(intervalcount);
      clearInterval(intervalcount);
      // console.log("cleared");
    };
  }, [getData,intervalcount]);

  // console.log(bookdata);

  // arr.push(bookdata);
  // console.log(arr);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleticket = async () => {
    // console.log(tickets);
    const currtic = bookdata.available - tickets;

    const ticobj = {
      ...bookdata,
      available: currtic,
    };

    const history = {
      ...ticobj,
      name: user.name,
      count: tickets,
      email: user.email,
    };

    const response1 = await backendinstance.put("/tickets", ticobj);

    const response2 = await backendinstance.post(
      "/tickets/bookhistory",
      history
    );

    // console.log(response1, response2);

    //const response3 =  await backendinstance.post("/email", history);

    // console.log(ticobj);
    localStorage.removeItem("no");
    handleClick();
    if (response1 && response2) {
      handleClick();
      const timecount = setTimeout(() => {
        // console.log(timecount);
        navigate("/");
      }, 4000);
      setintervalcount(timecount);
    }
  };
  return (
    <>
      <Link
        style={{ textDecoration: "none", color: "#e93e3e", margin: "5px" }}
        to="/"
      >
        Back
      </Link>
      <Typography m={3} variant="h4">
        Confirm Booking
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
        }}
      >
        {bookdata === "" ? (
        <Loading />
        ) : (
          <>
            {/* {" "}
          <p>Bus no : {bookdata.no}</p>
          <p>Form : {bookdata.from}</p> <p>To : {bookdata.to}</p>
          <p>Data : {bookdata.date}</p>
          <p>Time: {bookdata.time}</p>
          <p>Available Tickets: {bookdata.available}</p>
          <br />
          <br />
          <label htmlFor="nooftic"></label>
          <input
            type="number"
            name="nooftic"
            id="nooftic"
            onChange={(e) => setTickets(e.target.value)}
          /> */}
            <Box
              sx={{
                border: "1px solid grey",
                width: "300px",
                height: "350px",
                textAlign: "center",
                borderLeft: "2px solid #e93e3e",
                borderRadius: "8px",
                boxShadow:
                  "  rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              }}
              margin={2}
            >
              {/* <p
              style={{
                padding: "2px",
                textOverflow: "ellipsis",
                color: "grey",
                flexWrap: "nowrap",
              }}
            >
              Name :{" "}
              <span style={{ color: "black", fontFamily: "serif" }}>
                {h.name.toUpperCase()}
              </span>
            </p> */}
              <p
                style={{
                  padding: "2px",
                  textOverflow: "ellipsis",
                  color: "grey",
                  flexWrap: "nowrap",
                }}
              >
                Bus no :{" "}
                <span style={{ color: "black", fontFamily: "serif" }}>
                  {bookdata.no.toUpperCase()}
                </span>
              </p>
              <p
                style={{
                  padding: "2px",
                  textOverflow: "ellipsis",
                  color: "grey",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                From :{" "}
                <span style={{ color: "black", fontFamily: "serif" }}>
                  {bookdata.from.toUpperCase()}
                </span>
              </p>
              <p
                style={{
                  padding: "2px",
                  textOverflow: "ellipsis",
                  color: "grey",
                  flexWrap: "nowrap",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                To :{" "}
                <span style={{ color: "black", fontFamily: "serif" }}>
                  {bookdata.to.toUpperCase()}
                </span>
              </p>
              <p
                style={{
                  padding: "2px",
                  textOverflow: "ellipsis",
                  color: "grey",
                }}
              >
                Date :{" "}
                <span style={{ color: "black", fontFamily: "serif" }}>
                  {bookdata.date}
                </span>
              </p>
              <p
                style={{
                  padding: "2px",
                  textOverflow: "ellipsis",
                  color: "grey",
                }}
              >
                Time :{" "}
                <span style={{ color: "black", fontFamily: "serif" }}>
                  {" "}
                  {bookdata.time}
                </span>
              </p>
              <p
                style={{
                  padding: "2px",
                  textOverflow: "ellipsis",
                  color: "grey",
                }}
              >
                Available Ticket :{" "}
                <span style={{ color: "black", fontFamily: "serif" }}>
                  {" "}
                  {bookdata.available}
                </span>
              </p>

              <input
                type="number"
                name="nooftic"
                id="nooftic"
                placeholder="Enter no of tickets"
                onChange={(e) => setTickets(e.target.value)}
              />
              <br />
              <br />
              <Button
                variant="contained"
                sx={{ backgroundColor: "#e93e3e" }}
                onClick={handleticket}
              >
                Confirm Booking
              </Button>
            </Box>
          </>
        )}
      </div>
      <Snackbar
        sx={{ color: "green" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Booking Confimed.Ticket sent to your registered email "
        action={action}
      />
    </>
  );
};

export default Book;
