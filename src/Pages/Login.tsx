import React, { useState } from 'react';
import {
  Container, Button, Card, Typography, CardContent, FormControl,
  Input, FormLabel, CardActions, Alert, Stack
} from '@mui/joy';
import { authenticationService } from '../instances';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    branchId: NaN,
    userName: '',
    password: '',
  });

  const [error, setError] = useState({
    branchId: false,
    userName: false,
    password: false
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const [errorState, setErrorState] = useState({
    value: false,
    message: ''
  });

  const validateForm = () => {
    const invalidFields = loginForm.branchId.toString() === '' || loginForm.branchId.toString() === 'NaN' || loginForm.userName === '' || loginForm.password === '';
    setError({
      branchId: loginForm.branchId.toString() === '' || loginForm.branchId.toString() === 'NaN',
      userName: loginForm.userName === '',
      password: loginForm.password === ''
    });
    setErrorState({
      value: true,
      message: 'Please complete the form'
    });
    return !invalidFields;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      const auth = authenticationService.authenticate(loginForm.branchId, loginForm.userName, loginForm.password);
      if (!auth) {
        setErrorState({
          value: true,
          message: 'Username or Password is incorrect'
        });
      } else {
        setErrorState({
          value: false,
          message: ''
        });
      }
    }
  }

  return (
    <Container id="login-container" maxWidth="sm">
      <Card id="login-card">
        <CardContent sx={{ padding: '1em' }}>
          <Typography level="h3" sx={{ gap: 2 }}>Login</Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={1}>
              <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>Branch ID</FormLabel>
                <Input
                  placeholder="Branch ID"
                  name="branchId" 
                  onChange={handleChange}
                  value={loginForm.branchId}
                  error={error.branchId}
                  type="number"
                  slotProps={{ input: { "aria-label": "branchId" } }} />
              </FormControl>
              <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  name="userName"
                  onChange={handleChange}
                  value={loginForm.userName}
                  error={error.userName}
                  slotProps={{ input: { "aria-label": "username" } }} />
              </FormControl>
              <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={loginForm.password}
                  error={error.password}
                  slotProps={{ input: { "aria-label": "password" } }} />
              </FormControl>
              <CardActions sx={{ gridColumn: '1/-1' }}>
                <Button variant="solid" color="primary" type="submit" size="lg">
                  Login
                </Button>
              </CardActions>
              {errorState.value ? <Alert
                  sx={{ alignItems: 'flex-start' }}
                  variant="soft"
                  color="danger"
                  title="Error">
                  <Typography level="body-sm" color="danger">
                    {errorState.message}
                  </Typography>
                </Alert> : ''
              }
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );

};

export default Login;