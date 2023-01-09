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
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

getDataFromStorage();

function onSubmitForm(e) {
  e.preventDefault();

  const formLenght = e.currentTarget.elements.length - 1;

  if (Object.keys(formData).length !== formLenght) {
    alert('Enter data');
    return;
  }

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  formData = {};
}

function onFormData(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getDataFromStorage() {
  const saveMessage = localStorage.getItem(STORAGE_KEY);

  if (saveMessage) {
    try {
      formData = JSON.parse(saveMessage);

      Object.entries(formData).forEach(
        ([name, value]) => (form.elements[name].value = value)
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
