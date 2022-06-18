import { UserCredential } from 'firebase/auth';

export const getUser = (): UserCredential['user'] => {
  const stringUser = localStorage.getItem('user');
  const jsonUser = JSON.parse(`${stringUser}`);
  return <UserCredential['user']>jsonUser;
}

export const resizeUserPhoto = (photoURL: string | null, size: number) => 
  `${photoURL}`.replace('s96', 's' + size);