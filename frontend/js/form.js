const form = document.querySelector('.form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const button = document.querySelector('#button');

const post = (user) => {
  fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      alert('Your account have been successfully created.');
    })
    .catch((err) => {
      err.json().then((dataError) => {
        alert(dataError.error);
      });
    });
};

const submit = (e) => {
  e.preventDefault();

  const user = {
    username: nameInput.value,
    email: emailInput.value,
  };

  post(user);
  e.target.reset();
};

form.addEventListener('submit', submit);
