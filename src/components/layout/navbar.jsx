import styled from "@emotion/styled";
import { Avatar, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useUser from "../../functions/store";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      height: 36,
      width: 36
    },
    children: `${name.split(' ')[0][0]}`
  };
}

function Navbar() {
  const user = useUser((state) => state.user);
  const logoutUser = useUser((state) => state.logoutUser);
  return (
    <Nav>
      <Box sx={{ minWidth: "200px", display: "flex", justifyContent: "start" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>
            <img src="/neutron.png" alt="logo" />
            <span>Zoro</span>
          </Logo>
        </Link>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
        <Link style={{ textDecoration: "none" }} to="/me">{user && <Typography sx={{ color: "white", marginRight: "10px" }}>
          <Avatar {...stringAvatar(user.name)}></Avatar></Typography>}
          </Link>
        {user && (
          <Button color="inherit"  variant="contained" onClick={logoutUser}>
            Logout
          </Button>
        )}
      </Box>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.nav`
  // position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 80px;
  background-color: #129;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  z-index: 3;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  gap: 3px;

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

