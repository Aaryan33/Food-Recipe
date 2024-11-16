function updateUIOnLogin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        userLoginBtn.style.display = 'none';
        adminLoginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        headerNavUpdate(currentUser);
    }
}


function updateUIOnLogout() {
    userLoginBtn.style.display = 'inline-block';
    adminLoginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    headerNavUpdate(null);
}


function showErrorMessage(message, color = 'red') {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.color = color;
    setTimeout(() => {
        errorMessage.textContent = '';
    }, 5000);
}

// Function to Update Navigation Header Based on User Role
function headerNavUpdate(user) {
    const heading = document.querySelector('.heading');
    if (user && user.role === 'admin') {
        heading.textContent = `Welcome, ${user.name} (Admin)`;
    } else if (user && user.role === 'user') {
        heading.textContent = `Welcome, ${user.name}`;
    } else {
        heading.textContent = 'Recipe Book';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateUIOnLogin();
    }
});
