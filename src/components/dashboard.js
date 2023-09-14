import {
  Drawer,
  Container,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { Project } from "./project/Project";
import axios from 'axios';
import useUser from '../functions/store'
import { ProjectData } from "./project/ProjectData";
import { toast } from 'react-toastify'


function Dashboard() {
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState(null);
  const user = useUser((state) => state.user);

  const { token } = user;
  const config = {
    headers: { authorization: `Bearer ${token}` }
  }
  // UseEffect to fetch the projects
  React.useEffect(() => {

    const fetchProjects = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/projects`, config)
      setProjects(res.data);
      setLoading(false);
    }
    if (loading) {
      fetchProjects();
    }
    // eslint-disable-next-line
  }, [loading])

  const [state, setState] = React.useState(false);
  const toggleDrawer = (event, value) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(value);
  }

  const handleDrawerOpen = async (e) => {
    // fetch the project data, and feed it into the projectData component
    try {
      const projectId = e.target.dataset['id']
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/projects/${projectId}`, config);
      setProject(response.data);
      toggleDrawer(e, true);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Container>
      <Typography style={{ marginBottom: 25, fontSize: 28, letterSpacing: 2, color: "rgba(0,0,0,0.49)" }} >list projects</Typography>
      <CssBaseline />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Creator</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell style={{ width: 100, textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((item) => <Project
              name={item.name}
              key={item._id}
              creator={item.creator}
              updated={item.updatedAt} created={item.createdAt}
              openDrawer={handleDrawerOpen}
              team={item.team}
              reload={() => setLoading(true)}
              id={item._id} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer anchor='right' open={state} style={{ padding: "1em" }} onClose={(e) => {
        toggleDrawer(e, false)
      }}><ProjectData project={project} reload={() => setLoading(true)} /></Drawer>
    </Container>
  );
}

export default Dashboard;


