'use strict';

const mapSection = document.getElementById('map')
const mapOverlay = document.querySelector('.overlay-map');
const modalUsersCounter = document.querySelector('.modal-counter-users');
const labelNumUsers = document.querySelector('.num-users');
const btnStart = document.querySelectorAll('.btn-start');
const allUsers = document.querySelectorAll('.user');
const userCards = document.querySelectorAll('.user-card')
const allUsersDiv = document.querySelector('.user-accounts');
const btnsHack = document.querySelectorAll('.btn-hack');
const btnData = document.querySelector('.btn-secondary');
const sectionData = document.getElementById('test-data');



console.log(homePage, btnsHack);

mapOverlay.classList.add('hidden');
modalUsersCounter.classList.add('hidden-effect');

const countUsers = function () {
  const users = function () {
    if (numUsers === 300) {
      clearInterval(counter)
    }

    labelNumUsers.textContent = numUsers++;
  };

  let numUsers = 0;
  users();
  const counter = setInterval(users, 1);
  return counter;
}

const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 100)
  });
};
const createUserAvatar = function (imgPath, num) {
  return new Promise(function (resolve, reject) {
    const avatar = document.createElement('img');
    avatar.src = imgPath;
    avatar.className = `avatar-user-card avatar-${num}`;

    avatar.addEventListener('load', (e) => {
      mapSection.append(e.currentTarget);
      resolve(avatar);
    });

    avatar.addEventListener('error', (e) => {
      reject(new Error('Image not found!'))
    });
  })
}

const openUsersCounterModal = function() {
  mapOverlay.classList.remove('hidden');

  modalUsersCounter.classList.remove('hidden-effect');

  countUsers();
}


const loadImages = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) {
    createUserAvatar('images/avatar-user-card-1.jpg', 1).then(img => {
      console.log('Image loaded!');
      return wait(4);
    })
    .then(() => {
      return createUserAvatar('images/avatar-user-card-2.jpg', 2)
    })
    .then(img => {
      console.log('2nd avatar loaded!')

      return wait(4)
    }).then(() => {

      return createUserAvatar('images/avatar-user-card-3.jpg', 3)
    })
    .then(img => {

      console.log('3rd avatar loaded!')

      return wait(4)
    }).then(() => {

      return createUserAvatar('images/avatar-user-card-4.jpg', 4)
    }).then(img => {

      console.log('4th avatar loaded!')

      return wait(4)
    }).then(() => {

      return createUserAvatar('images/avatar-user-card-5.jpg', 5)
    }).then(img => {
      console.log('5th avatar loaded!')

      return wait(4)
    }).then(() => {

      return createUserAvatar('images/avatar-user-card-6.jpg', 6)
    }).then(img => {

      console.log('6th image loaded!')

      return wait(4)
    }).then(() => {

      return createUserAvatar('images/avatar-user-card-7.jpg', 7)
    }).then(img => {

      console.log('All avatars loaded!')

      return wait(8)
    }).then(() => {

      return openUsersCounterModal()
    })

    observer.unobserve(entry.target);
  }
}

const mapSectionObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.10,
})

mapSectionObserver.observe(mapSection)



btnStart.forEach(btn => {
  btn.addEventListener('click', (e) => {
  e.preventDefault();

  banner.scrollIntoView({behavior: 'smooth'});

  });
});

btnData.addEventListener('click', (e) => {
  e.preventDefault()

  sectionData.scrollIntoView({behavior: 'smooth'})
})

allUsersDiv.addEventListener('click', (e) => {
  if (!e.target.classList.contains('user')) return;

  allUsers.forEach(user => user.classList.remove('active-link'));

  e.target.classList.add('active-link');
  const data = e.target.dataset.user;

  userCards.forEach(card => card.classList.add('hidden'));

  const card = document.querySelector(`.user-card-${data}`);
  card.classList.remove('hidden');
})

btnsHack.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const user = e.currentTarget.dataset.user;
    const username = document.querySelector(`.user-credentials-username-${user}`).textContent;
    const pin = document.querySelector(`.user-credentials-pin-${user}`).textContent;

    banner.scrollIntoView({behavior: 'smooth'})

    inputUsername.value = username.split(' ').slice(1).join();
    inputPassword.value = pin.split(' ').slice(1).join();
  })
})

const nameNewUser = document.querySelector('.new-user-name');
const usernameNewUser = document.querySelector('.new-user-username');
const pinNewUser = document.querySelector('.new-user-pin');
const confirmedPinNewUser = document.querySelector('.new-user-confirm-pin');

const createAccountForm = document.querySelector('.create-account-form');
const newUserName = document.querySelector('.new-user-credentials-name');
const newUserUsername = document.querySelector('.new-user-credentials-username');
const newUserPin = document.querySelector('.new-user-credentials-pin');



createAccountForm.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log(nameNewUser.value, usernameNewUser.value, pinNewUser.value, confirmedPinNewUser.value)


  if (pinNewUser.value === confirmedPinNewUser.value) {
    console.log('correct!')

    newUserName.innerHTML = `<strong>${nameNewUser.value}</strong>`;
    newUserUsername.innerHTML = `<strong>username:</strong> ${usernameNewUser.value}`;
    newUserPin.innerHTML = `<strong>pin:</strong> ${pinNewUser.value}`;

    const newAccount = {
      owner: nameNewUser.value,
      username: usernameNewUser.value,
      pin: pinNewUser.value,
      avatar: 'images/profile.jpg',
      movements: [],
    }

    accounts.push(newAccount);

    displaySuccessAlert('Correct credentials!', document.getElementById('create-account'));
  }
})

