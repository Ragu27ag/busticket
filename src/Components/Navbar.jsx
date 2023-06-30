import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DialogTicket from './DialogTicket';
import TicketList from './TicketList';
import CloseIcon from '@mui/icons-material/Close';
import {   Alert, Button, Dialog, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [ticket,setTicket] = React.useState([]);
  const [currticket,setcurrTicket] = React.useState([]);
  const [message,setMessage] = React.useState(false)
  const [alertmessage,setalertMessage] = React.useState(false)
  const [snackmessage,setsnackmessages] = React.useState(false)



  const addTicket = (tic) => {

    const check = ticket.find(({no}) => no === tic.no)

 if(check !== undefined){
  setalertMessage(true)
  // alert('Bus no already ready for a trip')
  setOpen(false)
 }
 else{
  setTicket([...ticket,tic]);
  setcurrTicket('')
  setMessage(true);
  setsnackmessages(false)
 }
     
    
  
   
  };

  const deleteTicket = (busno) => {
    setTicket(ticket.filter(({no}) => no !== busno ))
  }
  const currentTicket = (busno) => {
    setcurrTicket(ticket.find(({no}) => no === busno));
    setsnackmessages(true)
    //console.log(currticket)
    setOpen(true)
    

  }

  const editTicket = (tic) => {
    setMessage(true);
    const ticindex = ticket.findIndex(({no}) => no === tic.no )
    const newArr = [...ticket];
    newArr[ticindex] = tic
    setTicket(newArr);
    setsnackmessages(true)
    setcurrTicket('')
   
    
    

  }

 


  const handleClickOpen = () => {
    setsnackmessages(false)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage(false);
    setcurrTicket('');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
       
          <ListItem key= '1' disablePadding>
            <ListItemButton onClick={handleClickOpen}  >
              <ListItemIcon>
               <AddIcon/>
              </ListItemIcon>
              <ListItemText  sx = {{color:'#e93e3e'}} primary= 'Add Ticket' />
            </ListItemButton>
          </ListItem>
     
      </List>
      <Divider />
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
      
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:'#e93e3e'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          
         


          <Typography variant="h3" noWrap component="div">
            Travels
          </Typography>




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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
       <Dialog open={alertmessage}
      //  handleClose= {setalertMessage}
      sx = {{borderRight:'2px solid #e93e3e'}}
       >
         <DialogTitle style={{ cursor: 'move' }} >
         Action can't be performed
        </DialogTitle>
        <DialogContent>
        <Alert severity="error">Bus no already ready for a trip</Alert>
        </DialogContent>
        <Button  sx = {{backgroundColor:'#e93e3e' ,color:'black'}} onClick={() => setalertMessage(false)}>close</Button>
       </Dialog>
        <h1>Admin Dashboard</h1>
        <h2 style={{textAlign:'end'}}>Buses Available : {ticket.length}</h2>
        <DialogTicket open={open} handleClose={handleClose} addTicket={addTicket} currticket={currticket} editTicket={
          editTicket} snackmessage = {snackmessage}
        />
        {console.log(currticket)}
        <div style= {{display:'flex' , flexDirection:'row' , flexWrap:'wrap' }}>
       {ticket.map(({no,from,to,date,time,available}) => (
              <TicketList no = {no} from = {from} to = {to} date={date} time = {time} available={available} deleteTicket={deleteTicket}
              currentTicket={currentTicket}/ >
        ))}
        </div>
        
       <Snackbar
  open={message}
  autoHideDuration={2000}
  onClose={handleClose}
  message={snackmessage ? 'Edited Successfully' : 'Added Successfully'}
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