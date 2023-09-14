import { useEffect, useState } from "react";
import useUser from "../functions/store";
import axios from "axios";
import styled from "@emotion/styled";
import {
  Typography,
  Skeleton,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
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

const User = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useUser((state) => state.user);
  const logOut = useUser((state) => state.logoutUser)
  const [userData, setData] = useState({});
  const [cPassword, setCPassword] = useState({});

  const handleDelete = async () => {
    const url = "http://localhost:5000/api/users/";
    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        email: user.email,
        password: cPassword,
      },
    };
    await axios.delete(url, config);
    handleClose();
    logOut()
  };

  useEffect(() => {
    async function getUser() {
      const url = "http://localhost:5000/api/users/me";
      const token = user.token;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(url, config);
      setData(response.data);
    }
    getUser();
  }, [user]);

  return (
    <Container>
      {userData.name ? (
        <Typography>{`Hello, ${userData.name}`}</Typography>
      ) : (
        <Skeleton variant="text" />
      )}
      <Button onClick={handleOpen}>Delete User</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            component="h3"
            sx={{ marginBottom: 3 }}
          >
            Confirm by rentering the password
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: "300px" }}
              id="confirm-password"
              label="password"
              variant="outlined"
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            ></TextField>
            <Button variant="contained" onClick={handleDelete}>
              Confirm deletion
            </Button>
          </div>
        </Box>
      </Modal>
    </Container>
  );
};

export default User;

const Container = styled.div`
  margin-top: 72px;
  min-height: calc(100vh - 250px);
  padding: calc(3.5vw + 5px);
`;
