/* eslint-disable no-undef */

// do client side validation before sending POST request
const registerForm = document.querySelector('#registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const password = document.querySelector('.register-pass').value;
    const passwordConf = document.querySelector('.register-passConf').value;
    if (password.length < 6) {
      Swal.fire('Password must be at least 6 characters long');
    } else if (password !== passwordConf) {
      Swal.fire('Passwords do not match!!');
    } else {
      // now sending the note request to the server
      registerForm.submit();
    }
  });
}

const modalForm = document.querySelector('#modalForm');
if (modalForm) {
  modalForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const modalTitle = document.querySelector('.modal-title').value;
    const modalContent = document.querySelector('.modal-content').value;
    if (modalTitle === '' || modalContent === '') {
      modalBg.classList.remove('hide');
      Swal.fire('Note must not be empty');
    } else {
      modalForm.submit();
    }
  });
}

// modal toggling
const modalBg = document.querySelector('.modal-bg');
const toggleModal = document.querySelector('.toggle-modal');
const createNote = document.querySelector('.create-note');
const closeBtn = document.querySelector('.close-btn');

if (toggleModal && modalBg && createNote && closeBtn) {
  toggleModal.addEventListener('click', function () {
    modalBg.classList.remove('hide');
  });

  createNote.addEventListener('click', function () {
    modalBg.classList.add('hide');
  });

  closeBtn.addEventListener('click', function () {
    modalBg.classList.add('hide');
  });
}
