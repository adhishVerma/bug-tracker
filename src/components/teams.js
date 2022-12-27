import styled from "@emotion/styled";
import { Divider, IconButton, Paper, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AddCircleOutlineSharp } from "@mui/icons-material";
import { Button, TextField, Box, Modal, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import useUser from "../functions/store";
import axios from "axios";
import { useEffect } from "react";
import Chip from '@mui/material/Chip';

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
  const user = useUser((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = (teamID) => {
    setOpenAdd(true);
    setEditTeam(teamID);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setEditTeam(null);
  };
  const [teamList, setTeamList] = React.useState(null);
  const [newTeam, setNewTeam] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const [editTeam, setEditTeam] = React.useState(null);

  const handleSubmit = async () => {
    // create team req
    const token = user.token;
    const data = JSON.stringify(newTeam);
    const url = "http://localhost:5000/api/teams";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post(url, data, config);
    handleClose();
    setNewTeam({});
    setLoading(true);
  };

  const handleName = (e) => {
    setNewTeam({
      ...newTeam,
      name: e.target.value,
    });
  };

  const handleDesc = (e) => {
    setNewTeam({
      ...newTeam,
      desc: e.target.value,
    });
  };

  const handleMembers = (e) => {
    setNewTeam({
      ...newTeam,
      members: e.target.value,
    });
  };

  const handleDelete = async (teamID) => {
    const url = `http://localhost:5000/api/teams/${teamID}`;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(url, config);
    setLoading(true);
  };

  useEffect(() => {
    const getTeams = async () => {
      const url = "http://localhost:5000/api/teams";
      const token = user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(url, config);
      let teams = response.data;
      teams = await Promise.all(
        teams.map((team) => {
          const newUrl = url + `/${team._id}`;
          const getTeam = axios.get(newUrl, config);
          return getTeam;
        })
      );
      const teamsData = teams.map((team) => team.data);
      setTeamList(teamsData);
    };

    getTeams();
    setLoading(false);
    // eslint-disable-next-line
  }, [loading]);

  const handleEdit = async (type, teamID, memberEmail = null) => {
    const url = `http://localhost:5000/api/teams/${teamID}`;
    const token = user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        Authorization: `Bearer ${token}`,
      },
    };
    if (type === "add") {
      const data = {
        operation: type,
        members: newTeam.members,
      };

      await axios.put(url, data, config);
    } else if (type === "remove") {
      const data = {
        operation: type,
        member: memberEmail,
      };
      await axios.put(url, data, config);
    }
    handleCloseAdd();
    setLoading(true);
  };

  return (
    <Container>
      <Background />
      <Typography variant="h2" sx={{ marginBottom: "25px" }}>
        Hello to teams
      </Typography>
      <Button
        style={{
          marginTop: "25px",
          marginBottom: "25px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
        onClick={handleOpen}
      >
        <AddCircleOutlineSharp />
        <span>Create a Team</span>
      </Button>
      {teamList?.map((team) => {
        return (
          <TableContainer
            key={team._id}
            component={Paper}
            sx={{ marginBottom: "25px", width: "max-content" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ margin: "15px" }}>{team.name}</Typography>
              <div>
                <IconButton onClick={(e) => handleOpenAdd(team._id)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={(e) => handleDelete(team._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell>role</TableCell>
                  <TableCell>email</TableCell>
                  <TableCell>remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>lead</TableCell>
                  <TableCell>{team.lead}</TableCell>
                  <TableCell><Chip label="leave" onClick={(e) => {console.log(e)}}/></TableCell>
                </TableRow>
                {team.members.map((member) => {
                  
                  return (
                    <TableRow key={member}>
                      <TableCell>John</TableCell>
                      <TableCell>member</TableCell>
                      <TableCell>{member}</TableCell>
                      <TableCell><Chip label="remove" onClick={(e) => handleEdit("remove", team._id,member)}/></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
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
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={handleName}
            ></TextField>
            <TextField
              id="desc"
              label="Description"
              variant="outlined"
              onChange={handleDesc}
            ></TextField>
            <Tooltip title="separate members by a comma" arrow>
              <TextField
                id="team-members"
                label="add members by email"
                variant="outlined"
                onChange={handleMembers}
              ></TextField>
            </Tooltip>
          </div>
          <Button
            variant="contained"
            sx={{ marginTop: "25px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
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
            Add Members
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Tooltip title="separate members by a comma" arrow>
              <TextField
                id="team-members"
                label="add members by email"
                variant="outlined"
                onChange={handleMembers}
              ></TextField>
            </Tooltip>
          </div>
          <Button
            variant="contained"
            sx={{ marginTop: "25px" }}
            onClick={(e) => handleEdit("add", editTeam)}
          >
            Add Members
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
