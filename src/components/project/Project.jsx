import React from 'react';
import { TableRow, TableCell, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom'
import useUser from '../../functions/store'
import axios from 'axios';
import { toast } from 'react-toastify';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


export const Project = (props) => {
  const user = useUser((state) => state.user);

  const { token } = user;
  const config = {
    headers: { authorization: `Bearer ${token}` }
  }

  const deleteProject = async (e) => {
    const projectId = e.target.dataset['id']
    try{
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/projects/${projectId}`, config);
      console.log(res);
      if(res.data.success===true){
        toast.success('Project deleted');
        props.reload();
      }else{
        toast.error('Error deleting project')
      }
    }catch(err){
      toast.error(err.message);
    }

  }

  
  return (
    <>
      <TableRow>
        <TableCell><Link style={{ textDecoration: 'none', color: '#2196f3' }} to={`/project/${props.id}`}>{props.name}</Link></TableCell>
        <TableCell><Chip variant="outlined" color="success" label={props.creator} /></TableCell>
        <TableCell>{new Date(props.created).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</TableCell>
        <TableCell>{new Date(props.updated).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</TableCell>
        <TableCell>
          <div style={{ display: "flex", gap: 3 }}>
            <Button variant="outlined" size='small' style={{ textTransform: 'capitalize' }} data-id={props.id} onClick={props.openDrawer}>Edit<ModeEditOutlineOutlinedIcon style={{marginLeft : 2, fontSize : 15, pointerEvents : 'none'}}/> </Button>
            <Button variant="outlined" size='small' style={{ textTransform: 'capitalize' }} data-id={props.id} color="error" onClick={deleteProject}>Delete<DeleteOutlinedIcon style={{marginLeft : 2, fontSize : 15, pointerEvents : 'none'}}/></Button>
          </div>
        </TableCell>
      </TableRow>
      
    </>
  )
}
