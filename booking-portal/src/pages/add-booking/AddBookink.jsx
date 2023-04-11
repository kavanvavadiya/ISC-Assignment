import React, { useEffect, useRef, useState } from 'react'
import './addBooking.css'
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import { Link } from 'react-router-dom';
export default function AddBookink() {
    const [data, setData] = useState({
        User_roll: "210100166",
        Court: "",
        timeSlot: "",

      });
      const [oldData, setOldData] = useState([]);
      const [isMessage, setIsMessage] = useState(false);
    const getData = async () => {
      try {
        const res = await fetch(
          "https://sheet.best/api/sheets/770bbc5f-7916-4aed-90a5-f70841d6e749"
        );
        const oldData = await res.json();
        console.log(oldData)
        setOldData(Object.keys(oldData).map((key) => oldData[key]));
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getData();
      if(oldData.length===3){
        setIsMessage(true)
      }
    }, []);

    let existing = localStorage.getItem("data");
    existing = existing ? JSON.parse(existing) : [];
    
    let badmintonslot_ex = localStorage.getItem("badmintonslot");
    console.log(badmintonslot_ex)
    badmintonslot_ex = badmintonslot_ex ? JSON.parse(badmintonslot_ex) : [6,10,9,8];

    let squashslot_ex = localStorage.getItem("squashslot");
    squashslot_ex = squashslot_ex ? JSON.parse(squashslot_ex) : [3,5,6,2];

    let gymslot_ex = localStorage.getItem("gymslot");
    gymslot_ex = gymslot_ex ? JSON.parse(gymslot_ex) : [4,0,3,2];

    let swimmingslot_ex = localStorage.getItem("swimmingslot");
    swimmingslot_ex = swimmingslot_ex ? JSON.parse(swimmingslot_ex) : [4,8,7,5];


    const [court, setCourt] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [booking, setBooking] = useState(existing);
    const badmintonslot = useRef(badmintonslot_ex)
    const squashlot = useRef(squashslot_ex)
    const gymslot = useRef(gymslot_ex)
    const swimmingslot = useRef(swimmingslot_ex)
    
    const handleChange = (event) => {
        setCourt(event.target.value);
        setData({ ...data,
            
            Court: event.target.value,
         });
      };
      
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(
              "https://sheet.best/api/sheets/770bbc5f-7916-4aed-90a5-f70841d6e749",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                
                body: JSON.stringify(data),
              }
            );
            
          } catch (error) {
            console.log(error);
          }
