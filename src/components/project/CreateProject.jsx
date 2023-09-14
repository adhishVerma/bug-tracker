import styled from '@emotion/styled'
import { Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import Tiny from '../Editor/Tiny';
import useUser from "../../functions/store";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const CreateProject = () => {
  const navigate = useNavigate();
  const user = useUser((state) => state.user);
  const description = useRef('')
  const [formData, setFormData] = useState({
    'name' : null,
    'description' : description.current,
    'userId' : user._id    
  })

  const handleSubmit = async () => {
    formData['description'] = description.current
    try{
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/projects`, formData);
      if(response.data.success === true){
        toast.success('Project created successfully')
        navigate(-1);
      }else{
        toast.error('Project creation Failed')
      }
    }catch(err){
      toast.error('Project creation Failed')
    }
  }

  return (
    <Container>
      <Form>
        <Typography style={{ marginBottom: 25, fontSize: 28, letterSpacing: 2, color: "rgba(0,0,0,0.49)" }}>Create project</Typography>
        <Typography style={{fontWeight : 500 ,color: "rgba(0,0,0,0.49)", fontSize : 17}}>Project Name</Typography>
        <TextField onChange={(e) => {
          setFormData({
            ...formData,
            name : e.target.value
          })
        }} size='small'></TextField>
        <Typography style={{fontWeight : 500 ,color: "rgba(0,0,0,0.49)", fontSize : 17}}>Description</Typography>
        <Tiny innerRef={description}/>
        <Button onClick={handleSubmit} variant='contained' style={{maxWidth : 'max-content'}}>Create project</Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display : flex;
  justify-content : center;
  width : 100%;
  // background : aqua;
`;

const Form = styled.div`
  display : flex;
  flex-direction : column;
  // background : tomato;
  min-width : 600px;
  gap : 0.66em;
`;