const getAllUsers = (users) => {
  fetch('http://localhost:5000/users')
    .then((res) => res.json())
    .then((data) => {
      fillTable(data);
    });
};

const fillTable = (users) => {
  const table = document.querySelector('.table-list');
  const tbody = table.getElementsByTagName('tbody')[0];

  users.map((user) => {
    const row = tbody.insertRow();
    const columnName = row.insertCell();
    const columnEmail = row.insertCell();

    columnName.innerHTML = user.name;
    columnEmail.innerHTML = user.email;
  });
};

getAllUsers();
