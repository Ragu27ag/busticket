import React, { useCallback, useEffect, useState } from "react";
import backendinstance from "../Axios/axios";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BookingHistory = () => {
  const [history, sethistory] = useState([]);
  const users = JSON.parse(localStorage.getItem("user") || "{}");

  const getData = useCallback(async () => {
    const { data } = await backendinstance.get(
      `/tickets/history/${users.email}`
    );
    sethistory(data);
  }, [users.email]);

  useEffect(() => {
    getData();
  }, [getData]);

  console.log(history);
  return (
    <>
      <Link
        style={{ textDecoration: "none", color: "#e93e3e", margin: "5px" }}
        to="/"
      >
        Back
      </Link>
      <br />
      <br />
      <Typography m={3} variant="h4">
        Booking History
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: "3px",
        }}
      >
        {history === "" ? (
          <p>LOADING</p>
        ) : (
          history.map((h) => (
            // <div style={{ border: "2px solid", margin: "5px" }}>
            //   {" "}
            //   <p>Name : {h.name}</p>
            //   <p>From : {h.from}</p>
            //   <p>TO : {h.to}</p>
            //   <p>Date : {h.date}</p>
            //   <p>Time : {h.time}</p>
            //   <p>Busno : {h.no}</p>
            //   <p>Count : {h.count}</p>
            // </div>
            <Box
              sx={{
                border: "1px solid grey",
                maxWidth: "300px",
                borderLeft: "2px solid #e93e3e",
                borderRadius: "8px",
                boxShadow:
                  "  rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              }}
              margin={2}
            >
              <p
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
              </p>
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
                  {h.no.toUpperCase()}
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
                  {h.from.toUpperCase()}
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
                  {h.to.toUpperCase()}
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
                  {h.date}
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
                  {h.time}
                </span>
              </p>
              <p
                style={{
                  padding: "2px",
                  paddingBottom: "0px",
                  textOverflow: "ellipsis",
                  color: "grey",
                  fontFamily: "serif",
                }}
              >
                Booked Tickets :{" "}
                <span style={{ color: "black" }}>{h.count}</span>
              </p>
            </Box>
          ))
        )}
      </div>
    </>
  );
};

export default BookingHistory;
