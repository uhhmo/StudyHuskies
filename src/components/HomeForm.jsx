import React from 'react';

function HomeForm() {
  return (
    <section className="my-5 p-4 bg-light rounded shadow-sm">
      <h3>Contact Us</h3>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" className="form-control mb-2" placeholder="Dubs" />
        
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" className="form-control mb-3" placeholder="husky@uw.edu" />
        
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" className="form-control mb-4" placeholder="Go Huskies!"></textarea>
        
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </section>
  );
};

export default HomeForm;
