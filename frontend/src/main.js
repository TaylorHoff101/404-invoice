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
    const renderButton = document.querySelector('.button.render');

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
  
      // Define the endpoints
      const endpointPrimary = 'https://invoice-validation-deployment.onrender.com/auth/login';
      const endpointSecondary = 'https://plswork-cdndr7jrqq-ts.a.run.app/validate/login';
  
      // Define the request options
      const options = {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify({
              username: email,
              password: password
          })
      };
  
      // First login request
      fetch(endpointPrimary, options)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to log in at first endpoint');
          }
          return response.text();  // Assuming the response is text containing the token
      })
      .then(text => {
          const tokenMatch = text.match(/"([^"]+)"/);
          if (tokenMatch) {
              const token = tokenMatch[1];
              localStorage.setItem('token', token);
              localStorage.setItem('user', email);
              // Proceed with the second login request
              return fetch(endpointSecondary, options);
          } else {
              throw new Error('Token not found in response from first endpoint');
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to log in at second endpoint');
          }
          return response.text();  // Handle the response from the second login
      })
      .then(() => {
          // Both logins successful
          toggleModal(loginModal, false);
          showUserProfile(email);
          console.log('Login successful at both endpoints.');
      })
      .catch(error => {
          console.error('Error during login:', error);
      });
    });
    


    registerForm.addEventListener('submit', event => {
      event.preventDefault();
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
    
        // Proceed with the registration if email is valid
        registerUser(email, password)
          .then(data => {
            console.log("Registration successful:", data);
            toggleModal(registerModal, false);
            toggleModal(loginModal, true);
            
          })
          .catch(error => {
            console.error("Registration failed:", error);
            //alert('Registration failed: ' + error.message);
            
          });
  
    });
    
    function registerUser(email, password) {
      const endpoint2 = 'https://invoice-validation-deployment.onrender.com/auth/register';
      const endpoint1 = 'https://plswork-cdndr7jrqq-ts.a.run.app/validate/register';
  
      const payload = JSON.stringify({ 'username': email, 'password': password });
      const options = {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: payload
      };
  
      return fetch(endpoint1, options)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to register at first endpoint');
              }
              return response.text();  // Proceed with the second request if the first succeeds
          })
          .then(() => fetch(endpoint2, options))  // Make the second request
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to register at second endpoint');
              }
              return response;  // Final response to be handled if needed
          });
    }
  

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

    renderButton.addEventListener("click", () => {
      console.log("we here");
      document.querySelector('.boxes').style.display = 'none';
      document.querySelector('.main-content').textContent = 'Render';
      document.querySelector('.description').style.display = 'none';
      showUserProfile(localStorage.getItem('user'));
      document.querySelector('.render-container').style.display = 'block';
    });

    document.querySelector(".button.render").addEventListener("click", () => {
      console.log("we here");
      document.querySelector('.boxes').style.display = 'none';
      document.querySelector('.main-content').textContent = 'render';
      document.querySelector('.description').style.display = 'none';
      showUserProfile(localStorage.getItem('user'));
      document.querySelector('.render-container').style.display = 'block';
  });

  document.querySelector(".logo").addEventListener("click", () => {
    console.log("clicked");
    document.querySelector('.main-content').textContent = 'E-Invoicing';

    document.querySelector('.create-container').style.display = 'none';
    document.querySelector('.validate-container').style.display = 'none';
    document.querySelector('.render-container').style.display = 'none';

    document.querySelector('.boxes').style.display = 'flex';
    document.querySelector('.description').style.display = 'block';
    
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader.classList.contains('blur-background')) {
        mainHeader.classList.remove('blur-background');
    }

    mainContent.style.pointerEvents = 'auto'; 
  });

  
  document.querySelectorAll('.invoice_link').forEach(function(link) {
    link.addEventListener('click', function(event) {
        const renderButtons = link.nextElementSibling;
        renderButtons.classList.toggle('show');
        event.preventDefault();
    });
  });
    
  document.querySelector('.button-save-invoice-id').addEventListener('click', function() {
    const invoiceId = document.getElementById('invoiceIdInput').value.trim();
    const username = localStorage.getItem('user');
    if (!invoiceId) {
        alert('Please enter an Invoice ID.');
        return;
    }
    if (!username) {
        alert('You are not logged in.');
        return;
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') 
        },
        body: JSON.stringify({
            invoiceId: invoiceId,
            username: username
        })
    };
    fetch('https://plswork-cdndr7jrqq-ts.a.run.app/validate/save', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save invoice ID.');
            }
            return response.json();  
        })
        .then(data => {
            alert('Invoice ID saved successfully.');
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error during saving invoice ID:', error);
            alert('Error: ' + error.message);
        });
  });

  document.querySelector(".button.render").addEventListener("click", () => {
    const renderContainer = document.querySelector('.render-container');
    const invoiceIdsNav = renderContainer.querySelector('.invoice_ids');
    const ul = invoiceIdsNav.querySelector('ul');
    ul.innerHTML = ''; 

    const username = localStorage.getItem('user');

    fetch(`https://plswork-cdndr7jrqq-ts.a.run.app/validate/list?username=${username}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch invoices.');
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Server response:', data.invoices);
        data.invoices.forEach(invoice => {
          const li = document.createElement('li');
          li.textContent = `InvoiceId: ${invoice}`;
          li.setAttribute('data-invoice-id', invoice);
      
          const div = document.createElement('div');
          div.className = 'render_buttons';
    
          const viewBtn = document.createElement('button');
          viewBtn.textContent = 'View XML';
          viewBtn.className = 'view_btn';
          viewBtn.onclick = () => viewXml(invoice);
   
          const viewHtmlBtn = document.createElement('button');
          viewHtmlBtn.textContent = 'View HTML Render';
          viewHtmlBtn.className = 'view_html_btn';
          viewHtmlBtn.onclick = () => viewHtml(invoice);
      
          const viewJsonBtn = document.createElement('button');
          viewJsonBtn.textContent = 'View JSON Render';
          viewJsonBtn.className = 'view_json_btn';
          viewJsonBtn.onclick = () => viewJson(invoice);
          
          const sendEmailBtn = document.createElement('button');
          sendEmailBtn.textContent = 'Send to Email';
          sendEmailBtn.className = 'send_email_btn';
          sendEmailBtn.onclick = () => sendToEmail(invoice);

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.className = 'delete_btn';
          deleteBtn.onclick = () => {
              if (confirm(`Are you sure you want to delete invoice ${invoice}?`)) {
                  deleteInvoice(invoice);
              }
          };

          div.appendChild(viewBtn);
          div.appendChild(viewHtmlBtn);
          div.appendChild(viewJsonBtn);
          div.appendChild(sendEmailBtn);
          div.appendChild(deleteBtn);
          li.appendChild(div);
          ul.appendChild(li);
        });

        renderContainer.style.display = 'block'; // Show the container
        document.querySelector('.main-content').textContent = 'Render';
        document.querySelector('.description').style.display = 'none';
    })
    .catch(error => {
        console.error('Error during fetching invoice list:', error);
        alert('Error: ' + error.message);
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


  function viewHtml(invoiceId) {
    const url = `https://plswork-cdndr7jrqq-ts.a.run.app/render/${invoiceId}/html`;
    fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'text/html' },
    })
    .then(response => response.ok ? response.text() : Promise.reject('Failed to load HTML content.'))
    .then(htmlContent => {
       
        const newWindow = window.open('', '_blank');
        newWindow.document.write(viewRender(htmlContent));
        newWindow.document.close(); // Close document stream
    })
    .catch(error => {
        console.error('Error fetching HTML view:', error);
        alert('Error: ' + error);
    });
}

