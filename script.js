'use strict';

// USERS DATA //

const account1 = {
  owner: 'Guillem Delás',
  username: 'guillemdlopez',
  pin: 1111,
  avatar: 'images/profile.jpg',
  movements: [-200, 400, 600, 1000, 10, -230, -100],
}

const account2 = {
  owner: 'Antonio Morales',
  username: 'amoralro1996',
  pin: 2222,
  avatar: 'images/antonio-avatar.jpg',
  movements: [50, 600, 1000, 34, 789, -500, -100],
}

const account3 = {
  owner: 'Steven Tyler',
  username: 'steven1973',
  pin: 333,
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Steven_Tyler_by_Gage_Skidmore_3.jpg',
  movements: [2000, 4000, 6000, -1000, 10, -29, -1000],
}

const account4 = {
  owner: 'Ann Wilson',
  username: 'annwilson',
  pin: 4444,
  avatar: 'https://i.pinimg.com/564x/09/e9/cb/09e9cb06ac99fc03065b2a032235b7c9.jpg',
  movements: [200, 400, 600, 1000, 10, -340, -600],
}


const accounts = [account1, account2, account3, account4]

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

//////////////////// FORMS ////////////////////
const loginForm = document.querySelector('.login-form');
const transferForm = document.querySelector('.transfer-modal-form');
const loanForm = document.querySelector('.loan-modal-form');
const deleteAccForm = document.querySelector('.delete-account-modal-form');


//////////////////// INPUTS ////////////////////
const inputUsername = document.querySelector('.input-username');
const inputPassword = document.querySelector('.input-password');
const inputUsernameTransferModal = document.querySelector('.input-username-transfer-modal');
const inputAmountTransferModal = document.querySelector('.input-amount-transfer-modal');
const inputDeleteUsername = document.querySelector('.input-delete-username');
const inputDeletePin = document.querySelector('.input-delete-pin');
const inputAmountLoan = document.querySelector('.input-loan-amount');


//////////////////// LABELS ////////////////////
const welcomeMsg = document.querySelector('.welcome-message');
const currentDate = document.querySelector('.current-date');
const labelOwner = document.querySelector('.currentAccount-owner');
const balanceLabel = document.querySelector('.total-balance');
const labelExpenses = document.querySelector('.total-expenses');
const labelIncome = document.querySelector('.total-income');


//////////////////// MODALS ////////////////////
const allModals = document.querySelectorAll('.modal');
const modalTransfer = document.querySelector('.transfer-modal');
const loanModal = document.querySelector('.loan-modal');
const deleteAccModal = document.querySelector('.delete-account-modal');


//////////////////// BUTTONS ////////////////////
const allBtns = document.querySelectorAll('.btn');
const btnGetStarted = document.querySelector('.btn-start');
const btnCloseAlert = document.querySelectorAll('.close-icon');
const btnTransfer = document.querySelector('.transfer-money');
const btnLogOut = document.querySelector('.log-out');
const btnLoan = document.querySelector('.request-loan');
const btnDelete = document.querySelector('.delete-account');


//////////////////// OTHER COMPONENTS ////////////////////
const banner = document.querySelector('.banner');
const alert = document.querySelector('.alert');
const alertSuccess = document.querySelector('.alert-success');
const overlay = document.querySelector('.overlay');
const avatar = document.querySelector('.avatar');
const sideBarMenu = document.querySelector('.sidebar-menu');


//////////////////// DIVS ////////////////////
const formDiv = document.querySelector('.banner-form');
const bannerContentDiv = document.querySelector('.banner-content-app-description');
const application = document.querySelector('.application-content');
const movementsDiv = document.querySelector('.movements-cards');



// FUNCTIONS

// FANCY BANNER //
const initBanner = function (el) {
  el.classList.remove('hidden-effect');
  el.style.transform = 'translateY(0px)';
  el.style.transition = 'all 1s';
}

