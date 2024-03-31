document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log(email, password);

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
