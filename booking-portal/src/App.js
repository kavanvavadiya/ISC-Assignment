
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddBookink from './pages/add-booking/AddBookink';
import MyBooking from './pages/my-booking/MyBooking';

function App() {
  return (
   <BrowserRouter>
    <div className="heading">
        Booking Portal
    </div>
   <Routes>
     <Route path="/" element={<AddBookink />}>
     </Route>
       <Route path="/booking" element={<MyBooking />} />
   </Routes>
 </BrowserRouter>
  );
}

export default App;
