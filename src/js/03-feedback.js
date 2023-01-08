// import throttle from 'lodash.throttle';
// const feedbackForm = document.querySelector('.feedback-form');

// const savedFormDataJSON = localStorage.getItem('feedback-form-state');
// const savedFormData = JSON.parse(savedFormDataJSON);

// if (savedFormData !== null) {
//   feedbackForm['email'].value = savedFormData.email;
//   feedbackForm['message'].value = savedFormData.message;
// }

// feedbackForm.addEventListener(
//   'input',
//   throttle(event => {
//     const formData = {
//       email: `${feedbackForm['email'].value}`,
//       message: `${feedbackForm['message'].value}`,
//     };
//     const formDataJSON = JSON.stringify(formData);

//     localStorage.setItem('feedback-form-state', formDataJSON);
//   }, 500)
// );

// feedbackForm.addEventListener('submit', event => {
//   event.preventDefault();

//   const formData = {
//     email: `${feedbackForm['email'].value}`,
//     message: `${feedbackForm['message'].value}`,
//   };
//   console.log(formData);

//   localStorage.removeItem('feedback-form-state');
//   feedbackForm['email'].value = '';
//   feedbackForm['message'].value = '';
// });

const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let objectStorage = {
  email: '',
  message: '',
};

getInputFromLS();

function getInputFromLS() {
  try {
    const dataLS = localStorage.getItem(STORAGE_KEY);
    if (!dataLS) return;
    objectStorage = JSON.parse(dataLS);
    for (let key in objectStorage) {
      form.elements[key].value = objectStorage[key];
    }
  } catch (error) {
    console.log('Get state error: ', error.message);
  }
}

function onFormInput(e) {
  objectStorage[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(objectStorage));
}

function onFormSubmit(e) {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;

  const formData = {
    email: email.value,
    message: message.value,
  };

  console.log('This is Form Data:', formData);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);
