import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';
import userEvent from '@testing-library/user-event';
import '../setupTests';

const setup = () => {
  const utils = render(<Login />)
  const branchId = screen.getByLabelText('branchId', {selector: 'input'})
  const username = screen.getByLabelText('username', {selector: 'input'})
  const password = screen.getByLabelText('password', {selector: 'input'})
  return {
    branchId,
    username,
    password,
    ...utils,
  }
}

describe('<Login />', () => {
 
  test('match snapshot', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot()
  });

  test('form loads properly', () => {
    render(<Login />);
    const branchId = screen.getByText("Branch ID");
    const username = screen.getByText("Username");
    const password = screen.getByText("Password");
    expect(branchId).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  describe('Login behavior', () => {
    test('text fields are empty', async () => {
      render(<Login />);
      await userEvent.click(screen.getByRole('button'))
      expect(screen.getByText('Please complete the form')).toBeInTheDocument();
    });

    test('invalid username or password', async () => {
      const { branchId, username, password } = setup();
      fireEvent.change(branchId, {target: {value: '10001'}})
      fireEvent.change(username, {target: {value: 'testuser01'}})
      fireEvent.change(password, {target: {value: 'wrongPassword'}})
      await userEvent.click(screen.getByRole('button'))
      expect(screen.getByText('Username or Password is incorrect')).toBeInTheDocument();
    });

    test('valid credentials', async() => {
      const { branchId, username, password } = setup();
      fireEvent.change(branchId, {target: {value: '10001'}})
      fireEvent.change(username, {target: {value: 'testuser01'}})
      fireEvent.change(password, {target: {value: 'pa55w0rd001'}})
      await userEvent.click(screen.getByRole('button'))
      expect(screen.queryByText('Username or Password is incorrect')).not.toBeInTheDocument();
    });
  });


  describe('handleChange()', () => {
    test('should update state', () => {
      const { branchId } = setup();
      fireEvent.change(branchId, {target: {value: '10001'}})
      expect(branchId).toHaveValue(10001)
    });
  });
});