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

import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
// const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

const formData = {};

function onFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitForm(e) {
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

(function getDateFromLS() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  const email = document.querySelector('.feedback-form input');
  const message = document.querySelector('.feedback-form textarea');
  if (data) {
    email.value = data.email;
    message.value = data.message;
  }
})();
