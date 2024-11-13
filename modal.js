const userLoginBtn = document.getElementById('userLoginBtn');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userLoginModal = document.getElementById('userLoginModal');
const adminLoginModal = document.getElementById('adminLoginModal');
const userRegisterModal = document.getElementById('userRegisterModal');


userLoginBtn.addEventListener('click', () => {
    userLoginModal.style.display = 'block';
});

adminLoginBtn.addEventListener('click', () => {
    adminLoginModal.style.display = 'block';
});

const closeUserModal = document.getElementById('closeUserModal');
closeUserModal.addEventListener('click', () => {
    userLoginModal.style.display = 'none';
});

const closeAdminModal = document.getElementById('closeAdminModal');
closeAdminModal.addEventListener('click', () => {
    adminLoginModal.style.display = 'none';
});

const closeUserRegisterModal = document.getElementById('closeUserRegisterModal');
closeUserRegisterModal.addEventListener('click', () => {
    userRegisterModal.style.display = 'none';
});

// Event Listener for Register Link
const userRegisterLink = document.getElementById('userRegisterLink');
userRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    userLoginModal.style.display = 'none';
    userRegisterModal.style.display = 'block';
});

window.addEventListener('click', (event) => {
  
    if (event.target == userLoginModal) {
        userLoginModal.style.display = 'none';
    }
    if (event.target == adminLoginModal) {
        adminLoginModal.style.display = 'none';
    }
    if (event.target == userRegisterModal) {
        userRegisterModal.style.display = 'none';
    }
});
