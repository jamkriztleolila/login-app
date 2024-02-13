import React from 'react';
import { users } from '../Data/users_data';

export interface User {
  branchId: number;
  userName: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
}

export default class DashboardService {
  constructor() { }
  getAllUsers(): Promise<User[]> {
    return Promise.resolve(users);
  }
}