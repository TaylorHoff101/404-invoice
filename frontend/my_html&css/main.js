// Login
// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('loginForm').addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
        
//         console.log(email, password);

//         fetch('https://invoice-validation-deployment.onrender.com/auth/register', {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: email,
//                 password: password
//             })
//         })
//         .then((response) => {
//             if (!response.ok) { 
//                 return response.json().then((data) => {
//                     throw new Error(data.error); 
//                 });
//             } else {
//                 return response.json(); 
//             }
//         })
//         .then((data) => {
//             console.log(data);
//         })
//         .catch((error) => {
//             console.error('Error during login:', error);
//         });
//     });
// });

document.getElementById('validateForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://invoice-validation-deployment.onrender.com/api/validate/json', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Validation failed.');
        }

        const data = await response.json();
        console.log('Validation successful:', data);
        alert('File validated successfully!');
    } catch (error) {
        console.error('Error during validation:', error);
        alert('An error occurred while validating the file.');
    }
});