const displayForm = function (entries) {
  const [entry] = entries;

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

const timer = (sec = 2, htmlElement) => {
  setTimeout(() => {
    htmlElement.classList.add('hidden-effect');
    htmlElement.style.transition = 'all 0.5s';

    setTimeout(() => {
      htmlElement.remove();
    }, 200)
  }, sec * 1000)
}

let customizedAlert;
const displayWarningAlert = (msg, el = application) => {
  const html = `
    <div class="alert customized-warning-alert">
      <i class="fas fa-exclamation-triangle warning"></i>
      <p>${msg}</p>
      <!-- <i class="close-icon">&times</i> -->
    </div>`;

  el.insertAdjacentHTML('beforeend', html);
  customizedAlert = document.querySelector('.customized-warning-alert');
  timer(3, customizedAlert);
}

const displaySuccessAlert = (msg, el = application) => {
  const html = `
    <div class="alert-success customized-success-alert">
      <i class="fas fa-check-circle success"></i>
      <p>${msg}</p>
      <!-- <i class="close-icon">&times</i> -->
    </div>`;

    el.insertAdjacentHTML('beforeend', html);
    customizedAlert = document.querySelector('.customized-success-alert');
    timer(3, customizedAlert);
}

let cancelConfirmDiv;
let transferModalConfirmation;

const displayConfirmationMsg = (imgPath, amount, userOwner) => {
  const html = `
    <div class="modal transfer-modal-confirmation">
        <div class="info-user">
          <h2>Confirmation</h2>
          <div class="avatar-info">
            <img src=${imgPath} class="avatar" alt="">
            <div class="info">
              <p><strong>Send</strong>: ${amount} €</p>
              <p><strong>To</strong>: ${userOwner}</p>
            </div>
          </div>
        </div>
        <div class="btns-confirmation-cancel">
          <div class="cancel">
            <p>Cancel</p>
          </div>
          <div class="confirm">
            <p>Confirm</p>
          </div>
        </div>
      </div> `

    overlay.insertAdjacentHTML('beforeend', html);
    cancelConfirmDiv = document.querySelector('.btns-confirmation-cancel');
    transferModalConfirmation = document.querySelector('.transfer-modal-confirmation');
    cancelConfirm();
}

const displayMovements = function (movs) {
  movementsDiv.innerHTML = '';

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdraw';
    const icon = type === 'deposit' ? '<i class="fas fa-sort-up"></i>' : '<i class="fas fa-sort-down"></i>'
    const date = mov === mov[movs.length - 1] ? 'NEW' : '';

      const html = `
        <div class="movement-card">
          <div class="movements-type-${type}">
            ${icon}
            <p>${date}</p>
          </div>
          <div class="movement-amount">
            <p> ${mov} €</p>
          </div>
        </div>`;
    movementsDiv.insertAdjacentHTML('afterbegin', html)
  });
}

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((total, current) => total + current, 0);

  balanceLabel.textContent = `${acc.balance.toFixed(2)} €`;
}

const calcDisplayExpenses = function (acc) {
  const expenses = acc.movements.filter(mov => mov < 0).reduce((t, curr) => t + curr);
  labelExpenses.textContent = `${expenses.toFixed(2)} €`;
}

const calcDisplayIncome = function (acc) {
  const income = acc.movements.filter(mov => mov > 0).reduce((total, curr) => total + curr)
  console.log(income);
  labelIncome.textContent = `${income.toFixed(2)} €`
}

application.style.display = 'none';
sideBarMenu.style.display = 'none';



