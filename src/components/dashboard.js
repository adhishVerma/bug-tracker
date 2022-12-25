import styled from "@emotion/styled";
import {
  Box,
  Drawer,
  Button,
  Divider,
  Tab,
  Tabs,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import { AddCircleOutlineSharp } from "@mui/icons-material";
import { useState } from "react";
import * as React from "react";

const drawerWidth = 240;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handler = (key) => {
    console.log(key)
  }

  const handleTab = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Container>
      <Background />
      <div style={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              "z-index": "1",
              paddingTop: "72px",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Button
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              marginRight: "auto",
              marginLeft: "auto",
            }}
            onClick={handleOpen}
          >
            <AddCircleOutlineSharp />
            <span>Create Issue</span>
          </Button>
          <Divider />
          <Tabs
            style={{ marginTop: "25px", marginBottom: "25px" }}
            value={tab}
            onChange={handleTab}
            orientation="vertical"
          >
            <Tab label="Assigned to me" />
            <Tab label="Reported by me" />
            <Tab label="To be verified" />
          </Tabs>
          <Divider />
        </Drawer>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 125,
                  }}
                >
                  Current status
                </TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Reporter</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Asignee</TableCell>
                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Chip sx={{ width: 80 }} label="open" color="primary" />
                </TableCell>
                <TableCell>Issue Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>22-02-2020</TableCell>
                <TableCell>Jane Doe</TableCell>
                <TableCell>Severe</TableCell>
              </TableRow>
              <TableRow onClick={(e) => handler("key")}>
                <TableCell align="center" >
                  <Chip sx={{ width: 80 }} label="closed" color="success" />
                </TableCell>
                <TableCell>Issue Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>22-02-2020</TableCell>
                <TableCell>Jane Doe</TableCell>
                <TableCell>Severe</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ marginBottom: 3 }}
          >
            Create Issue
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <TextField id="name" label="issue" variant="outlined"></TextField>
            <TextField id="desc" label="description" variant="outlined" multiline></TextField>
            <FormControl>
            <InputLabel id="project">project</InputLabel>
            <Select label="project"
            labelId="demo-simple-select-label"
            id="demo-simple-select">
                <MenuItem value={3}>High</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={1}>Low</MenuItem>
            </Select></FormControl>
            <FormControl>
            <InputLabel id="test-select-label">priority</InputLabel>
            <Select label="priority"
            labelId="demo-simple-select-label"
            id="demo-simple-select">
                <MenuItem value={3}>High</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={1}>Low</MenuItem>
            </Select></FormControl>
          </div>
          <Button variant="contained" sx={{ marginTop: "25px" }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default Dashboard;

const Container = styled.div`
  margin-top: 72px;
  min-height: calc(100vh - 250px);
  padding: calc(3.5vw + 5px);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100%;
  background-color: #ffffff;
  opacity: 0.4;
  background-image: radial-gradient(#000000 0.75px, #ffffff 0.75px);
  background-size: 15px 15px;
  z-index: -1;
`;
