import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Doctors from '../pages/Doctors'
import DoctorDetails from "../pages/DoctorDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import MyAccount from "../dashboard/user-account/MyAccount";
import DocAccount from "../dashboard/doctor-account/DocAccount";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/CheckoutSuccess";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={['patient']}><MyAccount /></ProtectedRoute>} />
      <Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={['doctor']}><DocAccount /></ProtectedRoute>} />
    </Routes>
  )
}

export default Routers