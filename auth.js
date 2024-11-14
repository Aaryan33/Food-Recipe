const adminCredentials = {
    email: 'admin@recipebook.com',
    password: 'admin321'
};


const userRegisterForm = document.getElementById('userRegisterForm');
userRegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value.trim();

    if (!name || !email || !password) {
        showErrorMessage('All fields are required.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        showErrorMessage('Email is already registered.');
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    userRegisterForm.reset();
    userRegisterModal.style.display = 'none';
    showErrorMessage('Registration successful! You can now log in.', 'green');
});

// Handle User Login
const userLoginForm = document.getElementById('userLoginForm');
userLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('userEmail').value.trim().toLowerCase();
    const password = document.getElementById('userPassword').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ name: user.name, role: 'user', email: user.email }));
        updateUIOnLogin();
        userLoginModal.style.display = 'none';
        showErrorMessage('User logged in successfully!', 'green');
    } else {
        showErrorMessage('Invalid email or password.');
    }
});

// Handle Admin Login
const adminLoginForm = document.getElementById('adminLoginForm');
adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value.trim().toLowerCase();
    const password = document.getElementById('adminPassword').value.trim();

    if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem('currentUser', JSON.stringify({ name: 'Admin', role: 'admin', email: email }));
        updateUIOnLogin();
        adminLoginModal.style.display = 'none';
        showErrorMessage('Admin logged in successfully!', 'green');
    } else {
        showErrorMessage('Invalid admin credentials.');
    }
});

// Handle Logout
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    updateUIOnLogout();
    showErrorMessage('Logged out successfully.', 'green');
});
