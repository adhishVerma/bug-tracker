import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { AddCircleOutlineSharp } from "@mui/icons-material";
import MediaCard from "./card";
import { TextField, Box, Modal, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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

function Projects() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Background />
      <Typography variant="h2" sx={{ marginBottom: "25px" }}>
        Projects
      </Typography>
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
        <span>Create a Project</span>
      </Button>
      <Content>
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </Content>
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
            Create Project
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <TextField id="name" label="name" variant="outlined"></TextField>
            <TextField id="desc" label="description" variant="outlined" multiline></TextField>
            <FormControl>
            <InputLabel id="team">team</InputLabel>
            <Select label="team"
            labelId="demo-simple-select-label"
            id="demo-simple-select">
                <MenuItem value="team1">team1</MenuItem>
                <MenuItem value="team2">team2</MenuItem>
                <MenuItem value="team3">team3</MenuItem>
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

export default Projects;

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

const Content = styled.div`
  display: grid;
  row-gap: 40px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;
