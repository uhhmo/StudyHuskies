import React from 'react';
import { useNavigate } from 'react-router'
//import auth functions and variables from Firebase
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'

//import the component -- pick one!
import StyledFirebaseAuth from '../../StyledFirebaseAuth';



function SignInForm() {

  const navigate = useNavigate();

  const auth = getAuth();

  //lowk took this from the course book....
  //an object of configuration values
  const firebaseUIConfig = {
    signInOptions: [ //array of sign in options supported
      //array can include just "Provider IDs", or objects with the IDs and options
      GoogleAuthProvider.PROVIDER_ID,
      { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
    ],
    signInFlow: 'popup', //don't redirect to authenticate
    credentialHelper: 'none', //don't show the email account chooser
    callbacks: { //"lifecycle" callbacks
      signInSuccessWithAuthResult: () => {
        navigate('/');
        return false; //don't redirect after authentication
      }
    }
  }

  return (
    <main className="sign-in-image vh-100 d-flex align-items-center justify-content-center m-0">

      <section
        className="p-4 border rounded shadow-sm bg-light signin-card">
        <h2 className="text-center mb-4">Sign In</h2>
        <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
      </section>
    </main>
  );
};

export default SignInForm;