//////// EVENT HANDLERS ////////

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
    application.style.display = '';
    sideBarMenu.style.display = '';

    // display welcome msg, name and avatar
    welcomeMsg.innerHTML = `Welcome back, <strong> ${currentAccount.owner.split(' ')[0]} </strong>`;
    labelOwner.textContent = `${currentAccount.owner}`
    avatar.src = `${currentAccount.avatar}`;

    // display alert
    displaySuccessAlert('Correct credentials!')
    // alertSuccess.style.transition = 'all 1s';

    // display movements
    displayMovements(currentAccount.movements);

    //calc and display balance
    calcDisplayBalance(currentAccount);

    // calc and display expenses
    calcDisplayExpenses(currentAccount);

    // calc and display income
    calcDisplayIncome(currentAccount);

    // display time
    const date = new Date()
    currentDate.textContent = `${days[date.getDay()].slice(0, 3)}. ${date.getDate()}
    ${months[date.getMonth()]} of ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}h`
    inputUsername.value = inputPassword.value = '';

  } else {
    displayWarningAlert('This account does not exist! Do you already have an account?', banner)
    // alert.style.transition = 'all 1s';
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

// TRANSFER MONEY
btnTransfer.addEventListener('click', (e) => {
  allBtns.forEach(btn => {
    btn.classList.remove('active-btn');
  })

  allModals.forEach(modal => {
    modal.classList.add('hidden');
  })

  inputUsernameTransferModal.value = inputAmountTransferModal.value = '';

  if (!btnTransfer.classList.contains('active-btn')) {
    btnTransfer.classList.add('active-btn');
    overlay.classList.remove('hidden');
    modalTransfer.classList.remove('hidden');
    inputUsernameTransferModal.focus();
  } else {
    overlay.classList.add('hidden');
    modalTransfer.classList.add('hidden');
    modalTransfer.classList.remove('disabled-card', 'move-up');
    btnTransfer.classList.remove('active-btn');
    transferModalConfirmation?.remove();
  }
})

let amount;
let receiver;

transferForm.addEventListener('submit', (e) => {
  e.preventDefault();

  amount = inputAmountTransferModal.value;

  // get the user we are transfering money to
  receiver = findUser(inputUsernameTransferModal.value);
  console.log(receiver);
  console.log(currentAccount);

  // ERRORS

  if (amount >= currentAccount.balance) {
    return displayWarningAlert('You cannot give away all your money or more than your current balance');
  }

  if (amount <= 0) {
    return displayWarningAlert(`You cannot transfer ${amount === '' ? 'anything' : amount}. The amount must be bigger than 0`)
  }

  if (amount.match(/[a-zA-Z]+/g)) {
    return displayWarningAlert('You cannot include letters!')
  }


  if (receiver?.username === currentAccount.username) {
    // display alert
    return displayWarningAlert('You cannot transfer money to yourself');
  }

  if (receiver) {
    //move the transfer modal form up
    modalTransfer.classList.add('move-up');
    modalTransfer.classList.add('disabled-card');

    //unfocus
    inputAmountTransferModal.blur();
    inputUsernameTransferModal.blur();

    //display confirmation message
    displayConfirmationMsg(receiver.avatar, amount, receiver.owner);
  } else {
    displayWarningAlert('Wrong credentials! This account does not exist')
  }
})

// OVERLAY
overlay.addEventListener('click', (e) => {
  allBtns.forEach(btn => {
    btn.classList.remove('active-btn');
  });

  allModals.forEach(modal => {
    modal.classList.add('hidden');
  });

  overlay.classList.add('hidden');

  if (transferModalConfirmation) {
    modalTransfer.classList.remove('move-up', 'disabled-card');
    transferModalConfirmation.remove();
  }
})

// CONFIRMATION MODAL
const cancelConfirm = function() {
  cancelConfirmDiv.addEventListener('click', (e) => {

    if (e.target.closest('div').className === 'confirm') {
      modalTransfer.classList.remove('move-up', 'disabled-card');
      modalTransfer.classList.add('hidden');
      transferModalConfirmation.remove();
      overlay.classList.add('hidden');
      btnTransfer.classList.remove('active-btn');

      displaySuccessAlert('Operation fulfilled!');
      currentAccount.movements.push(-+amount);
      receiver.movements.push(+amount);
      displayMovements(currentAccount.movements);

      calcDisplayBalance(currentAccount);
      calcDisplayExpenses(currentAccount);
      calcDisplayIncome(currentAccount);

    }  else if (e.target.closest('div').className === 'cancel') {
      modalTransfer.classList.remove('move-up', 'disabled-card');
      modalTransfer.classList.add('hidden');
      transferModalConfirmation.remove();
      overlay.classList.add('hidden');
      btnTransfer.classList.remove('active-btn');

      displayWarningAlert('Operation cancelled!')
    }
  });
};


// REQUEST LOAN //
btnLoan.addEventListener('click', (e) => {
  allBtns.forEach(btn => {
    btn.classList.remove('active-btn');
  })

  allModals.forEach(modal => {
    modal.classList.add('hidden');
  })

  inputAmountLoan.value = '';

  if (!btnLoan.classList.contains('active-btn')) {
    btnLoan.classList.add('active-btn');
    overlay.classList.remove('hidden');
    loanModal.classList.remove('hidden');
    inputAmountLoan.focus();
  } else {
    btnLoan.classList.remove('active-btn');
    overlay.classList.add('hidden');
    loanModal.classList.add('hidden');
  }
});

// LOAN FORM //
loanForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = inputAmountLoan.value;

  if (amount > currentAccount.balance ) {
    return displayWarningAlert('Sorry, you cannot request an amount bigger than your current balance');
  }

  if (!amount > 0 || amount === '') return displayWarningAlert('The amount must be bigger than 0');

  if (amount.match(/[a-zA-Z]/g)) return displayWarningAlert('The amount needs to be a number');

  if (amount <= currentAccount.balance) {
    displaySuccessAlert('Operation fulfilled!');
    currentAccount.movements.push(+amount);
    displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount);
    calcDisplayIncome(currentAccount);

    btnLoan.classList.remove('active-btn');
    overlay.classList.add('hidden');
    loanModal.classList.add('hidden');
  }
})


