import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AddCircleOutlineSharp } from "@mui/icons-material";
import {Button, TextField,
  Box,
  Modal,
Tooltip} from "@mui/material";

import * as React from "react";

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

function Teams() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Container>
      <Background />
      <Typography variant="h2" sx={{marginBottom : "25px"}}>Hello to teams</Typography>
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
        <span>Create a Team</span>
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <Typography variant="h6" sx={{"margin" : "15px"}}>Team Name</Typography>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell>role</TableCell>
              <TableCell>email</TableCell>
              <TableCell>expertise</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>John doe</TableCell>
            <TableCell>Lead</TableCell>
            <TableCell>123@test.com</TableCell>
            <TableCell>front-end</TableCell>
          </TableBody>
        </Table>
      </TableContainer>
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
            Create Team
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <TextField id="name" label="name" variant="outlined"></TextField>
            <TextField id="desc" label="description" variant="outlined"></TextField>
            <Tooltip title="separate members by a comma (,)" arrow>
            <TextField id="team-members" label="Members" variant="outlined"></TextField></Tooltip>
          </div>
          <Button variant="contained" sx={{ marginTop: "25px" }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default Teams;

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
