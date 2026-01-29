import io from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js'

const socket = io.connect('http://localhost:1000');

const sendMsgBtn = document.querySelector('.send-container');
const mountMessage = document.querySelector('.mount-message');
const defaultMessage = document.querySelector('.default-message');
const plusIcon = document.querySelector('.plus-icon');
const chatContainer = document.querySelector('.chat-container');

const name = window.prompt('Please, enter your name:');

socket.on('connect', () => {
    if (name) {
        defaultMessage.textContent = `Connected with id: ${socket.id} and name: ${name}`;
    } else {
        defaultMessage.textContent = `Connected with id: ${socket.id}`;
    }
})

socket.on('chat-msg', (message) => {
    if (message) {
        mountAndDisplayMessage(message, 'receiver');
    }
})

sendMsgBtn.addEventListener('click', () => {
    const message = document.getElementById('message');
    socket.emit('client-chat-msg', message.value);

    if (message.value) {
        mountAndDisplayMessage(message.value, 'sender');
    }

    message.value = '';
});

plusIcon.addEventListener('click', () => {
    const rand = Math.floor(Math.random() * 4) + 1;
    chatContainer.style.backgroundImage = `url("./images/chat-themes/theme-${rand}.jpg")`;
    chatContainer.style.backgroundSize = "cover";
    chatContainer.style.backgroundPosition = "center";
    chatContainer.style.backgroundRepeat = "no-repeat";
})

// funct to display a msg
const mountAndDisplayMessage = (msg, msgMaker) => {
    const div = document.createElement('div');
    div.className = `message ${msgMaker}`;
    div.textContent = msg;
    mountMessage.append(div);
}