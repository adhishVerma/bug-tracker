import styled from "@emotion/styled";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useUser from "../functions/store";

function Navbar() {
  const user = useUser((state) => state.user);
  const logoutUser = useUser((state) => state.logoutUser);

  return (
    <Nav>
      <Box sx={{ minWidth: "200px", display: "flex", justifyContent: "start" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>
            <img src="/neutron.png" alt="logo" />
            <span>issue-tracker</span>
          </Logo>
        </Link>
      </Box>
      <NavMenu>
        <Link to="/dashboard">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/teams">Teams</Link>
      </NavMenu>
      <Box sx={{ minWidth: "200px", display: "flex", justifyContent: "end", alignItems : "center" }}>
        <Link style={{textDecoration : "none"}} to="/me">{user && <Typography sx={{color: "white", marginRight : "10px"}}>{user.name}</Typography>}</Link>
        {!user && (
          <Link to="/login">
            <Button variant="contained">Log in</Button>
          </Link>
        )}
        {user && (
          <Button variant="contained" onClick={logoutUser}>
            Logout
          </Button>
        )}
      </Box>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  z-index: 3;
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;

  a {
    margin-right: 25px;
    color: rgb(249, 249, 249);
    text-decoration: none;
    letter-spacing: 1.2px;
    opacity: 0.8;

    &:hover {
      color: rgb(255, 255, 255);
      opacity: 1;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  img {
    max-height: 28px;
    filter: invert();
    margin-right: 5px;
  }

  span {
    color: rgb(249, 249, 249);
    letter-spacing: 1.44px;
    text-decoration: none;
    text-transform: lowercase;
  }
`;
