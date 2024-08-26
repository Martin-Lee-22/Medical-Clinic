import React from "react";
import "./App.css";
import Auth from "./pages/auth/auth";
import Layout from "./layouts/layout/Layout";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Patients from "./pages/patients/Patients";
import Doctors from "./pages/doctors/Doctors";
import Clinics from "./pages/clinics/Clinics";
import Appointments from "./pages/appointments/Appointments";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Auth />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/*" element={<Layout />}>
                <Route path="appointments" element={<Appointments />} />
                <Route path="patients" element={<Patients />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="clinics" element={<Clinics />} />
            </Route>
            {/* Catch All: any path that does not exist*/}
            <Route path="*" element={<div>Page Does Not Exist</div>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
