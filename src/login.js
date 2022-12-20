import { Button, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import AssignmentIcon from "@mui/icons-material/Assignment";

function Login() {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <AssignmentIcon />
        </Logo>
        <Typography variant="h5">Log in</Typography>
        <Typography>Welcome back 👋</Typography>
        <TextField
          variant="filled"
          label="user-id"
          size="small"
          margin="dense"
        ></TextField>
        <Password
          variant="filled"
          size="small"
          label="password"
          type="password"
          margin="dense"
        ></Password>
        <Button variant="contained">Login</Button>
      </Wrapper>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  height: calc(100vh - 250px);
  padding: calc(3.5vw + 5px);
`;

const Wrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  border: 1px solid whitesmoke;
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  max-width: 450px;
  padding: 2rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 2px 10px 16px -8px rgba(18, 27, 38, 0.24);
  -moz-box-shadow: 2px 10px 16px -8px rgba(18, 27, 38, 0.24);
  box-shadow: 2px 10px 16px -8px rgba(18, 27, 38, 0.24);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  font-size: 24px;
  gap: 1rem;
`;

const Password = styled(TextField)`
  margin-bottom: 15px;
`;
