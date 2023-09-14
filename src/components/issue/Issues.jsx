import { Box, Modal, Container, CssBaseline, Paper, TableContainer, TableRow, TableHead, TableBody, Table, TableCell, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Issue } from './Issue';
import { IssueData } from './IssueData';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #777',
    boxShadow: 4,
    p: 4,
    borderRadius: '0.3em'
};


export const Issues = () => {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [issueList, setIssueList] = useState([]);
    const [currentIssue, setCurrentIssue] = useState();

    const handleOpen = async (e, issueId) => {
        // fetching the issue data from the server and populating it into the modal.
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/issues/${issueId}`)
        const issue = res.data.issue;
        setCurrentIssue(issue);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setLoading(true);
    }

    useEffect(() => {
        // fetching issues
        const fetchIssues = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/issues/project/${id}`)
            setIssueList(res.data.issues);
            setLoading(false);
            setTitle(res.data.name)
        }
        if(loading){
            fetchIssues();
        }
    }, [loading, id])
    
    

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '2em', marginBottom: '1em' }}>{title}</Typography>
                <Link to={`create-issue`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: '#2196f3' }}><AddCircleOutlineSharpIcon /><span style={{ marginLeft: '3px' }}>Create Issue</span></Link>
            </div>
            <CssBaseline />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 120 }}>ID</TableCell>
                            <TableCell>Issue</TableCell>
                            <TableCell>Creator</TableCell>
                            <TableCell>Last change</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell style={{ width: 100, textAlign: 'center' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {issueList.map((issue) =>
                            <Issue open={(e) => handleOpen(e, issue._id)} close={() => {setLoading(true)}} issue={issue} key={issue._id} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <IssueData issue={currentIssue} close={(e) => handleClose()}/>
                </Box>
            </Modal>
        </Container>

    )
}
