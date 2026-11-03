
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import About from "./Pages/About";
import Cars from "./Pages/Cars";
import Contact from "./Pages/Contact";
import Booking from "./Pages/Booking";
import CarDetails from "./Pages/CarDetails";
import Vendor from "./Pages/Vendor";
import ManageCars from "./Pages/ManageCars";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Marketplace from "./Pages/Marketplace";
import { ToastContainer } from "react-toastify";
import VendorRegister from "./Pages/VendorRegister";
import VendorLogin from "./Pages/VendorLogin";
import VendorDashboard from "./Pages/VendorDashboard";
import EditCar from "./Pages/EditCar";
import UserRegister from "./Pages/UserRegister";
import UserLogin from "./Pages/UserLogin";
import AllVendors from "./Pages/AllVendors";
function App() {
  return (
    <BrowserRouter>
     <Navbar />
     <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/manage-cars" element={<ManageCars />} />
        <Route path="/marketplace" element={<Marketplace/>} />
        <Route path="/vendor-register" element={<VendorRegister/>} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard/>}/>
        <Route path="/edit-car/:id" element={<EditCar/>} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/all-vendors" element={<AllVendors/>} />
      </Routes>
       <Footer />
    </BrowserRouter>
  );
}

export default App;