function viewJson(invoiceId) {
    const url = `https://plswork-cdndr7jrqq-ts.a.run.app/render/${invoiceId}/json`;
    fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    })
    .then(response => response.ok ? response.text() : Promise.reject('Failed to load JSON content.'))
    .then(jsonContent => {
      const newWindow = window.open('', '_blank');
      newWindow.document.write(viewRender(jsonContent));
      newWindow.document.close(); // Close document stream
    })
    .catch(error => {
        console.error('Error fetching JSON view:', error);
        alert('Error: ' + error);
    });
}

function viewXml(invoiceId) {
    const url = `https://plswork-cdndr7jrqq-ts.a.run.app/view/${invoiceId}`;
    fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/xml' },
    })
    .then(response => response.ok ? response.text() : Promise.reject('Failed to load XML content.'))
    .then(xmlContent => {
      
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`<pre>${viewRender(xmlContent)}</pre>`);
        newWindow.document.close();
    })
    .catch(error => {
        console.error('Error fetching XML view:', error);
        alert('Error: ' + error);
    });
}

function sendToEmail(invoiceId) {
  // Trigger modal here to get email from user
  const email = prompt('Please enter the email address to send the invoice to:');

  if (!email) {
      alert('Email is required to send the invoice.');
      return;
  }

  const url = `https://plswork-cdndr7jrqq-ts.a.run.app/send/${invoiceId}/xml`; 
  fetch(url, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ email: email })
  })
  .then(response => response.ok ? response.json() : Promise.reject('Failed to send invoice.'))
  .then(responseData => {
      alert(`Invoice sent to ${email}: ${responseData.message}`);
  })
  .catch(error => {
      console.error('Error sending invoice:', error);
      alert('Error: ' + error);
  });
}

function deleteInvoice(invoiceId) {
  const url = 
  `https://plswork-cdndr7jrqq-ts.a.run.app/validate/delete?username=${localStorage.getItem('user')}&invoiceId=${invoiceId}`;
  fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to delete invoice.');
      }
      return response.json();
  })
  .then(() => {
      alert(`Invoice ${invoiceId} has been deleted.`);
      const liToRemove = document.querySelector(`li[data-invoice-id="${invoiceId}"]`);
      if (liToRemove) {
          liToRemove.remove();
      }
  })
  .catch(error => {
      console.error('Error deleting invoice:', error);
      alert('Error: ' + error);
  });
}

function viewRender(content) {
  const buttonStartIndex = content.indexOf('<button type="submit"');
    const buttonEndIndex = content.indexOf('</button>', buttonStartIndex);
    const modifiedHtmlContentWithoutButton = content.substring(0, buttonStartIndex) + content.substring(buttonEndIndex + 9);
    const startFooterIndex = modifiedHtmlContentWithoutButton.indexOf('<footer class="site-footer">');
    const endFooterIndex = modifiedHtmlContentWithoutButton.indexOf('</footer>', startFooterIndex);
    const modifiedHtmlContent = modifiedHtmlContentWithoutButton.substring(0, startFooterIndex) + 
    modifiedHtmlContentWithoutButton.substring(endFooterIndex + 9);

    return modifiedHtmlContent;
}

});

document.getElementById("uploadCSV").addEventListener("click", function() {
  console.log("inside")
  window.open("http://3.27.23.157/invoice/CSV", "_blank");
})
document.getElementById("uploadJSON").addEventListener("click", function() {
  window.open("http://3.27.23.157/invoice/JSON", "_blank");
})
