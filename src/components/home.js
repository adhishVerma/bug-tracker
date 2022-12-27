import { Typography } from "@mui/material";
import styled from "@emotion/styled";

function Home() {
  return ( 
    <Container>
      <Background/>
      <Typography variant="h2">Hello World</Typography>
      <Typography sx={{marginTop : "45px",marginBottom : "45px"}} variant="h5">Are you tired of using clunky, outdated tools for managing and tracking bugs in your software projects? Our application is here to help. With a sleek and intuitive interface, our bug tracking system makes it easy for you and your team to collaborate on multiple projects and ensure that all bugs are addressed in a timely manner.</Typography>
     
      <Typography variant="h4" sx={{fontWeight : "300"}}>Some key features of our bug tracking web application include:</Typography> <ul>
        <li><Typography>Collaboration: Work with your team members in real-time to identify and fix bugs.</Typography></li>
        <li><Typography>Customization: Customize your projects and workflow to fit your unique needs and processes.</Typography></li>
        <li><Typography>Reporting: Generate reports to track the progress of your bug resolution efforts.</Typography></li>
      </ul>
    </Container>
   );
}

export default Home;

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
  height : 100%;
`;