// DELETE ACCOUNT
btnDelete.addEventListener('click', (e) => {

  allBtns.forEach(btn => {
    btn.classList.remove('active-btn');
  })

  allModals.forEach(modal => {
    modal.classList.add('hidden');
  })

  inputDeleteUsername.value = inputDeletePin.value = '';

  if(!btnDelete.classList.contains('active-btn')) {
    btnDelete.classList.add('active-btn');
    overlay.classList.remove('hidden');
    deleteAccModal.classList.remove('hidden');
    inputDeleteUsername.focus();
  } else {
    btnDelete.classList.remove('active-btn');
    overlay.classList.add('hidden');
    deleteAccModal.classList.add('hidden');
  }
})

deleteAccForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = inputDeleteUsername.value;
  const pin = inputDeletePin.value;

  if ((username !== currentAccount.username && pin !== currentAccount.pin) ||
    (username !== currentAccount.username || pin !== currentAccount.pin)) {
    displayWarningAlert('Username or passwor are incorrect')
  }

  if (username === currentAccount.username && +pin === currentAccount.pin ) {
    console.log(`Correct credentials`);
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    console.log(index);
    accounts.splice(index, 1);

    allBtns.forEach(btn => {
      btn.classList.remove('active-btn');
    })

    allModals.forEach(modal => {
      modal.classList.add('hidden');
    })

    overlay.classList.add('hidden');

    application.style.display = 'none';
    sideBarMenu.style.display = 'none';
    banner.classList.remove('hidden');

    displaySuccessAlert('Your account was succesfully deleted, but you are still in our database ;)', banner);
    inputDeleteUsername.value = inputDeletePin.value = '';
  }
})


// LOG OUT //
btnLogOut.addEventListener('click', (e) => {
  const icon = e.target.classList.contains('fa-power-off');
  if (!icon) return;
  currentAccount = '';

  application.style.display = 'none';
  sideBarMenu.style.display = 'none';
  banner.classList.remove('hidden');

  allBtns.forEach(btn => {
    btn.classList.remove('active-btn');
  })

  allModals.forEach(modal => {
    modal.classList.add('hidden');
  })

  overlay.classList.add('hidden');

  displaySuccessAlert('Logout succesfully!', banner);
})

