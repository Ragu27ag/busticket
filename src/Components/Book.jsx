import React, { useCallback, useEffect, useMemo, useState } from "react";
import backendinstance from "../Axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "./Loading";

const Book = () => {
  const user = React.useMemo(
    () => JSON.parse(localStorage.getItem("user")) || {},
    []
  ); // const { no } = useSelector((state) => state.bookreducer);
  // localStorage.setItem("no", no);
  const val = JSON.parse(localStorage.getItem("reduxno"));

  // const busno = localStorage.getItem("no");
  const busno = val.bookreducer.no;

  const [bookdata, setbookdata] = useState("");
  // const [tickets, setTickets] = useState("");
  const arr = [];
  const [intervalcount, setintervalcount] = useState(0);
  let history = useMemo(() => [], []);

  const setDiable = useCallback(() => {
    history?.forEach((his) => {
      document.getElementById(his).disabled = true;
      document.getElementById(his).style.backgroundColor = "#e93e3e";
    });
  }, [history]);

  const getData = useCallback(async () => {
    // console.log(no);
    const { data } = await backendinstance.get(`/tickets/${busno}`);

    const bookeddata = await backendinstance.get(
      `/tickets/bookhistory/${busno}`
    );

    bookeddata.data.map((dat) => history.push(...dat.count));
    console.log(history);
    console.log(bookeddata.data);
    setbookdata(data);
    setDiable();
  }, [busno, history, setDiable]);

  const navigate = useNavigate();

  // const mem = useMemo(() => getData(), [getData]);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      console.log("if");
      navigate("/login");
    } else {
      getData();
      return () => {
        // console.log(intervalcount);
        clearInterval(intervalcount);
        // console.log("cleared");
      };
    }
  }, [getData, intervalcount, user, navigate]);

  // console.log(bookdata);

  arr.push(bookdata);
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

  const [seat, setSeat] = useState([]);
  const seatsLeft1 = ["1", "2", "3", "4", "5"];
  const seatsLeft2 = ["10", "9", "8", "7", "6"];
  const seatsRight = ["11", "12", "13", "14", "15"];
  const handleSeats = (sno) => {
    console.log(seat);
    console.log(sno);
    let chk = seat.includes(sno);
    console.log(chk);
    if (chk) {
      let re = seat.filter((s) => s !== sno);
      console.log(re);
      setSeat(re);
      document.getElementById(sno).style.backgroundColor = "white";
    } else {
      setSeat([...seat, sno]);
      document.getElementById(sno).style.backgroundColor = "grey";
    }

    // document.getElementById(sno).disabled = true;
  };

  console.log(seat);
  const handleticket = async () => {
    // console.log(tickets);
    if (seat.length === 0) {
      alert("Select Seats");
    } else {
      document.getElementById("bookbutt").disabled = true;
      const currtic = bookdata.available - seat.length;
      const ticobj = {
        ...bookdata,
        available: currtic,
      };

      const history = {
        ...ticobj,
        name: user.name,
        count: seat,
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

      if (response1 && response2) {
        localStorage.removeItem("no");
        handleClick();
        const timecount = setTimeout(() => {
          // console.log(timecount);
          navigate("/");
        }, 2000);
        setintervalcount(timecount);
      }
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
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
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
                    {bookdata?.no?.toUpperCase()}
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

                {/* <input
                type="number"
                name="nooftic"
                id="nooftic"
                placeholder="Enter no of tickets"
                onChange={(e) => setTickets(e.target.value)}
              />*/}
                <span>Seats : </span>
                {seat.map((val) => (
                  <span>{val + " "}</span>
                ))}
                <br />
                <br />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#e93e3e" }}
                  onClick={handleticket}
                  id="bookbutt"
                >
                  Confirm Booking
                </Button>
              </Box>
            </>
          )}
        </div>

        <Box
          sx={{
            border: "2px solid blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "200px",
            marginTop: "50px",
            height: "400px",
            position: "relative",
          }}
        >
          <div
            style={{
              border: "2px solid",
              position: "absolute",
              height: "20px",
              width: "14px",
              borderRadius: "5px",
              top: "140px",
              left: "15px",
            }}
          ></div>
          <div
            style={{
              border: "2px solid",
              position: "absolute",
              height: "20px",
              width: "14px",
              borderRadius: "5px",
              top: "140px",
              right: "15px",
            }}
          ></div>
          <div
            style={{
              border: "2px solid",
              position: "absolute",
              height: "20px",
              width: "14px",
              borderRadius: "5px",
              top: "250px",
              left: "15px",
            }}
          ></div>
          <div
            style={{
              border: "2px solid",
              position: "absolute",
              height: "20px",
              width: "14px",
              borderRadius: "5px",
              top: "250px",
              right: "15px",
            }}
          ></div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "150px",
              border: "2px solid",
              borderRadius: "3px",
              // marginTop: "90px",
              height: "250px",
              backgroundColor: "#d6d6d6",
              // paddingTop: "50px",
            }}
          >
            <div
              style={{
                marginRight: "5px",
              }}
            >
              {seatsLeft1.map((no) => (
                <button
                  id={no}
                  style={{
                    backgroundColor: "white",
                    display: "block",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleSeats(no)}
                >
                  {no}
                </button>
              ))}
            </div>
            <div
              style={{
                marginRight: "20px",
              }}
            >
              {seatsLeft2.map((no) => (
                <button
                  id={no}
                  style={{
                    backgroundColor: "white",
                    display: "block",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleSeats(no)}
                >
                  {no}
                </button>
              ))}
            </div>

            <div style={{}}>
              <div
                style={{
                  border: "1px solid",
                  height: "10px",
                  width: "100px",
                  marginLeft: "10px",
                  position: "absolute",
                  top: "68px",
                  left: "40px",
                }}
              ></div>
              <div
                style={{
                  border: "1px solid",
                  height: "10px",
                  width: "130px",
                  marginLeft: "10px",
                  position: "absolute",
                  top: "320px",
                  left: "25px",
                }}
              ></div>
              <div
                style={{
                  borderRadius: "50%",
                  border: "2px solid",
                  height: "10px",
                  width: "10px",
                  marginLeft: "10px",
                  position: "absolute",
                  top: "100px",
                  fontSize: "8px",
                  textAlign: "center",
                }}
              >
                <span>/.\</span>
              </div>

              {seatsRight.map((no) => (
                <button
                  id={no}
                  style={{
                    backgroundColor: "white",
                    display: "block",
                    marginTop: "10px",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleSeats(no)}
                >
                  {no}
                </button>
              ))}
            </div>
          </Box>
        </Box>
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
