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

// Upload
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('uploadForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // 파일 선택
        const fileInput = document.getElementById('fileUpload');
        const file = fileInput.files[0];


        // 파일이 선택되었는지 확인
        if (!file) {
            alert('Please select a file.');
            return;
        }
        
        // 파일을 서버로 전송
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        console.log(formData);

        try {
            const response = await fetch('https://apple-pi.alwaysdata.net/v1/invoice/upload', {
                method: 'POST',
                body: file
            });

            // 응답 확인
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            console.log(data);
            alert('Invoice uploaded successfully. Key: ' + data['Invoice Key']);
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