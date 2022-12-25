import "./App.css";
// Roboto fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Projects from "./components/projects";
import Teams from "./components/teams";
import ProtectedRoutes from "./protectedRoutes";
import ProjectData from "./components/projectData"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/teams" element={<Teams />}></Route>
          <Route path="/project/:id" element={<ProjectData />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
