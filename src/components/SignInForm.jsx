import React from 'react';

function SignInForm() {
  return (
    <main className="sign-in-image vh-100 d-flex align-items-center justify-content-center m-0">
      
      <section 
        className="p-4 border rounded shadow-sm bg-light signin-card">
        <h2 className="text-center mb-4">Sign In</h2>
        
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="dubs@uw.edu"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password"/>
          </div>
          
          <button type="submit" className="btn btn-home w-100">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default SignInForm;
