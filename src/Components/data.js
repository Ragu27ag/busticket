let room = [{
    seats : "3",
    Pricehr : "1000",
    roomid: "1",
    status : "booked"
},
{
    seats : "3",
    Pricehr : "1000",
    roomid: "3",
    status : "booked"
}
]
let book = [{
    custname : "A",
    Date : "06/07/2023",
    starttime : "12:00PM",
    endtime : "12:00PM",
    roomid : "1"
},
{
    custname : "AGR",
    date : "06/07/2023",
    starttime : "12:00PM",
    endtime : "12:00PM",
    roomid : "3"
}]

var d = {}
var a  = []
 for(var i = 0 ; i < room.length;i++){
        a[i] = book.map((obj) => {
          
          if(obj.roomid === room[i].roomid){
            
            return (
                 d = {
                   'id' : room[i].roomid,
                   'status' : room[i].status,
                   'name' : obj.custname,
                   'data': obj.date,
                   'starttime': obj.starttime,
                   'endtime': obj.endtime
                 }
              )
            
            }
          
          
          
          } )
        
    }
    
    console.log(a)