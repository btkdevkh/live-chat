import './firebase.js'
import Chat from "./Chat.js";
import Ui from "./Ui.js";

const username = localStorage.username ? localStorage.username : 'Anonymous'

const conversations = document.querySelector('.conversations');
const chatUi = new Ui(conversations);

const chatroom = new Chat('general', username);
chatroom.find(data => chatUi.render(data));

const chatForm = document.querySelector('.chat');
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  const newMsg = chatForm.message.value.trim();

  if(!newMsg) return;

  chatroom.add(newMsg)
    .then(() => chatForm.reset())
    .catch(err => console.log(err));
})

const updNameForm = document.querySelector('.upd__name');
const updMessage = document.querySelector('.upd__message');

updNameForm.addEventListener('submit', e => {
  e.preventDefault();

  const newName = updNameForm.username.value.trim();

  if(!newName) return;

  chatroom.updateName(newName);

  updNameForm.reset();
  updMessage.textContent = `Name was updated to ${newName}`;

  setTimeout(() => {
    updMessage.textContent = '';
  }, 3000);
})

const rooms = document.querySelector('.chatrooms');
rooms.addEventListener('click', e => {
  if(e.target.nodeName === 'BUTTON' || e.target.nodeName === 'I') {
    chatUi.clear();

    const room = e.target.getAttribute('id');
    chatroom.updateRoot(room);

    chatroom.find(chat => chatUi.render(chat));
  }
})
