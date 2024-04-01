// Register
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log(email, password);

        fetch('https://virtserver.swaggerhub.com/K3VINALT/new/1.0.0/auth/register', { 
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
        .then((response) => {
            if (!response.ok) { 
                return response.json().then((data) => {
                    throw new Error(data.error); 
                });
            } else {
                return response.json(); 
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error during registration:', error);
        });
    });
});

// Login
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log(email, password);

        fetch('https://virtserver.swaggerhub.com/K3VINALT/new/1.0.0/auth/login', { // 수정된 부분
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
        .then((response) => {
            if (!response.ok) { 
                return response.json().then((data) => {
                    throw new Error(data.error); 
                });
            } else {
                return response.json(); 
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error during login:', error);
        });
    });
});

// Upload
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('uploadForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const fileInput = document.getElementById('fileUpload');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a file.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('fileUpload', file);

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            console.log(data);
            alert('File uploaded successfully. Name: ' + data.fileName);
        } catch (error) {
            console.error('Error during upload:', error);
            alert('An error occurred while uploading the file: ' + error.message);
        }
    });
});

// validate
// document.getElementById('validateForm').addEventListener('submit', async (event) => {
//     event.preventDefault();
    
//     const fileInput = document.getElementById('fileUpload');
//     const file = fileInput.files[0];

//     if (!file) {
//         alert('Please select a file.');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//         const response = await fetch('https://asish.alwaysdata.net/invoice-validator/upload-invoice', {
//             method: 'POST',
//             body: formData
//         });

//         if (!response.ok) {
//             throw new Error('Validation failed.');
//         }

//         const data = await response.json();
//         console.log('Validation successful:', data);
//         alert('File validated successfully!');
//     } catch (error) {
//         console.error('Error during validation:', error);
//         alert('An error occurred while validating the file.');
//     }
// });