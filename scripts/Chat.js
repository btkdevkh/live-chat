import { getFirestore, collection, doc, setDoc, onSnapshot, where, query, orderBy, Timestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

export default class Chat {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.store = getFirestore();
    this.chats = collection(this.store, 'chats');

    this.unsub;
  }
  
  async add(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: Timestamp.fromDate(now)
    }

    const res = await setDoc(doc(this.chats), chat);
    return res;
  }

  find(callback) {
    const q = query(this.chats, orderBy('created_at', 'desc'), where('room', '==', this.room));

    this.unsub = onSnapshot(q, this.chats, snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type === 'added') callback(change.doc.data());
      })
    })
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem('username', username);
  }

  updateRoot(room) {
    this.room = room;
    if(this.unsub) this.unsub();
  }
}
