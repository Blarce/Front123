const signInBtn = document.querySelector('.signin-btn');
const signUpBtn = document.querySelector('.signup-btn');
const formBox = document.querySelector('.form-box');
const body = document.body;
const submitBtn = document.querySelector('.form__btn');
const regBtn = document.querySelector('.form__btn_signup');
const login = document.getElementById('login');
const password = document.getElementById('password');
const family = document.getElementById('family');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const reg_login = document.getElementById('reg_login');
const reg_password = document.getElementById('reg_password');
const correct_pass = document.getElementById('cor_pass');
const idTelegramm = document.getElementById('id_telegram');
const users = {};
const submitUsers = {};

signUpBtn.addEventListener('click', function() {
    formBox.classList.add('active');
    body.classList.add('active');
});

signInBtn.addEventListener('click' , function() {  
    formBox.classList.remove('active');
    body.classList.remove('active');
})

function user_Registration(family, name, surname, reg_login, reg_password, idTelegramm){
    this.family = family;
    this.name = name;
    this.surname = surname;
    this.reg_login = reg_login;
    this.reg_password = reg_password;
    this.idTelegramm = idTelegramm;
}

function createID(users) {
    return Object.keys(users).length
}

function user_submit(login, password) {
    this.login = login;
    this.password = password;
}

submitBtn.addEventListener('click' , () => {
    const loginUser = login.value;
    const passwordUser = password.value;

    const submitUser = new user_submit(loginUser,passwordUser);
    const UserID = 'userSubmit';
    submitUser[UserID] = submitUsers;
    console.log(submitUser);

});

regBtn.addEventListener('click', () => {
    const nameUser = name.value;
    const familyUser = family.value;
    const surnameUser = surname.value;
    const reg_loginUser = reg_login.value;
    const reg_passwordUser = reg_password.value;
    const id_telegrammUser = idTelegramm.value;

    const user = new user_Registration(nameUser,familyUser,surnameUser,reg_loginUser,reg_passwordUser,id_telegrammUser);
    const userID = 'User' + createID(users);
    users[userID] = user;
    console.log(users);

});


/* submitBtn.addEventListener('click' , function(e) {   
    e.preventDefault()
    console.log(123)
})
*/

