import React from 'react';
import { users } from '../Data/users_data';
import { USER_ID } from '../instances'; 

export interface User {
  branchId: number;
  userName: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
}

export default class AuthenticationService {
  constructor() { }

  setUserSession(username: string) {
    sessionStorage.setItem(USER_ID, username);
  }

  removeUserSession() {
    if (sessionStorage.getItem(USER_ID)) {
      sessionStorage.removeItem(USER_ID);
    }
  }

  authenticate(branchId: number, userName: string, password: string): boolean | void {
    const userData = [...users];
    try {
      const result = userData.filter((data) => data.branchId == branchId && data.userName === userName && data.password === password);
      if (result !== null) {
        this.setUserSession(result[0].userName);
        window.location.replace(`${window.location.origin}/dashboard`);
        return true;
      } else {
        return false;
      }
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  logout() {
    this.removeUserSession();
    window.location.replace(`${window.location.origin}/`);
  }
}