import React from 'react';
import { render, screen, renderHook, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';
import userEvent from '@testing-library/user-event';
import '../setupTests';


const mockUser = 'testUser01';
const MOCK_USER_ID = 'userId';
const setup = () => {
  const utils = render(<Dashboard />)
  const branchId = screen.getByLabelText('branchId', {selector: 'input'})
  const username = screen.getByLabelText('username', {selector: 'input'})
  const firstName = screen.getByLabelText('firstName', {selector: 'input'})
  const middleName = screen.getByLabelText('middleName', {selector: 'input'})
  const lastName = screen.getByLabelText('lastName', {selector: 'input'})
  const position = screen.getByLabelText('position', {selector: 'input'})
  const password = screen.getByLabelText('password', {selector: 'input'})
  return {
    branchId,
    username,
    firstName,
    middleName,
    lastName,
    position,
    password,
    ...utils,
  }
}

describe('<Dashboard />', () => {
  test('match snapshot', () => {
    const { container } = render(<Dashboard />);
    expect(container).toMatchSnapshot()
  });

  test('read username on dashboard', () => {
    window.sessionStorage.setItem(MOCK_USER_ID, mockUser);
    render(<Dashboard />);
    const usernameOnScreen = screen.getByText(mockUser);
    expect(usernameOnScreen).toBeInTheDocument();
  });

  test('no userId found in sessionStorage', () => {
    render(<Dashboard />);
    if (window.sessionStorage.getItem(MOCK_USER_ID)) {
      window.sessionStorage.removeItem(MOCK_USER_ID);
    }
    expect(window.sessionStorage.getItem(MOCK_USER_ID)).toBeNull();
  });

  describe('handleChange()', () => {
    beforeEach(() => {
      window.sessionStorage.setItem(MOCK_USER_ID, mockUser);
    });
    test('should update state', () => {
      const { branchId } = setup();
      fireEvent.change(branchId, {target: {value: '10001'}})
      expect(branchId).toHaveValue(10001)
    });
  });

  describe('handleSubmit()', () => {
    beforeEach(() => {
      window.sessionStorage.setItem(MOCK_USER_ID, mockUser);
    });
    test('empty fields', async () => {
      render(<Dashboard />);
      await userEvent.click(screen.getByLabelText('addUser', { selector: 'button' }));
      expect(screen.getByText('Please fill in required fields.')).toBeInTheDocument();
    });

    test('branch Id already exists', async () => {
      const { branchId, username, firstName, middleName, lastName, position, password } = setup();
      fireEvent.change(branchId, {target: {value: '10001'}})
      fireEvent.change(username, {target: {value: 'testuser01'}})
      fireEvent.change(firstName, {target: {value: 'John'}})
      fireEvent.change(middleName, {target: {value: 'C'}})
      fireEvent.change(lastName, {target: {value: 'Doe'}})
      fireEvent.change(position, {target: {value: 'QA Tester'}})
      fireEvent.change(password, {target: {value: 'pa55w0rd001'}})
      await userEvent.click(screen.getByLabelText('addUser', { selector: 'button' }));
      await userEvent.click(screen.getByLabelText('addUser', { selector: 'button' }));
      expect(screen.getByText('Branch ID already exists.')).toBeInTheDocument();
    });

    test('success adding user', async () => {
      const { branchId, username, firstName, middleName, lastName, position, password } = setup();
      fireEvent.change(branchId, {target: {value: '20001'}})
      fireEvent.change(username, {target: {value: 'testuser201'}})
      fireEvent.change(firstName, {target: {value: 'Jessa'}})
      fireEvent.change(middleName, {target: {value: 'C'}})
      fireEvent.change(lastName, {target: {value: 'Meek'}})
      fireEvent.change(position, {target: {value: 'Software Tester'}})
      fireEvent.change(password, {target: {value: 'pa55w0rd001'}})
      await userEvent.click(screen.getByLabelText('addUser', { selector: 'button' }));
      expect(screen.getByText('Successfully added user!')).toBeInTheDocument();
    });
  });

  describe('resetFields()', () => {
    beforeEach(() => {
      window.sessionStorage.setItem(MOCK_USER_ID, mockUser);
    });
    test('clear all fields', async () => {
      const { branchId, username, firstName, middleName, lastName, position, password } = setup();
      fireEvent.change(branchId, {target: {value: '20001'}})
      fireEvent.change(username, {target: {value: 'testuser201'}})
      fireEvent.change(firstName, {target: {value: 'Jessa'}})
      fireEvent.change(middleName, {target: {value: 'C'}})
      fireEvent.change(lastName, {target: {value: 'Meek'}})
      fireEvent.change(position, {target: {value: 'Software Tester'}})
      fireEvent.change(password, {target: {value: 'pa55w0rd001'}})
      await userEvent.click(screen.getByLabelText('resetForm', { selector: 'button' }))
      expect(screen.getByLabelText('branchId', {selector: 'input'})).toHaveValue(null)
      expect(screen.getByLabelText('username', {selector: 'input'})).toHaveValue('')
      expect(screen.getByLabelText('firstName', {selector: 'input'})).toHaveValue('')
      expect(screen.getByLabelText('middleName', {selector: 'input'})).toHaveValue('')
      expect(screen.getByLabelText('lastName', {selector: 'input'})).toHaveValue('')
      expect(screen.getByLabelText('position', {selector: 'input'})).toHaveValue('')
      expect(screen.getByLabelText('password', {selector: 'input'})).toHaveValue('')
    });
  });

  describe('removeRecord()', () => {
    beforeEach(() => {
      window.sessionStorage.setItem(MOCK_USER_ID, mockUser);
    });
    test('remove record', async () => {
      const { branchId, username, firstName, middleName, lastName, position, password } = setup();
      fireEvent.change(branchId, {target: {value: '20001'}})
      fireEvent.change(username, {target: {value: 'testuser201'}})
      fireEvent.change(firstName, {target: {value: 'Jessa'}})
      fireEvent.change(middleName, {target: {value: 'C'}})
      fireEvent.change(lastName, {target: {value: 'Meek'}})
      fireEvent.change(position, {target: {value: 'Software Tester'}})
      fireEvent.change(password, {target: {value: 'pa55w0rd001'}})
      await userEvent.click(screen.getByLabelText('addUser', { selector: 'button' }));
      expect(screen.getByText('20001')).toBeInTheDocument();
      await userEvent.click(screen.getByLabelText('remove-20001', { selector: 'button' })); 
      expect(screen.queryByText('20001')).not.toBeInTheDocument();
    });
  });

  describe('removeRecord()', () => { 
    beforeEach(() => {
      window.sessionStorage.setItem(MOCK_USER_ID, mockUser);
    });
    test('logout user', async () => {
      render(<Dashboard />);
      await userEvent.click(screen.getByLabelText('logoutBtn', { selector: 'button' }));
    });
  });
  
});