'use strict';

// USERS DATA //

const account1 = {
  owner: 'Guillem Delás',
  username: 'guillemdlopez',
  pin: 1111,
  avatar: 'images/profile.jpg',
  movements: [200, 400, 600, 1000, 10, -230],
}

const account2 = {
  owner: 'Antonio Morales',
  username: 'amoralro1996',
  pin: 2222,
  avatar: 'images/antonio-avatar.jpg',
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
const modalTransfer = document.querySelector('.transfer-modal');
const transferForm = document.querySelector('.transfer-modal-form');
const inputUsernameTransferModal = document.querySelector('.input-username-transfer-modal');
const inputAmountTransferModal = document.querySelector('.input-amount-transfer-modal');
console.log(alert);


console.log(inputUsernameTransferModal, inputAmountTransferModal);

// FUNCTIONS

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

const findUser = (user) => accounts.find(acc => user === acc.username)

const timer = (sec, htmlElement) => {
  setTimeout(() => {
    htmlElement.classList.add('hidden-effect');
    htmlElement.style.transition = 'all 1s';

    setTimeout(() => {
      htmlElement.remove();
    }, 1000)
  }, sec * 1000)
}

let customizedAlert;
const displayWarningAlert = (msg) => {
  const html = `
    <div class="alert customized-warning-alert">
      <i class="fas fa-exclamation-triangle warning"></i>
      <p>${msg}</p>
      <i class="close-icon">&times</i>
    </div>`;

  overlay.insertAdjacentHTML('beforeend', html);
  customizedAlert = document.querySelector('.customized-warning-alert');
  timer(2, customizedAlert);
}

const displaySuccessAlert = (msg) => {
  const html = `
    <div class="alert-success customized-success-alert">
      <i class="fas fa-check-circle success"></i>
      <p>Correct credentials!</p>
      <i class="close-icon">&times</i>
    </div>`;
    overlay.insertAdjacentHTML('beforeend', html);
    customizedAlert = document.querySelector('.customized-success-alert');
    timer(2, customizedAlert);
}
let confirmationBtn;
let cancelBtn;
const displayConfirmationMsg = (imgPath, amount, userOwner) => {
  const html = `
    <div class="modal transfer-modal-confirmation">
      <div class="info-user">
        <h2>Confirmation</h2>
        <img src=${imgPath} class="avatar" alt="">
        <p><strong>Send</strong>: ${amount} €</p>
        <p><strong>To</strong>: ${userOwner}</p>
      </div>
      <div class="btns-confirmation-cancel">
        <div class="cancel">
          <p>Cancel</p>
        </div>
        <div class="confirm">
          <p>Confirm</p>
        </div>
      </div>
    </div>`

    overlay.insertAdjacentHTML('beforeend', html);
}

// const displayConfirmation(user, amount) => {
//   const html
// }


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

    if (e.target.closest('.alert')) {
      alert.classList.add('hidden-effect')
    } else if (e.target.closest('.alert-success')) {
      alertSuccess.classList.add('hidden-effect')
    }
  })
})


btnTransfer.addEventListener('click', (e) => {
  const btn = e.target.closest('div');

  if (overlay.classList.contains('hidden') && modalTransfer.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
    modalTransfer.classList.remove('hidden');
    inputUsernameTransferModal.focus();
  } else {
    overlay.classList.add('hidden');
    modalTransfer.classList.add('hidden');
  }
})

transferForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log(currentAccount);
  const user = inputUsernameTransferModal.value
  const amount = inputAmountTransferModal.value
  const userTo = findUser(user)

  if (userTo) {
    console.log(`${user} exists!`)
    modalTransfer.classList.add('move-up');
    modalTransfer.classList.add('disabled-card');
    inputAmountTransferModal.blur();
    displayConfirmationMsg(userTo.avatar, amount, user);
  } else {
    console.log(`${user} does not exist!`)
    displayWarningAlert('Wrong credentials! This account does not exist')
  }
})




