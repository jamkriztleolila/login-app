import React, { useState } from 'react';
import {
  Container, Grid, Card, CardContent, CardActions, Typography,
  FormControl, FormLabel, Input, Button, Table, Divider
} from '@mui/joy';
import { users } from '../Data/users_data';

const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Typography level="h2">User</Typography>
        </Grid>
        <Grid xs={4} justifyContent={'flex-end'}>
          <Button size="lg">Logout</Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
      <Grid md={4} xs={12}>
        {/* <Item>xs=8</Item> */}
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
              <FormLabel>First Name</FormLabel>
              <Input placeholder="First Name" />
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>Middle Name</FormLabel>
              <Input placeholder="Middle Name" />
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Last Name" />
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>Position</FormLabel>
              <Input placeholder="Position" />
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" type='password' />
            </FormControl>
            <CardActions sx={{ gridColumn: '1/-1' }}>
              <Button variant="outlined" color="primary">
                Reset
              </Button>
              <Button variant="solid" color="primary">
                Add
              </Button>
          </CardActions>
          </CardContent>
        </Card>
      </Grid>
      <Grid md={8} xs={12}>
      <Table>
      <thead>
        <tr>
          <th style={{ width: '5%' }}>#</th>
          <th style={{ width: '10%' }}>Branch ID</th>
          <th>Name</th>
          <th>Position</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, i) => (
          <tr key={`item-${item.branchId}`}>
            <td>{i + 1}</td>
            <td>{item.branchId}</td>
            <td>{`${item.firstName} ${item.middleName} ${item.lastName}`}</td>
            <td>{item.position}</td>
            <td><Button color="danger">Remove</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
      </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;