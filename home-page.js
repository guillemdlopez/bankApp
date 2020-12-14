'use strict';

const mapSection = document.getElementById('map')
const userCards = document.querySelectorAll('.user-card')
const mapOverlay = document.querySelector('.overlay-map');
const modalUsersCounter = document.querySelector('.modal-counter-users');
const labelNumUsers = document.querySelector('.num-users');
console.log(homePage, userCards, mapOverlay, labelNumUsers);

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
  }

  observer.unobserve(mapSection);
}

const mapSectionObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.30,
})

mapSectionObserver.observe(mapSection)


const btnStart = document.querySelectorAll('.btn-start');

btnStart.forEach(btn => {
  btn.addEventListener('click', (e) => {
  e.preventDefault();

  banner.scrollIntoView({behavior: 'smooth'});

  });
});
console.log(btnStart);
