const host = 'http://localhost:5000';

//-----------LIST-------------------

const getAllUsers = (users) => {
  fetch(`${host}/users`)
    .then((res) => res.json())
    .then((data) => {
      fillTable(data);
    });
};

//fill up the table of users
const fillTable = (users) => {
  const table = document.querySelector('.table-list');
  const tbody = table.getElementsByTagName('tbody')[0];

  users.map((user) => {
    const row = tbody.insertRow();
    const id = user._id;
    row.setAttribute('id', id);

    //buttonDelete
    const btnDelete = document.createElement('a');
    const iconDelete = document.createElement('i');
    iconDelete.setAttribute('class', 'fas fa-times');
    btnDelete.setAttribute('class', 'btnDelete');
    btnDelete.setAttribute('onclick', `removeUser('${id}')`);
    btnDelete.appendChild(iconDelete);

    //buttonEdit
    const btnEdit = document.createElement('a');
    const iconEdit = document.createElement('i');
    iconEdit.setAttribute('class', 'fas fa-pencil-alt');
    btnEdit.setAttribute('class', 'btnEdit');
    btnEdit.setAttribute('onClick', `changeUser('${id}')`);
    btnEdit.appendChild(iconEdit);

    const columnBtn = row.insertCell();
    const columnName = row.insertCell();
    const columnEmail = row.insertCell();

    columnBtn.appendChild(btnDelete);
    columnBtn.appendChild(btnEdit);
    columnName.innerHTML = user.username;
    columnEmail.innerHTML = user.email;
  });
};

getAllUsers();

//-----------REMOVE-------------------

const removeUser = (id) => {
  fetch(`${host}/users/${id}`, {
    method: 'DELETE',
  }).then((res) => {
    if (res.status === 204) removeRow(id);
  });
};

const removeRow = (id) => {
  const row = document.getElementById(`${id}`);
  row.parentNode.removeChild(row);
};

//-----------UPDATE------------------------

const modal = document.querySelector('.modal');
let idUser = '';

const changeUser = (id) => {
  modal.style = `display: flex;`;
  idUser = id;
};

const close = document.querySelector('#close');
close.addEventListener('click', () => {
  modal.style = 'display: none';
});

const form = document.querySelector('.form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const button = document.querySelector('#submit-button');

const put = (id, userUpdate) => {
  fetch(`${host}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userUpdate),
  })
    .then((resp) => {
      if (!resp.ok) {
        throw resp;
      }
    })
    .then((data) => {
      changeUser('none');
      alert('Your account have been successfully updated!');
      updateList();
    });
};

const submit = (e) => {
  e.preventDefault();

  const userUpdate = {
    username: inputName.value,
    email: inputEmail.value,
  };

  if (idUser !== '') {
    put(idUser, userUpdate);
    e.target.reset();
  } else {
    alert('User not exists!');
  }
};

function updateList() {
  location.reload();
}

form.addEventListener('submit', submit);
