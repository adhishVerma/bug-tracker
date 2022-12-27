import { Alert,Button, TextField, Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import useUser from "../functions/store";
import { Link, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";


function Register() {
  const userLogin = useUser((state) => state.loginUser);
  const user = useUser((state) => state.user);
  const [userData, setData] = useState({
    name : "",
    email : "",
    password : ""
  });
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(null)
  const [alert, setAlert] = useState(null);

  function handlePassword(e) {
    setData({
      ...userData,
      password : e.target.value  
    })
  }
  function handleName(e) {
    setData({
      ...userData,
      name : e.target.value  
    })
  }
  function handleEmail(e) {
    setData({
      ...userData,
      email : e.target.value  
    })
  }


  const confirmPassword = (e) => {
    if (e.target.value === userData.password) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async () => {
    const data = JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    const url = "http://localhost:5000/api/users/";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    };
    try {
      setLoading(true)
      const response = await axios.post(url, data, config);
      userLogin(response.data);
      setLoading(false)
    } catch (error) {
      setAlert(true);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Background />
      <Paper
        elevation={3}
        style={{
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Wrapper>
          <Typography variant="h5">Register</Typography>
          <div>
            <Typography
              sx={{ color: "rgb(150,160,150)", display: "inline-block" }}
            >
              already registered ?
            </Typography>
            <Typography sx={{ display: "inline-block", marginLeft: "3px" }}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "rgb(120,120,120)" }}
              >
                Login
              </Link>
            </Typography>
          </div>
          <TextField
            variant="standard"
            label="user-id"
            size="small"
            margin="dense"
            onChange={handleName}
          ></TextField>
          <TextField
            variant="standard"
            label="email"
            size="small"
            margin="dense"
            type="email"
            onChange={handleEmail}
          ></TextField>
          <Password
            variant="standard"
            size="small"
            label="password"
            type="password"
            margin="dense"
            onChange={handlePassword}
          ></Password>
          <Password
            variant="standard"
            size="small"
            label="confirm-password"
            type="password"
            margin="dense"
            onChange={confirmPassword}
          ></Password>
          <Button
            sx={{ marginTop: "25px" }}
            variant="contained"
            onClick={handleSubmit}
            disabled={disableButton}
          >
            {!loading? `Register` : <CircularProgress color="inherit" size={24}/>}
          </Button>
        </Wrapper>
        {alert ? <Alert severity='error'>Something went wrong</Alert> : <></> }
      </Paper>
    </Container>
  );
}

export default Register;

const Container = styled.div`
  margin-top: 72px;
  min-height: calc(100vh - 250px);
  padding: calc(3.5vw + 5px);
`;

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

const Password = styled(TextField)``;

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
