import React from 'react'
import { Divider, Typography } from '@mui/material';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import BugReportSharpIcon from '@mui/icons-material/BugReportSharp';
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import styled from '@emotion/styled';
import { Link } from "react-router-dom";


export const SideMenu = () => {
  
  return (
    <Container>
      <CompanyInfo>
        <div style={{ width: 64, height: 64, overflow: 'hidden' }}>
          <img style={{ objectFit: 'cover' }} src='https://images.unsplash.com/photo-1531972111231-7482a960e109?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=129&q=66' alt='decoration'></img>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Typography style={{ fontSize: "16px" }}>Krunker.io</Typography>
          <Typography style={{ fontSize: "16px" }}>Mumbai, India</Typography></div>
      </CompanyInfo>
      <Link to="/" style={{ textDecoration: 'none' }}><Button><SettingsSharpIcon /> Manage Projects</Button></Link>
      <Link to="/create-project" style={{ textDecoration: 'none' }}><Button><AddCircleOutlineSharpIcon /> Create Project</Button></Link>
      <Divider />
      <Button><BugReportSharpIcon /> Bug reports</Button>
      <Button><TrendingUpSharpIcon /> Reports</Button>
    </Container>
  )
}

const Container = styled.div`
  display : flex;
  flex-direction : column;
  gap: 1em;
`;

const CompanyInfo = styled.div`
padding: 5px 20px;
display : flex;
gap : 6px;
`;


const Button = styled.button`
background : none;
outline : none;
border : none;
display :flex;
align-items: center;
cursor : pointer;
padding : 5px 20px;
gap : 0.5em;
font-size : 1.1em;
color : rgba(0,0,0,0.49)';
font-weight : 400;
`;