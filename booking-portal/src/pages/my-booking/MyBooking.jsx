import React, { useEffect, useState } from 'react'
import './mybooking.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
export default function MyBooking() {
    const [data, setData] = useState([]);
        const getData = async () => {
      try {
        const res = await fetch(
          "https://sheet.best/api/sheets/770bbc5f-7916-4aed-90a5-f70841d6e749"
        );
        const data = await res.json();
        console.log(data[0])
        setData(Object.keys(data).map((key) => data[key]));
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);
  return (
    <div className="booking">
      <Link to='/' >
    <Button className="bookingList" variant="contained" color="info">
  Add Booking
    </Button>
    </Link>
    <div className="list">
{data?.map((item)=>(
    

<li key={item.id}>Court : {item.Court} - TimeSlot : {item.timeSlot}</li>
)
   
)}
    </div>
    </div>
  )
}
