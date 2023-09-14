import { Typography, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import React, { useRef, useState } from 'react'
import Tiny from '../Editor/Tiny'
import axios from 'axios'
import { toast } from 'react-toastify'

export const IssueData = (props) => {
    const { issue, close } = props;
    const desc = useRef();
    desc.current = issue.desc
    // populate component and form data from props
    const [formData, setFormData] = useState({
        status: issue.status,
        assignee: '',
        priority: issue.priority,
        desc: ''
    });

    const handleUpdate = async () => {
        formData['desc'] = desc.current
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/issues/${issue._id}`, {...formData});
        if(response.data.success){
            close()
            toast.success("Issue details updated");
        }
    }   

    return (
        <>
            <Typography style={{ marginBottom: 3 }}>{issue.type}</Typography>
            <Typography variant='h2' sx={{ fontSize: 24 }} style={{ marginBottom: 12 }}>{issue.name}</Typography>
            <div style={{ display: 'flex', gap: '2em', marginBottom: '15px' }}>
                <div style={{ flexGrow: 1, minWidth: 400 }}>
                    <Typography style={{ marginBottom: 3 }}><Tiny innerRef={desc} height={200} /></Typography>
                </div>
                <div style={{ marginLeft: '0.6em', display: 'flex', flexDirection: 'column' }}>
                    <FormControl fullWidth style={{ marginBottom: '1em' }}>
                        <InputLabel id="demo-simple-select-label">status</InputLabel>
                        <Select size='small' label='status' value={formData.status} onChange={(e) => { setFormData({ ...formData, status: e.target.value }) }}>
                            <MenuItem value={'open'}>open</MenuItem>
                            <MenuItem value={'closed'}>closed</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{ marginBottom: '1em' }}>
                        <InputLabel id="demo-simple-select-label">assignee</InputLabel>
                        <Select size='small' label='status' value={'person'}>
                            <MenuItem value={'person'}>Person</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{ marginBottom: '1em' }}>
                        <InputLabel id="demo-simple-select-label">priority</InputLabel>
                        <Select size='small' label='status' value={formData.priority} onChange={(e) => { setFormData({ ...formData, priority: e.target.value }) }}>
                            <MenuItem value={'high'}>high</MenuItem>
                            <MenuItem value={'medium'}>medium</MenuItem>
                            <MenuItem value={'low'}>low</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <Button variant='contained' onClick={handleUpdate}>Update</Button>
        </>
    )
}
