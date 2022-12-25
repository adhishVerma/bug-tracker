import { Button, TextField, Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import useUser from "../functions/store";
import { Navigate } from "react-router-dom";

function Login() {
  const userLogin = useUser((state) => state.loginUser);
  const user = useUser((state) => state.user);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async () => {
    const data = JSON.stringify({
      email: email,
      password: password,
    });
    const url = "http://localhost:5000/api/users/login";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    };
    try {
      const response = await axios.post(url, data, config);
      userLogin(response);
    } catch (error) {
      console.log(error);
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
          <Typography variant="h5">Log in</Typography>
          <Typography>Welcome back</Typography>
          <TextField
            variant="standard"
            label="user-id"
            size="small"
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <Password
            variant="standard"
            size="small"
            label="password"
            type="password"
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
          ></Password>
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </Wrapper>
      </Paper>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  margin-top: 72px;
  min-height: calc(100vh - 250px);
  padding: calc(3.5vw + 5px);
`;

const Wrapper = styled.div`
  margin-top: 200px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;

const Password = styled(TextField)`
  margin-bottom: 15px;
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
