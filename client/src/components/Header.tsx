import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import api from '../../service/api';
import { useAuthStore } from '../../hook/zustand';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Header() {
    const { token } = useAuthStore(state => state);
    const setLogout = useAuthStore(state => state.logout);
    const navigator = useNavigate();
    console.log(token);
    const handleLogoutUser = async () => {
        try {
            await api.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLogout();
            toast.success('Logout realizado com sucesso!');
            navigator('/');

        } catch (error) {
            console.log(error);
        }

    };


    return (
        <AppBar position="static">
            <ToastContainer />
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TODO-LIST
                        </Typography>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TODO-LIST
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleLogoutUser} sx={{ p: 0 }}>
                                <ExitToAppIcon
                                    sx={{
                                        color: 'white',
                                        fontSize: '2rem',
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}