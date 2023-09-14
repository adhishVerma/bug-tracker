import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import * as React from "react";



function Projects() {

  return (
    <Container>
      <Background />
      <Typography variant="h2" sx={{ marginBottom: "25px" }}>
        Projects
      </Typography>
      {/* <Button
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
      </Button> */}
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

