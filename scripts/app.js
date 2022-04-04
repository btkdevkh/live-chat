import './firebase.js'
import Chat from "./Chat.js";
import Ui from "./Ui.js";

const chatUi = new Ui(document.querySelector('.conversations'));

const chatroom = new Chat('general', 'Jim');
chatroom.find(data => chatUi.render(data));

const chatForm = document.querySelector('.chat');
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  if(!chatForm.message.value) return;

  chatroom.add(chatForm.message.value.trim())
    .then(() => chatForm.reset())
    .catch(err => console.log(err));
})