window.location.reload();
    //     if(court==='badminton'){
    //         if(timeSlot === '7:30am-8:30am') badmintonslot.current[0]--;
    //         if(timeSlot === '8:30am-9:30am') badmintonslot.current[1]--;
    //         if(timeSlot === '7:30pm-8:30pm') badmintonslot.current[2]--;
    //         if(timeSlot === '8:30pm-9:30pm') badmintonslot.current[3]--;
    //         localStorage.setItem("badmintonslot",JSON.stringify(badmintonslot.current))
    //     }
    //     if(court==='squash'){
    //         if(timeSlot === '7:30am-8:30am') squashlot.current[0]--;
    //         if(timeSlot === '8:30am-9:30am') squashlot.current[1]--;
    //         if(timeSlot === '7:30pm-8:30pm') squashlot.current[2]--;
    //         if(timeSlot === '8:30pm-9:30pm') squashlot.current[3]--;
    //         localStorage.setItem("squashslot",JSON.stringify(squashlot.current))
    //     }
    //     if(court==='gym'){
    //         if(timeSlot === '7:30am-8:30am') gymslot.current[0]--;
    //         if(timeSlot === '8:30am-9:30am') gymslot.current[1]--;
    //         if(timeSlot === '7:30pm-8:30pm') gymslot.current[2]--;
    //         if(timeSlot === '8:30pm-9:30pm') gymslot.current[3]--;
    //         localStorage.setItem("gymslot",JSON.stringify(gymslot.current))
    //     }
    //     if(court==='swimming'){
    //         if(timeSlot === '7:30am-8:30am') swimmingslot.current[0]--;
    //         if(timeSlot === '8:30am-9:30am') swimmingslot.current[1]--;
    //         if(timeSlot === '7:30pm-8:30pm') swimmingslot.current[2]--;
    //         if(timeSlot === '8:30pm-9:30pm') swimmingslot.current[3]--;
    //         localStorage.setItem("swimmingslot",JSON.stringify(swimmingslot.current))
    // }
    //     const id = booking.length + 1;
    //     setBooking((prev) => [
    //         ...prev,
    //         {
    //           id: id,
    //           court: court,
    //           timeSlot: timeSlot,
    //         },
    //       ]);
        setCourt('')
        setTimeSlot('')
    };
    // console.log(badmintonslot.current[0])
      useEffect(() => { 
        localStorage.setItem("data",JSON.stringify(booking))
        },[booking]);
  return (
   <div className="add-booking">
   
    <Link to='booking' >
    <Button className="bookingList" variant="contained" color="info">
  My Bookings
    </Button>
    </Link>
    <form onSubmit={handleSubmit} className='form'>
       <FormControl fullWidth>

       <InputLabel id="demo-simple-select-label">Court Type</InputLabel>
        <Select
        required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   inputRef={court}
        value={court}
          label="Age"
          defaultValue='badminton'
        onChange={handleChange}
          >
          <MenuItem value={'badminton'}>Badminton</MenuItem>
          <MenuItem value={'squash'}>Squash</MenuItem>
          <MenuItem value={'gym'}>Gym</MenuItem>
          <MenuItem value={'swimming'}>Swimming</MenuItem>
        </Select>

        <FormLabel id="demo-radio-buttons-group-label">Time Slots</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="7:30am-8:30am"
    name="radio-buttons-group"
    value={timeSlot}
    onChange={(e)=> {
        setData({ ...data,
            
           timeSlot: e.target.value,
         });
        setTimeSlot(e.target.value)}}

  >
    {court === 'badminton' &&(<>
  <div className="inputTime">
  {badmintonslot.current[0] ?<> <FormControlLabel value="7:30am-8:30am" control={<Radio />} label="7:30am-8:30am" /> <span className="seats">{badmintonslot.current[0]} Seats Remaining</span></> :<><FormControlLabel value="7:30am-8:30am" control={<Radio />} label="7:30am-8:30am" disabled /> <span className="seats">No Seats Remaining</span> </>}
    </div>
  <div className="inputTime">
  {badmintonslot.current[1] ?<> <FormControlLabel value="8:30am-9:30am" control={<Radio />} label="8:30am-9:30am" /> <span className="seats">{badmintonslot.current[1]} Seats Remaining</span></> :<><FormControlLabel value="8:30am-9:30am" control={<Radio />} label="8:30am-9:30am" disabled /> <span className="seats">No Seats Remaining</span> </>}
    </div>
  <div className="inputTime">
  {badmintonslot.current[2] ?<> <FormControlLabel value="7:30pm-8:30pm" control={<Radio />} label="7:30pm-8:30pm" /> <span className="seats">{badmintonslot.current[2]} Seats Remaining</span></> :<><FormControlLabel value="7:30pm-8:30pm" control={<Radio />} label="7:30pm-8:30pm" disabled /> <span className="seats">No Seats Remaining</span> </>}
    </div>
  <div className="inputTime">
  {badmintonslot.current[3] ?<> <FormControlLabel value="8:30pm-9:30pm" control={<Radio />} label="8:30pm-9:30pm" /> <span className="seats">{badmintonslot.current[3]} Seats Remaining</span></> :<><FormControlLabel value="8:30pm-9:30pm" control={<Radio />} label="8:30pm-9:30pm" disabled /> <span className="seats">No Seats Remaining</span> </>}
    </div>
  </>)}
    {court === 'squash' &&(<>
  <div className="inputTime">
     <FormControlLabel value="7:30am-8:30am" control={<Radio />} label="7:30am-8:30am" /> <span className="seats">{squashlot.current[0]} Seats Remaining</span>
  </div>
  <div className="inputTime">
    <FormControlLabel value="8:30am-9:30am" control={<Radio />} label="8:30am-9:30am" /><span className="seats">{squashlot.current[1]} Seats Remaining</span>
    </div>
    <div className="inputTime">
    <FormControlLabel value="7:30pm-8:30pm" control={<Radio />} label="7:30pm-8:30pm" /><span className="seats">{squashlot.current[2]} Seats Remaining</span>
    </div>
    <div className="inputTime">
    <FormControlLabel value="8:30pm-9:30pm" control={<Radio />} label="8:30pm-9:30pm" /> <span className="seats">{squashlot.current[3]} Seats Remaining</span>
    </div>
  </>)}
    {court === 'gym' &&(<>
  <div className="inputTime">
  {gymslot.current[0] ?<> <FormControlLabel value="7:30am-8:30am" control={<Radio />} label="7:30am-8:30am" /> <span className="seats">{gymslot.current[0]} Seats Remaining</span></> :<><FormControlLabel value="7:30am-8:30am" control={<Radio />} label="7:30am-8:30am" disabled /> <span className="seats">No Seats Remaining</span> </>}
  </div>
  <div className="inputTime">
  {gymslot.current[1] ?<> <FormControlLabel value="8:30am-9:30am" control={<Radio />} label="8:30am-9:30am" /> <span className="seats">{gymslot.current[1]} Seats Remaining</span></> :<><FormControlLabel value="8:30am-9:30am" control={<Radio />} label="8:30am-9:30am" disabled /> <span className="seats">No Seats Remaining</span> </>}
    </div>
    <div className="inputTime">
    {gymslot.current[2] ?<> <FormControlLabel value="7:30pm-8:30pm" control={<Radio />} label="7:30pm-8:30pm" /><span className="seats">{gymslot.current[2]} Seats Remaining</span></> :<> <FormControlLabel value="7:30pm-8:30pm" control={<Radio />} label="7:30pm-8:30pm" disabled /><span className="seats">No Seats Available</span></>}
    </div>
    <div className="inputTime">
    {gymslot.current[3] ?<> <FormControlLabel value="8:30pm-9:30pm" control={<Radio />} label="8:30pm-9:30pm" /> <span className="seats">{gymslot.current[3]} Seats Remaining</span></> :<><FormControlLabel value="8:30pm-9:30pm" control={<Radio />} label="8:30pm-9:30pm" disabled /> <span className="seats">No Seats Remaining</span> </>}
    </div>
  </>)}
    {court === 'swimming' &&(<>
  <div className="inputTime">
     <FormControlLabel value="7:30am-8:30am" control={<Radio />} label="7:30am-8:30am" /> <span className="seats">{swimmingslot.current[0]} Seats Remaining</span>
  </div>
  <div className="inputTime">
    <FormControlLabel value="8:30am-9:30am" control={<Radio />} label="8:30am-9:30am" /><span className="seats">{swimmingslot.current[1]} Seats Remaining</span>
    </div>
    <div className="inputTime">
    <FormControlLabel value="7:30pm-8:30pm" control={<Radio />} label="7:30pm-8:30pm" /><span className="seats">{swimmingslot.current[2]} Seats Remaining</span>
    </div>
    <div className="inputTime">
    <FormControlLabel value="8:30pm-9:30pm" control={<Radio />} label="8:30pm-9:30pm" /> <span className="seats">{swimmingslot.current[3]} Seats Remaining</span>
    </div>
  </>)}
  </RadioGroup>
            </FormControl>
            {isMessage && "You already exceed your today's maximum booking"}
            {isMessage? <Button variant="contained" color="success" type="submit"  disabled>

  Submit
    </Button> : <Button variant="contained" color="success" type="submit">
  Submit
    </Button>

            }
          
            
    </form>
   </div>
  )
}
