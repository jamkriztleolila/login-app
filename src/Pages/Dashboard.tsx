import React, { useCallback, useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, CardActions, Typography,
  FormControl, FormLabel, Input, Button, Table, Divider, Alert, Stack
} from '@mui/joy';
import { User } from '../Service/DashboardService';
import { dashboardService, authenticationService, USER_ID } from '../instances';

const Dashboard = () => {
  const initialValues = {
    branchId: NaN,
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    position: '',
    password: '',
  };
  const [usersData, setUsersData] = useState<User[]>([]);
  const [username, setUsername] = useState<string | null>();
  const [userForm, setUserForm] = useState(initialValues);

  const [error, setError] = useState({
    branchId: false,
    userName: false,
    password: false,
  });

  const [alertState, setAlertState] = useState({
    show: false,
    message: '',
    title: '',
    errorColor: false,
  });

  const getUsers = useCallback(async () => {
    try {
      const data = await dashboardService.getAllUsers();
      setUsersData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  }

  const resetFields = async (e: any) => {
    setUserForm(initialValues);
    setAlertState({
      ...alertState,
      show: false
    });
  };

  const validateForm = () => {
    const hasMatchBranchId = usersData.find((u) => { return u.branchId === userForm.branchId });
    setError({
      branchId: userForm.branchId.toString() === '' || userForm.branchId.toString() === 'NaN',
      userName: userForm.userName === '',
      password: userForm.password === ''
    });

    if (hasMatchBranchId) {
      setError({
        ...error,
        branchId: true,
      });
      setAlertState({
        show: true,
        message: 'Branch ID already exists.',
        title: 'Error',
        errorColor: true,
      });
      return false;
    }

    const invalidFields = userForm.branchId.toString() === '' || userForm.branchId.toString() === 'NaN' || userForm.userName === '' || userForm.password === '';
    if (invalidFields) {
      setAlertState({
        show: true,
        message: 'Please fill in required fields.',
        title: 'Error',
        errorColor: true,
      });
    }
    return !invalidFields;
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if(validateForm() === true) {
      setUsersData(prev => [...prev, userForm]);
      setAlertState({
        show: true,
        message: 'Successfully added user!',
        title: 'Success',
        errorColor: false
      });
    }
  }

  const removeRecord = async (id: number) => {
    setUsersData(prev => {
      const idx = prev.findIndex((user) => user.branchId === id);
      prev.splice(idx, 1)
      return [...prev];
    });
  };

  useEffect(() => {
    if (sessionStorage.getItem(USER_ID) ) {
      setUsername(sessionStorage.getItem(USER_ID));
      getUsers();
    } else {
      authenticationService.logout();
    }
  }, [username, getUsers]);

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginTop: '1em' }}>
        <Grid xs={8}>
          <Typography level="h2">{username}</Typography>
        </Grid>
        <Grid xs={4} justifyContent={'flex-end'}>
          <Button size="lg" 
            onClick={() => authenticationService.logout()} 
            sx={{ marginLeft: 'auto', display: 'block' }} aria-label="logoutBtn">Logout</Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={2}>
      <Grid md={4} xs={12}>
        <Card>
          <CardContent>
            <Typography level="title-lg">Add user</Typography>
            <form id="dashboard-form" onSubmit={handleSubmit} autoComplete="false">
              <Stack spacing={1}>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <FormLabel required>Branch ID</FormLabel>
                  <Input
                    placeholder="Branch ID"
                    name="branchId"
                    size="sm"
                    onChange={handleChange}
                    value={userForm.branchId}
                    type="number"
                    error={error.branchId}
                    slotProps={{ input: { "aria-label": "branchId" } }} />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <FormLabel required>Username</FormLabel>
                  <Input
                    placeholder="Username"
                    name="userName"
                    size="sm"
                    onChange={handleChange}
                    value={userForm.userName}
                    error={error.userName}
                    slotProps={{ input: { "aria-label": "username" } }}  />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    size="sm"
                    onChange={handleChange}
                    value={userForm.firstName}
                    slotProps={{ input: { "aria-label": "firstName" } }} />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <FormLabel>Middle Name</FormLabel>
                  <Input
                    placeholder="Middle Name"
                    name="middleName"
                    size="sm"
                    onChange={handleChange}
                    value={userForm.middleName}
                    slotProps={{ input: { "aria-label": "middleName" } }} />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    size="sm"
                    onChange={handleChange}
                    value={userForm.lastName}
                    slotProps={{ input: { "aria-label": "lastName" } }} />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <FormLabel>Position</FormLabel>
                  <Input
                    placeholder="Position"
                    name="position"
                    size="sm"
                    onChange={handleChange}
                    value={userForm.position}
                    slotProps={{ input: { "aria-label": "position" } }} />
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                  <FormLabel required>Password</FormLabel>
                  <Input
                    placeholder="Password"
                    type="password"
                    size="sm"
                    name="password"
                    onChange={handleChange}
                    value={userForm.password}
                    error={error.password}
                    slotProps={{ input: { "aria-label": "password" } }} />
                </FormControl>

                {alertState.show ? <Alert
                    sx={{ alignItems: 'flex-start' }}
                    variant="soft"
                    color={alertState.errorColor ? 'danger' : 'success'}
                    title={alertState.title}>
                    <Typography level="body-sm" color={alertState.errorColor ? 'danger' : 'success'}>
                      {alertState.message}
                    </Typography>
                  </Alert> : ''
                }
                <CardActions sx={{ gridColumn: '1/-1', marginLeft: 'auto !important' }} >
                  <Button variant="outlined" color="primary" size="md" onClick={resetFields} aria-label="resetForm">
                    Reset
                  </Button>
                  <Button variant="solid" color="primary" size="md" type="submit" aria-label="addUser">
                    Add
                  </Button>
              </CardActions>
            </Stack>
          </form>
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
          {usersData.map((item: User, i: number) => (
            <tr key={`item-${item.branchId}`}>
              <td>{i + 1}</td>
              <td>{item.branchId}</td>
              <td>{`${item.firstName} ${item.middleName} ${item.lastName}`}</td>
              <td>{item.position}</td>
              <td><Button
                color="danger"
                onClick={() => removeRecord(item.branchId)}
                aria-label={`remove-${item.branchId}`}
                >Remove</Button></td>
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