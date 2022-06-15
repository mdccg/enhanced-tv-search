import { UserCredential } from 'firebase/auth';

export const getUser = (): UserCredential['user'] => {
  const stringUser = localStorage.getItem('user');
  const jsonUser = JSON.parse(`${stringUser}`);
  return <UserCredential['user']>jsonUser;
}