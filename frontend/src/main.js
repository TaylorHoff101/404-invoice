// main.js
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login_btn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const mainContent = document.querySelector('.main-content');
    const validateButton = document.querySelector('.button.validate');
    const mainContainer = document.querySelector('.container');
    const validateContainer = document.querySelector('.validate-container');

    function toggleModal(modal, show) {
        const mainHeader = document.querySelector('.main-header');
        modal.style.display = show ? 'block' : 'none';
        if (show) {
            mainHeader.classList.add('blur-background');
        } else {
            mainHeader.classList.remove('blur-background');
        }
    }

    // Function to show user profile and hide login button
        // When the user logs in, call this function
    function showUserProfile(email) {
        console.log("showUserProfile called with email:", email); 
        const loginButton = document.querySelector('.login_btn');
        const userProfileButton = document.getElementById('btn-message');
        const usernameElement = userProfileButton.querySelector('.username');
        
        // Hide the login button
        loginButton.style.display = 'none';
        
        // Show the user profile button
        userProfileButton.style.display = 'block'; // change from 'flex' to 'block' if necessary
        
        // Set the email in the user profile
        usernameElement.textContent = email; // Make sure this element is visible by default
        usernameElement.style.opacity = 1;
        usernameElement.style.transform = 'translateY(0)';
    }
        



    // Show the login modal when the login button is clicked
    loginBtn.addEventListener('click', () => {
        toggleModal(loginModal, true);
        mainContent.style.pointerEvents = 'none'; // Disable pointer events when modal is shown
    });

    // Show the register modal when the register button is clicked
    showRegisterBtn.addEventListener('click', () => {
        toggleModal(loginModal, false);
        toggleModal(registerModal, true);
    });

    // Show the login modal when the "Already have an account?" button is clicked
    showLoginBtn.addEventListener('click', () => {
        toggleModal(registerModal, false);
        toggleModal(loginModal, true);
    });

    // Handle login form submission
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        fetch('https://invoice-validation-deployment.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
        .then(response => response.text())
        .then(text => {
            const tokenMatch = text.match(/"([^"]+)"/);
            if (tokenMatch) {
                const token = tokenMatch[1];
                localStorage.setItem('token', token);
                localStorage.setItem('user', email);
                toggleModal(loginModal, false);
                showUserProfile(email);
                console.log('Login successful. Token:', token);
            } else {
                throw new Error('Token not found in response');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
    });

    // Handle register form submission
    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        fetch('https://invoice-validation-deployment.onrender.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Registration successful', data);
            toggleModal(registerModal, false);
            toggleModal(loginModal, true);
        })
        .catch(error => {
            console.error('Error during registration:', error);
        });
    });

    validateButton.addEventListener('click', () => {
      document.querySelector('.boxes').style.display = 'none';
      document.querySelector('.main-content').style.display = 'none';
      document.querySelector('.description').style.display = 'none';
      showUserProfile(localStorage.getItem('user'));
      // Show the validate container
      document.querySelector('.validate-container').style.display = 'block';
    });
    
       // Event listener for the validate button
  document.querySelector('.button.validate-invoice').addEventListener('click', function() {
    const fileInput = document.getElementById('file-upload');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file to validate.');
    return;
  }

  // Read the file content as a text string
  const reader = new FileReader();
  reader.onload = function(e) {
    const xmlContent = e.target.result;
    console.log('File content:', xmlContent); // Logs the content of the XML file

    // Determine which endpoint to use based on the selected method
    const selectedMethod = document.getElementById('validation-method').value;
    let endpoint = '';
    switch (selectedMethod) {
      case 'json':
        endpoint = 'https://invoice-validation-deployment.onrender.com/api/validate/json';
        break;
      case 'html':
        endpoint = 'https://invoice-validation-deployment.onrender.com/api/validate/html';
        break;
      case 'pdf':
        endpoint = 'https://invoice-validation-deployment.onrender.com/api/validate/pdf';
        break;
      default:
        alert('Invalid validation method selected.');
        return;
    }

    // Retrieve the stored token
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in. Please log in to validate.');
      return;
    }

    fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': token
        },
        body: xmlContent
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Choose how to handle the response based on the selected method
        if (selectedMethod === 'pdf') {
          return response.blob(); // Handle binary data for PDF
        } else {
          return response.text(); // Handle text for JSON and HTML
        }
      })
      .then(data => {
        if (selectedMethod === 'pdf') {
          // Handle PDF: create an object URL and open it
          const url = URL.createObjectURL(data);
          window.open(url, '_blank');
        } else {
          // For JSON or HTML-as-text, display directly
          console.log('Server response:', data);
          document.getElementById('results-container').textContent = data;
        }
      })
      .catch(error => {
        console.error('Error during validation:', error);
      });
      
  };
  reader.onerror = function() {
    alert('Failed to read file!');
  };
  reader.readAsText(file); //
  });


  
  window.addEventListener('beforeunload', function(event) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  });
  
});
