import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DialogTicket from "./DialogTicket";
import TicketList from "./TicketList";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import backendinstance from "../Axios/axios";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [ticket, setTicket] = React.useState([]);
  const [currticket, setcurrTicket] = React.useState([]);
  const [message, setMessage] = React.useState(false);
  const [alertmessage, setalertMessage] = React.useState(false);
  const [snackmessage, setsnackmessages] = React.useState(false);
  const [searchfrom,setSearchFrom] = React.useState('');
   const [searchto,setSearchTo] = React.useState('');
  const navigate = useNavigate();

  const user = React.useMemo(
    () => JSON.parse(localStorage.getItem("user")) || {},
    []
  );

  const healthchk = async () => {
   await backendinstance("/tickets/health");
    // console.log(res);
  };

  const addTicket = async (tic) => {
    const check = ticket.find(({ no }) => no === tic.no);

    if (check !== undefined) {
      setalertMessage(true);
      // alert('Bus no already ready for a trip')
      setOpen(false);
    } else {
      // console.log(tic);
      setTicket([...ticket, tic]);
       await backendinstance.post("/tickets", tic);
      // console.log(response);
      // fetch("https://649034421e6aa71680cacc9a.mockapi.io/ticket", {
      //   method: "POST",
      //   body: JSON.stringify(tic),
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8",
      //   },
      // });
      setcurrTicket("");
      setMessage(true);
      setsnackmessages(false);
    }
  };

  const getTicket = async () => {
    const { data } = await backendinstance.get("/tickets");
    // console.log(data);
    setTicket(data);
  };

  React.useEffect(() => {
    if (Object.keys(user).length === 0) {
      // console.log("if");
      navigate("/login");
    } else {
      healthchk();
      getTicket();
    }

    // fetch("https://649034421e6aa71680cacc9a.mockapi.io/ticket")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setTicket(data);
    //   });
  }, [navigate, user]);

  const deleteTicket = async (busno) => {
    // const id = ticket.find(({ no }) => no === busno).id;
    setTicket(ticket.filter(({ no }) => no !== busno));
    await backendinstance.delete(`/tickets/${busno}`);
    // console.log(res);
    // fetch(`https://649034421e6aa71680cacc9a.mockapi.io/ticket/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };
  const currentTicket = (busno) => {
    setcurrTicket(ticket.find(({ no }) => no === busno));
    setsnackmessages(true);
    //console.log(currticket)
    setOpen(true);
  };

  const editTicket = async (tic) => {
    // console.log(ticket);
    // console.log(tic);
    setMessage(true);
    const ticindex = ticket.findIndex(({ no }) => no === tic.no);
    const newArr = [...ticket];
    newArr[ticindex] = tic;
    const id = ticket.find(({ no }) => no === tic.no).no;
    // console.log(id);
    // fetch(`https://649034421e6aa71680cacc9a.mockapi.io/ticket/${id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(tic),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    await backendinstance.put(`/tickets/${id}`, tic);
    setTicket(newArr);
    setsnackmessages(true);
    setcurrTicket("");
  };

  const handleClickOpen = () => {
    if (user.isadmin) {
      setsnackmessages(false);
      setOpen(true);
    } else {
      navigate("/history");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessage(false);
    setcurrTicket("");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
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

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="1" disablePadding>
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            {user?.isadmin ? (
              <ListItemText sx={{ color: "#e93e3e" }} primary="Add Ticket" />
            ) : (
              <ListItemText
                sx={{ color: "#e93e3e" }}
                primary="Booking history"
              />
            )}{" "}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#e93e3e",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <div style={{}}> */}
          <Typography variant="h3" noWrap component="div">
            Travels
          </Typography>
          <div style={{ position: "absolute", right: "20px" }}>
            <Button sx={{ color: "white" }} onClick={handleLogout}>
              Logout
            </Button>
          </div>
          {/* </div> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Dialog
          open={alertmessage}
          //  handleClose= {setalertMessage}
          sx={{ borderRight: "2px solid #e93e3e" }}
        >
          <DialogTitle style={{ cursor: "move" }}>
            Action can't be performed
          </DialogTitle>
          <DialogContent>
            <Alert severity="error">Bus no already ready for a trip</Alert>
          </DialogContent>
          <Button
            sx={{ backgroundColor: "#e93e3e", color: "black" }}
            onClick={() => setalertMessage(false)}
          >
            close
          </Button>
        </Dialog>
        <div style={{ textAlign: "end" }}>
          <label htmlFor="from">From : </label>
          <input
            id="from"
            placeholder="search from..."
            onChange={(e) => {
              setSearchFrom(e.target.value);
            }}
            style={{ color: "#e93e3e" }}
          />
          <br />
          <label htmlFor="to">To :</label>&nbsp;
          <input
            id="to"
            placeholder="search to..."
            onChange={(e) => {
              setSearchTo(e.target.value);
            }}
            style={{ color: "#e93e3e" }}
          />
        </div>
        {user.isadmin ? <h1>Admin Dashboard</h1> : <h1 style={{ color: "#e93e3e" }}> Hi {user.name}</h1>}{" "}
        <h2 style={{ textAlign: "end" }}>Buses Available : <span style={{ color: "#e93e3e" }}>{ticket.length}</span></h2>
        <DialogTicket
          open={open}
          handleClose={handleClose}
          addTicket={addTicket}
          currticket={currticket}
          editTicket={editTicket}
          snackmessage={snackmessage}
        />
{/*         {console.log(currticket)} */}
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {ticket.filter((tickets) => {return searchfrom.toLowerCase() === '' ? tickets : tickets.from.includes(searchfrom.toLowerCase()) && tickets.to.includes(searchto.toLowerCase())}).map(({ no, from, to, date, time, available }) => (
            <TicketList
              key={no}
              no={no}
              from={from}
              to={to}
              date={date}
              time={time}
              available={available}
              deleteTicket={deleteTicket}
              currentTicket={currentTicket}
            />
          ))}
        </div>
        <Snackbar
          open={message}
          autoHideDuration={1000}
          onClose={handleClose}
          message={snackmessage ? "Edited Successfully" : "Added Successfully"}
          action={action}
        />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
