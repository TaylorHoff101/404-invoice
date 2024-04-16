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
    const createButton = document.querySelector('.button.create');


    function toggleModal(modal, show) {
        const mainHeader = document.querySelector('.main-header');
        modal.style.display = show ? 'block' : 'none';
        if (show) {
            mainHeader.classList.add('blur-background');
        } else {
            mainHeader.classList.remove('blur-background');
        }
    }

    function showUserProfile(email) {
        console.log("showUserProfile called with email:", email); 
        const loginButton = document.querySelector('.login_btn');
        const userProfileButton = document.getElementById('btn-message');
        const usernameElement = userProfileButton.querySelector('.username');
        loginButton.style.display = 'none';
        userProfileButton.style.display = 'block'; 
        usernameElement.textContent = email;
        usernameElement.style.opacity = 1;
        usernameElement.style.transform = 'translateY(0)';
    }
        
    loginBtn.addEventListener('click', () => {
        toggleModal(loginModal, true);
        mainContent.style.pointerEvents = 'none'; 
    });

    showRegisterBtn.addEventListener('click', () => {
        toggleModal(loginModal, false);
        toggleModal(registerModal, true);
    });

    showLoginBtn.addEventListener('click', () => {
        toggleModal(registerModal, false);
        toggleModal(loginModal, true);
    });

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
      document.querySelector('.main-content').textContent = 'Validation';
      console.log(document.querySelector('.description')); // Log the element to ensure it's the right one
      document.querySelector('.description').style.display = 'none'; // Hide it
      showUserProfile(localStorage.getItem('user'));
      document.querySelector('.validate-container').style.display = 'block';
    });

    createButton.addEventListener("click", () => {
      console.log("we here");
      document.querySelector('.boxes').style.display = 'none';
      document.querySelector('.main-content').textContent = 'Create';
      document.querySelector('.description').style.display = 'none';
      showUserProfile(localStorage.getItem('user'));
      document.querySelector('.create-container').style.display = 'block';
    });

    document.querySelector(".button.render").addEventListener("click", () => {
      window.location.href = "rendering.html";
  });

  document.querySelector(".logo").addEventListener("click", () => {
       // Set the main content back to its original state
    document.querySelector('.main-content').textContent = 'E-Invoicing';

    // Hide the create and validate containers
    document.querySelector('.create-container').style.display = 'none';
    document.querySelector('.validate-container').style.display = 'none';

    // Show the original boxes and description
    document.querySelector('.boxes').style.display = 'flex'; // or 'block', depending on your original CSS
    document.querySelector('.description').style.display = 'block';
    
    // Remove the blur effect if it's there
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader.classList.contains('blur-background')) {
        mainHeader.classList.remove('blur-background');
    }

    // Enable pointer events back on the main content if they were disabled
    mainContent.style.pointerEvents = 'auto';
  });

  
  document.querySelectorAll('.invoice_link').forEach(function(link) {
    link.addEventListener('click', function(event) {
        // Get the corresponding render buttons for the clicked link
        const renderButtons = link.nextElementSibling;

        // Toggle the visibility of render buttons
        renderButtons.classList.toggle('show');

        // Prevent default link behavior
        event.preventDefault();
    });
  });
    




  document.querySelector('.button.validate-invoice').addEventListener('click', function() {
    const fileInput = document.getElementById('file-upload');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file to validate.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const xmlContent = e.target.result;
    console.log('File content:', xmlContent); 
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
     
        if (selectedMethod === 'pdf') {
          return response.blob(); 
        } else {
          return response.text(); 
        }
      })
      .then(data => {
        //doesnt work yet -> tested on postman aswel
        if (selectedMethod === 'pdf') {
         
          const url = URL.createObjectURL(data);
          window.open(url, '_blank');
        } else {
          document.getElementById("review-container").style.display = "none";
          console.log('Server response:', data);
          document.getElementById('results-container').innerHTML = data;
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

  
});

document.getElementById("uploadCSV").addEventListener("click", function() {
  console.log("inside")
  window.open("http://3.27.23.157/invoice/CSV", "_blank");
})
document.getElementById("uploadJSON").addEventListener("click", function() {
  window.open("http://3.27.23.157/invoice/JSON", "_blank");
})
