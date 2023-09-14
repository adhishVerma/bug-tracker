import React from 'react'
import { Avatar, Button } from '@mui/material';
import axios from 'axios';
import useUser from '../../functions/store'
import { toast } from 'react-toastify';



export const Team = (props) => {
  const team = props.team;
  const user = useUser((state) => state.user);
  const { token } = user;
  const config = {
    headers: { authorization: `Bearer ${token}` }
  }

  const handleRemove = async (memberId) => {
    const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/teams/${props.projectId}`,{
      operation : 'remove',
      userId : memberId
    },config)
    if(res.data.success){
      toast.success("Member removed")
    }
  }

  return (
    <div>
      {team && team.map((item) => {
        return <div key={item._id} style={{ display: 'flex', gap: 3, alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
          <div style={{ display: 'flex', flexGrow: 1, gap: 3 }}>
            <Avatar sx={{ width: 24, height: 24, background: '#A9A9A9' }}></Avatar><span>{item.name ? item.name : 'name'}</span>
          </div>
          <Button onClick={() => {handleRemove(item.userId)}} variant='contained' color='error' sx={{ height: 28, width: 28, fontSize: 12 }}>Remove</Button>
        </div>
      })}
    </div>

  )
}
