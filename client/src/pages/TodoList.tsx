import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import { useAuthStore } from '../../hook/zustand';
import { useState, useEffect } from 'react';
import api from '../../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            await api.post('/tasks', {
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
            toast.success('Todo criado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    }

    const handleComplete = async (id: number, title: string, description: string, user_id: number, due_date: Date) => {
        try {
            console.log(id, title, description);
            await api.put(`/tasks/${id}`, {
                title,
                description,
                completed_at: new Date(),
                completed: true,
                user_id,
                due_date
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Todo completado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Todo deletado com sucesso!');
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
        {
            field: 'completed_at', headerName: 'Completed at', width: 500, valueGetter: (params) => {
                if (params.value === null) {
                    return "Not completed";
                } else {
                    return new Date(params.value);
                }
            }
        },
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
                            id,
                            params.row.due_date,
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

    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <ToastContainer />
            <Button onClick={() => { setIsModalOpen(true) }}>
                Criar todo
            </Button>

            {
                isModalOpen && <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="title"
                        type="text"
                        label="Title"
                        variant='standard'
                        onChange={(e) => setTitle(e.target.value)}

                    />
                    <TextField
                        id="description"
                        type="text"
                        label="Description"
                        value={description}
                        variant='standard'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        id="due_date"
                        type="date"
                        label="Due Date"
                        value={due_date}
                        variant='standard'
                        onChange={(e) => setDue_date(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>
                        Submitd
                    </Button>
                </Box>
            }

            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
            />

        </Box>
    );
}
