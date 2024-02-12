import React from 'react';
import {
  Container, Grid, Button, Card, Typography, CardContent, TextField, FormControl,
  Input, FormLabel, CardActions
} from '@mui/joy';

const Login = () => {
  return (
    <Container id="login-card" maxWidth="sm">
      <Card>
        <CardContent>
          <Typography level="title-lg">Login</Typography>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Branch ID</FormLabel>
            <Input placeholder="Branch ID"  />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Username</FormLabel>
            <Input placeholder="Username"  />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" type='password' />
          </FormControl>
          <CardActions sx={{ gridColumn: '1/-1' }}>
            <Button variant="solid" color="primary">
              Login
            </Button>
        </CardActions>
        </CardContent>
      </Card>
    </Container>
  );

};

export default Login;