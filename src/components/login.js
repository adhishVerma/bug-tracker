import { Alert, Button, TextField, Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import useUser from "../functions/store";
import { Navigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  const userLogin = useUser((state) => state.loginUser);
  const user = useUser((state) => state.user);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);
  const [alertContent, setAlertContent] = useState(null);

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
      setLoading(true);
      const response = await axios.post(url, data, config);
      userLogin(response.data);
      setAlert(false);
      setLoading(false);
    } catch (error) {
      setAlert(true);
      setAlertContent(error.response.data.message)
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
          <Typography variant="h5">Log in</Typography>
          <Typography>Welcome back</Typography>
          <TextField
            variant="standard"
            label="email"
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
          <Button
            sx={{ marginTop: "15px", marginBottom: "15px" }}
            variant="contained"
            onClick={handleSubmit}
          >
            {!loading ? (
              `Log in`
            ) : (
              <CircularProgress color="inherit" size={24} />
            )}
          </Button>
          <div>
            <Typography
              sx={{ color: "rgb(150,160,150)", display: "inline-block" }}
            >
              New User?
            </Typography>
            <Typography sx={{ display: "inline-block", marginLeft: "3px" }}>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "rgb(120,120,120)" }}
              >
                Register
              </Link>
            </Typography>
          </div>
        </Wrapper>
        {alert ? <Alert severity='error'>{alertContent}</Alert> : <></> }
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
  margin-top: 100px;
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
