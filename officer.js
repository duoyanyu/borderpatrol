function checkPassword() {
  const pass = document.getElementById('adminPass').value;
  if (pass === 'admin123') {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    loadData();
  } else {
    alert('Incorrect password');
  }
}

function loadData() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const checkins = JSON.parse(localStorage.getItem('checkins') || '[]');
  const usersList = document.getElementById('usersList');
  const checkinsList = document.getElementById('checkinsList');

  usersList.innerHTML = '';
  checkinsList.innerHTML = '';

  users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = `${u.name} (Birthday: ${u.birthday})`;
    usersList.appendChild(li);
  });

  checkins.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.time} - ${c.match}`;
    checkinsList.appendChild(li);
  });
}
