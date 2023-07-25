import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TicketList = ({
  no,
  from,
  to,
  date,
  time,
  available,
  deleteTicket,
  currentTicket,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(no,from,to,date,time,available)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const reference = useRef();

  const bookTicket = (no) => {
    dispatch({ type: "BOOK", no });

    navigate("/book");
  };
  const d = useSelector((state) => state.bookreducer);
  console.log(d);

  // if (available === 0) {
  //   reference.current.style.backgroundColor = "grey";
  // }
  return (
    <Box
      // ref={reference}
      sx={{
        border: "1px solid grey",
        backgroundColor: "white",
        maxWidth: "250px",
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
        Bus no :{" "}
        <span style={{ color: "black", fontFamily: "serif" }}>
          {no.toUpperCase()}
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
          {from.toUpperCase()}
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
          {to.toUpperCase()}
        </span>
      </p>
      <p style={{ padding: "2px", textOverflow: "ellipsis", color: "grey" }}>
        Date :{" "}
        <span style={{ color: "black", fontFamily: "serif" }}>{date}</span>
      </p>
      <p style={{ padding: "2px", textOverflow: "ellipsis", color: "grey" }}>
        Time :{" "}
        <span style={{ color: "black", fontFamily: "serif" }}> {time}</span>
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
        Available Tickets : <span style={{ color: "black" }}>{available}</span>
      </p>
      <Divider sx={{ backgroundColor: "#e93e3e" }} variant="middle" />
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {user?.isadmin ? (
          <Button
            variant="primary"
            sx={{ backgroundColor: "#e93e3e", margin: "2px" }}
            onClick={() => currentTicket(no)}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="primary"
            sx={{ backgroundColor: "#e93e3e", margin: "2px" }}
            onClick={() => bookTicket(no)}
            disabled={available === 0}
          >
            Book
          </Button>
        )}{" "}
        {user?.isadmin && (
          <Button
            variant="primary"
            sx={{ backgroundColor: "#e93e3e", margin: "2px" }}
            onClick={() => deleteTicket(no)}
          >
            Delete
          </Button>
        )}
      </div>
    </Box>
  );
};

export default TicketList;
