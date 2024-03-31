const signupFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  console.log("Submitted!")
    // Gather the data from the form elements on the page
    const email = document.querySelector('#email-signup').value.trim();
    const name = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  console.log(email, name, password)
    if (email && password) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  