import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import { useAuthStore } from '../../hook/zustand';
import { useState, useEffect } from 'react';
import api from '../../service/api';

export function TodoList() {
    const [rows, setRows] = useState([]);
    const { token } = useAuthStore(state => state);
    const { id } = useAuthStore(state => state);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDue_date] = useState(Date);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const response = await api.post('/tasks', {
                title,
                description,
                due_date,
                user_id: id,
                completed: false,
                completed_at: null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleComplete = async (id: number, title: string, description: string, user_id: number) => {
        try {
            console.log(id, title, description);
            const response = await api.put(`/tasks/${id}`, {
                title,
                description,
                completed_at: new Date(),
                completed: true,
                user_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await api.delete(`/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        api.get(`/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setRows(response.data)
        })
    }, [token, id]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'due_date', headerName: 'Due Date', width: 200, type: 'date', valueGetter: (params) => new Date(params.value) },
        { field: 'completed_at', headerName: 'Completed at', width: 100, type: 'date', valueGetter: (params) => new Date(params.value) },
        {
            field: 'complete',
            headerName: 'Complete Task',
            width: 100,
            renderCell: (params) => {
                return (
                    <Button onClick={() => {
                        handleComplete(
                            params.row.id,
                            params.row.title,
                            params.row.description,
                            id
                        )
                    }}>
                        Complete
                    </Button>
                )
            }
        },
        {
            field: 'delete',
            headerName: 'Delete Task',
            width: 100,
            renderCell: (params) => {
                return (
                    <Button onClick={() => {
                        handleDelete(params.row.id)
                    }}>
                        Delete
                    </Button>
                )
            }
        },
    ];

    const FormModal = () => {
        return (
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    type="text"
                    label="Title"
                    value={title}
                    variant='standard'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    type="text"
                    label="Description"
                    value={description}
                    variant='standard'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    type="date"
                    label="Due Date"
                    value={due_date}
                    variant='standard'
                    onChange={(e) => setDue_date(e.target.value)}
                />
                <Button onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        )
    }

    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <Button onClick={() => { setIsModalOpen(true) }}>
                Criar todo
            </Button>

            {isModalOpen && <FormModal />}

            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
            />

        </Box>
    );
}
