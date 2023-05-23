import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Valet from "./pages/Valet";
import Manager from "./pages/Manager";
import Stats from "./pages/Stats";
import IncidentReports from "./pages/IncidentReports";
import ManageValet from "./pages/ManageValet";
import ManageManagers from "./pages/ManageManagers";
import Report from "./pages/Report";
import MyDocument from "./components/MyDocument";
import Incident from "./components/Incident";
import ManageProperties from "./pages/ManageProperties";
import AddProperty from "./pages/AddProperty";

function App() {
  return (
    <Routes>
      <Route path="/report" element={<Incident />} />
      <Route path="/document" element={<MyDocument />} />
      <Route path="/" element={<Dashboard />}>
        <Route path="Valet" element={<Valet />} />
        <Route path="Manager" element={<Manager />} />
        <Route path="Stats" element={<Stats />} />
        <Route path="IncidentReports" element={<IncidentReports />} />
        <Route path="Report" element={<Report />} />
        <Route path="ManageValet" element={<ManageValet />} />
        <Route path="ManageManagers" element={<ManageManagers />} />
        <Route path="ManageProperties" element={<ManageProperties />} />
        <Route path="AddProperty" element={<AddProperty />} />
      </Route>
    </Routes>
  );
}

export default App;
