import { Box, Button, TextField, Typography, Grid, Avatar, Icon } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import api from '../../service/api';
import { useState } from 'react';
import { useAuthStore } from '../../hook/zustand';

const LoginBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '310px',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
});

const LoginForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    marginTop: '10%',
});

const GridStyle = ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

export function Login() {
    const setToken = useAuthStore(state => state.setToken);
    const setId = useAuthStore(state => state.setId);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', {
                email,
                password
            });
            console.log(response.data);
            const { token } = response.data;
            const { id } = response.data.user;
            setId(id);
            setToken(token);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid container spacing={2} sx={GridStyle}>
            <LoginBox>
                <Avatar sx={{ bgcolor: '#1565C0', width: 112, height: 112, zIndex: 1, m: -4 }}>
                    <Icon
                        component={PersonIcon}
                        sx={{ fontSize: 70, color: '#fff' }}
                    />
                </Avatar>
                <LoginForm onSubmit={handleSubmit}>
                    <Typography variant="h5" color="#636363" align="center">
                        User Login
                    </Typography>
                    <TextField
                        id="email"
                        label="email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
                        Login
                    </Button>
                </LoginForm>
                <Box sx={{ background: '#f8f8f8', width: '100%', marginBottom: '20px', p: 2.5, boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Don't have an account? <a href="/register">Register</a>
                    </Typography>
                </Box>
            </LoginBox>
        </Grid>
    );
}

