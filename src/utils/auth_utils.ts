import { UserCredential } from 'firebase/auth';

export const getUser = (): UserCredential['user'] => {
  const stringUser = localStorage.getItem('user');
  const jsonUser = JSON.parse(`${stringUser}`);
  return <UserCredential['user']>jsonUser;
}

export const resizeUserPhoto = (photoURL: string | null, size: number) => 
  `${photoURL}`.replace('s96', 's' + size);

export const getErrorMessages = (errorCode: string): string => {
  return (<any>{
    'auth/popup-closed-by-user': `
      Oh, não! O popup foi fechado inesperadamente&hellip;
    `,

    'auth/account-exists-with-different-credential': `
      Oh, não! Parece que esse e-mail já foi cadastrado com outro provedor&hellip;
    `,

    'auth/cancelled-popup-request': `
      Oh, não! Parece que você desistiu no meio do caminho&hellip; P-Por favor, não desista de usar o nosso app!
    `,

  })[errorCode] ?? 'Oh, não! Algo deu errado&hellip;';
}