const clockTitle = document.querySelector('.js-clock');
const locationTitle = document.querySelector('.location');
const temperatureTitle = document.querySelector('.temperature');
const loginForm = document.querySelector('.login form');
const todoForm = document.querySelector('.todo form');
const todoList = document.querySelector('.todo-list');

function getTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return { hours, minutes, seconds };
}

function updateClock() {
  const { hours, minutes, seconds } = getTime();
  clockTitle.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationTitle.textContent = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c067f6174c079db65937ed00511aee99
  `)
    .then(response => response.json())
    .then(data => {
      locationTitle.textContent = data.name;
      temperatureTitle.textContent = `${data.main.temp/10}°C`;
    })
    .catch(error => {
      locationTitle.textContent = "Unable to retrieve weather data.";
    });
}

getLocation();

function login(event) {
  event.preventDefault();
  const username = event.target.elements.username.value;
  const password = event.target.elements.password.value;
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  alert('Login successful!');
}

function loadLogin() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  if (username && password) {
    alert(`Welcome back, ${username}!`);
  }
}

loginForm.addEventListener('submit', login);
window.addEventListener('load', loadLogin);

function addTodo(event) {
  event.preventDefault();
  const todo = event.target.elements.todo.value;
  const li = document.createElement('li');
  li.textContent = todo;
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', deleteTodo);
  li.appendChild(button);
  todoList.appendChild(li);
  event.target.reset();
  saveTodo();
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  todoList.removeChild(li);
  saveTodo();
}

function saveTodo() {
  const todos = [];
  const liList = todoList.querySelectorAll('li');
  liList.forEach(li => {
    todos.push(li.textContent);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodo() {
  const todos = JSON.parse(localStorage.getItem('todos'));
  if (todos) {
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo;
      const button = document.createElement('button');
      button.textContent = 'Delete';
      button.addEventListener('click', deleteTodo);
      li.appendChild(button);
      todoList.appendChild(li);
    });
  }
}

/* 랜덤한 배경 이미지 */
function getRandomImage() {
    const images = ['1.jpg','2.jpg', '3.jpg', '4.jpg', '5.jpg'];
    const index = Math.floor(Math.random() * images.length);
    return images[index];
  }
  
  const body = document.querySelector('body');
  const randomImage = getRandomImage();
  body.style.backgroundImage = `url(img/${randomImage})`;

todoForm.addEventListener('submit', addTodo);
window.addEventListener('load', loadTodo);