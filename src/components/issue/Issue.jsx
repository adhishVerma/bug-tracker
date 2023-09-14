import { Button, Chip, TableCell, TableRow } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const colors = {
    'high'   : 'error',
    'low'    : 'info',
    'medium' : 'warning'
}

export const Issue = (props) => {
    const {issue} = props;

    const handleDelete = async () => {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/issues/${issue._id}`);
        // Toastify
        if(res.data.success === true){
            toast.success('Issue deleted');
            props.close()
        }else{
            toast.error('Error deleting issue');
        }
    }

    return (
        <>
            <TableRow>
                <TableCell>{String(issue._id).slice(16)}</TableCell>
                <TableCell>{issue.name}</TableCell>
                <TableCell>{issue.user}</TableCell>
                <TableCell>{new Date(issue.updatedAt).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }</TableCell>
                <TableCell><Chip label={issue.priority} color={colors[issue.priority]}></Chip></TableCell>
                <TableCell>{issue.status}</TableCell>
                <TableCell>
                    <div style={{ display: "flex", gap: 3 }}>
                        <Button variant="outlined" size='small' style={{ textTransform: 'capitalize' }} onClick={props.open}>Edit</Button>
                        <Button onClick={handleDelete} variant="outlined" color='error' size='small' style={{ textTransform: 'capitalize' }}>
                            Delete
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}
