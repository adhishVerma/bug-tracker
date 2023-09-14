import React, { useRef, useState } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import Tiny from '../Editor/Tiny';
import { Team } from './Team';
import axios from 'axios';
import useUser from '../../functions/store'
import { toast } from 'react-toastify';


const style = {
    minWidth: 400,
    bgcolor: "background.paper",
    p: 4,
};

export const ProjectData = (props) => {
    
    const { project } = props;
    const [memberId, setMemberId] = useState();
    const [formData, setFormData] = useState(project)
    const desc = useRef(project.desc);
    const user = useUser((state) => state.user);

    const { token } = user;
    const config = {
        headers: { authorization: `Bearer ${token}` }
    }   

    const handleAddMember = async () => {
        try{
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/teams/${project._id}`, {
                operation : 'add',
                userId : memberId
            }, config);
            if(res.data.success){
                toast.success("Member added")
            }else{
                toast.error("add member failed")
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleSave = async () => {
        try {
            formData['desc'] = desc.current
            delete formData.team
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/projects/${project._id}`, formData, config)
            if (response.status === 200) {
                toast.success('changes saved')
                props.reload()
            }
        } catch (err) {

        }
    }


    return (
        <>
            <Box sx={style} component='form'>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <TextField size='small' style={{ marginBottom: 12 }} id="project-name" label="name" value={formData.name} defaultValue={formData.value} onChange={(e) => {
                        setFormData({
                            ...formData,
                            name: e.target.value
                        })
                    }}></TextField>
                    <Typography style={{ fontWeight: 500, color: "rgba(0,0,0,0.49)", fontSize: 17 }}>Description</Typography>
                    <Tiny width={400} innerRef={desc} />
                    <FormControl size='small' style={{ marginTop: 12 }}>
                        <InputLabel id="status">status</InputLabel>
                        <Select label="status"
                            labelId="simple-select-label"
                            id="simple-select" value={formData.status} onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    status: e.target.value
                                })
                            }}>
                            <MenuItem value="open">open</MenuItem>
                            <MenuItem value="closed">closed</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography style={{marginTop : 12, fontWeight: 500, color: "rgba(0,0,0,0.49)", fontSize: 17 }}>Team</Typography>
                    <div style={{ display: 'flex', gap: 3, marginBottom : 6 }}>
                        <TextField style={{ flexGrow: 1 }} id='add-team' size='small' placeholder='Enter userId' label='add-member' value={memberId} onChange={(e) => {setMemberId(e.target.value)}}></TextField>
                        <Button onClick={handleAddMember} variant='contained'>Add</Button>
                    </div>
                    <Team team={formData.team} projectId={project._id}/>
                </div>
                <Button onClick={handleSave} variant="contained" sx={{ marginTop: "25px", marginRight: '10px' }}>
                    Save
                </Button>
            </Box></>
    )
}
