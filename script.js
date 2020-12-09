'use strict';

// USERS DATA //

const account1 = {
  owner: 'Guillem Delás',
  username: 'guillemdlopez',
  pin: 1111,
  movements: [200, 400, 600, 1000, 10, -230],
}

const account2 = {
  owner: 'Antonio Morales',
  username: 'amoralro1996',
  pin: 2222,
  movements: [50, 600, 1000, 34, 789, -500],
}

const account3 = {
  owner: 'Guillem Delás',
  username: 'guillemdlopez',
  pin: 3333,
  movements: [200, 400, 600, 1000, 10, -340],
}

const account4 = {
  owner: 'Steven Tyler',
  username: 'steven1973',
  pin: 4444,
  movements: [200, 400, 600, 1000, 10, -29],
}

const accounts = [account1, account2, account3, account4]

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const banner = document.querySelector('.banner');
const formDiv = document.querySelector('.banner-form');
const bannerContentDiv = document.querySelector('.banner-content-app-description');
const inputUsername = document.querySelector('.input-username');
const inputPassword = document.querySelector('.input-password');
const btnGetStarted = document.querySelector('.btn-start');
const loginForm = document.querySelector('.login-form');
const welcomeMsg = document.querySelector('.welcome-message');
const currentDate = document.querySelector('.current-date');
const alert = document.querySelector('.alert');
const alertSuccess = document.querySelector('.alert-success');
const btnCloseAlert = document.querySelectorAll('.close-icon');
const btnTransfer = document.querySelector('.transfer-money');
const overlay = document.querySelector('.overlay');

console.log(welcomeMsg, currentDate);

// FANCY BANNER //
const initBanner = function (el) {
  el.classList.remove('hidden-effect')
  el.style.transform = 'translateY(0px)';
  el.style.transition = 'all 1s'
}

const displayForm = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) {
      initBanner(formDiv);
      initBanner(bannerContentDiv);
  }
}

const bannerObserver = new IntersectionObserver(displayForm, {
  root: null,
  threshold: 0,
})

bannerObserver.observe(banner)


// LOG IN //
btnGetStarted.addEventListener('click', (e) => {
  e.preventDefault()
  inputUsername.focus()
});

let currentAccount;

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameValue = inputUsername.value;
  const passwordValue = inputPassword.value;

  currentAccount = accounts.find(acc => acc.username === usernameValue);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputPassword.value)) {
    console.log(inputPassword.value)
    banner.classList.add('hidden')
    document.querySelector('.application').classList.remove('hidden')

    // display welcome msg
    welcomeMsg.innerHTML = `Welcome back, <strong> ${currentAccount.owner.split(' ')[0]} </strong>`;

    // display alert
    alertSuccess.classList.remove('hidden-effect');
    alertSuccess.style.transition = 'all 1s';

    // display time
    const date = new Date()
    currentDate.textContent = `${days[date.getDay()].slice(0, 3)}. ${date.getDate()}
    ${months[date.getMonth()]} of ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}h`

  } else {
    alert.classList.remove('hidden-effect');
    alert.style.transition = 'all 1s';
  };
})


btnCloseAlert.forEach(btn => {
  btn.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.closest('.alert')) {
      alert.classList.add('hidden-effect')
    } else if (e.target.closest('.alert-success')) {
      alertSuccess.classList.add('hidden-effect')
    }
  })
})

btnTransfer.addEventListener('click', (e) => {
  overlay.classList.remove('hidden');
})
