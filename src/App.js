import "./App.css";
// Roboto fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar";
// import Home from "./components/home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Dashboard from "./components/dashboard";
import Projects from "./components/projects";
import ProtectedRoutes from "./protectedRoutes";
import User from "./components/user";
import { Layout } from "./components/layout/Layout";
import { CreateProject } from "./components/project/CreateProject";
import { CreateIssue } from "./components/issue/CreateIssue";
import { Issues } from "./components/issue/Issues";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/create-project" element={<CreateProject />}></Route>
            <Route path="/me" element={<User />}></Route>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/project/:id" element={<Issues />}></Route>
            <Route path="project/:id/create-issue" element={<CreateIssue />}></Route>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
