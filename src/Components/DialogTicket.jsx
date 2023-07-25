import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { TextField } from '@mui/material';


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DialogTicket({open,handleClose,addTicket,currticket,editTicket,snackmessage}) {
  console.log('tic'+currticket.no)
 
 const  handleSubmit = (e) =>{
    e.preventDefault();
    var data = {}

    Array.from(e.target.elements).forEach((element) => {
          if(element.nodeName === 'INPUT' ){
              data[element.name] = element.value
          } 
    })
    //console.log(data)
   if(currticket.no === undefined){
    addTicket(data);
   }
   else{
    editTicket(data)
   }
      
 
   
 }
 

  return (
    <div>
    
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
         {currticket.no === undefined ?  'Add Ticket' :  'Edit Ticket'}
        </DialogTitle>
        <DialogContent>
         <form onSubmit={handleSubmit}>
         <TextField sx={{mt:1}} id="no"  name = 'no' label="Bus no" variant="standard" type = 'text' defaultValue = {currticket?.no || ''} required disabled={currticket?.no !== undefined}/>
         <br/>
         <TextField id="from"  name = 'from' label="From" variant="standard" type = 'text' defaultValue = {currticket?.from  || ''} required />
         <br/>
         <TextField id="to"  name = 'to' label="To" variant="standard"  type = 'text' defaultValue = {currticket?.to  || ''} required />
         <br/>
         
         
         <TextField   sx={{mt:2}} id="date"   name = 'date' label="" variant="standard" type = 'date' defaultValue = {currticket?.date  || ''} required/>
         <br/>
         <TextField  fullWidth sx={{mt:2}} id="time"  name = 'time' label="" variant="standard" type = 'time' defaultValue = {currticket?.time  || ''} required/>
         <br/>
         <TextField sx={{mt:1}} id="available"  name = 'available' label="Ticket Available" required variant="standard" type = 'number' defaultValue = {currticket?.available  || ''}/>
         <br/>
         <Button sx={{mt:2}} autoFocus onClick={handleClose} type='reset'>
            Cancel
          </Button>
          <Button color='primary'  sx={{mt:2}} type='submit'>{snackmessage ? 'Edit' : 'Add'}</Button>
          
         </form>
        </DialogContent>
      
      </Dialog>
    </div>
  );
}