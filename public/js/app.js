/* eslint-disable no-undef */

//do client side validation before sending POST request
const registerForm = document.querySelector('#registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
        const password = document.querySelector('.register-pass').value;
        const passwordConf = document.querySelector('.register-passConf').value;
        if (password.length < 6) {
            Swal.fire('Password must be at least 6 characters long');
        } else if (password !== passwordConf) {
            Swal.fire('Passwords do not match!!');
        } else {
            //now sending the note request to the server
            registerForm.submit();
        }
    });
}

const noteForm = document.querySelector('#noteForm');
if (noteForm) {
    noteForm.addEventListener('submit', function(evt) {
        evt.preventDefault();
        const noteTitle = document.querySelector('.note-title-input').value;
        const noteContent = document.querySelector('.note-content-input').value;
        if (noteTitle === '' || noteContent === '') {
            noteBg.classList.remove('hide');
            Swal.fire('Note must not be empty');
        } else {
            noteForm.submit();
        }
    });
}

//modal toggling
const noteBg = document.querySelector('.note-bg');
const toggleNote = document.querySelector('.toggle-note');
const createNote = document.querySelector('.create-note');
const closeBtn = document.querySelector('.close-btn');

if (toggleNote && noteBg && createNote && closeBtn) {
    toggleNote.addEventListener('click', function() {
        noteBg.classList.remove('hide');
    });

    createNote.addEventListener('click', function() {
        noteBg.classList.add('hide');
    });

    closeBtn.addEventListener('click', function() {
        noteBg.classList.add('hide');
    });
}
