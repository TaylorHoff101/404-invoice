

document.addEventListener('DOMContentLoaded', () => {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username, password);
    document.getElementById('loginContainer').addEventListener('submit', async (a) => {
        a.preventDefault();

        fetch('https://invoice-validation-deployment.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
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
            console.log(data)
        })
        .catch((error) => {
            console.error('Error during login:', error);
    });
    })

});