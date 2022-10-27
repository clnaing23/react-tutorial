import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';
import React from 'react';
import './../App.css';

const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>Sign out</button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const activation = ({isActive}) => isActive ? 'active' : 'inactive';

const Auth = () => (
  <nav className="d-flex">
    <AuthButton />
  </nav>
);

export default Auth;