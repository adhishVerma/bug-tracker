import { MenuItem, Select, Typography, TextField, Container, Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import Tiny from '../Editor/Tiny'
import useUser from "../../functions/store";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export const CreateIssue = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useUser((state) => state.user);
  const { token } = user;
  const config = {
    headers: { authorization: `Bearer ${token}` }
  }
  const desc = useRef();
  const [formData, setFormData] = useState({
    'issueName': null,
    'projectId': id,
    'priority': '',
    'taskType': '',
    'description': null,
    'userId': user._id
  });

  const handleSubmit = async () => {
    formData['description'] = desc.current
    console.log(formData);
    // axios post req
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/issues`, formData, config);
    // react toastify notify
    if(res.data.success === true){
      toast.success("Issue created successfully");
      navigate(-1);

    }else{
      toast.error("Error creating issue");
    }
  }

  return (
    <>
      <Container>
        <Typography style={{ marginBottom: 25, fontSize: 28, letterSpacing: 2, color: "rgba(0,0,0,0.49)" }}>Create Issue</Typography>
        <Form>
          <Typography style={{ color: "rgba(0,0,0,0.49)", fontSize: 24 }}>Issue Name</Typography>
          <TextField size='small' label-id='name' onChange={(e) => {
            setFormData({
              ...formData, issueName: e.target.value
            })
          }} />
          <Typography style={{ marginTop: '15px', fontWeight: 500, color: "rgba(0,0,0,0.49)", fontSize: 17 }}>Priority</Typography>
          <Select labelId='priority' size='small' value={formData.priority} onChange={(event) => {
            setFormData({ ...formData, priority: event.target.value })
          }}>
            <MenuItem value='high'>High</MenuItem>
            <MenuItem value='medium'>Medium</MenuItem>
            <MenuItem value='low'>Low</MenuItem>
          </Select>
          <Typography style={{ marginTop: '25px', fontWeight: 500, color: "rgba(0,0,0,0.49)", fontSize: 17 }}>Task Type</Typography>
          <Select labelId='issue-type' size='small' onChange={(event) => {
            setFormData({ ...formData, taskType: event.target.value })
          }}>
            <MenuItem value='bug'>bug</MenuItem>
            <MenuItem value='task'>new task</MenuItem>
          </Select>
          <Typography style={{ marginTop: '25px', fontWeight: 500, color: "rgba(0,0,0,0.49)", fontSize: 17 }}>Description</Typography>
          <Tiny innerRef={desc} height={300} />
          <Button onClick={handleSubmit} variant='contained' style={{ marginTop: '15px', maxWidth: 'max-content' }}>Submit</Button>
        </Form>
      </Container>
    </>
  )
}

const Form = styled.div`
display : flex;
flex-direction : column;

`