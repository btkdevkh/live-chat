export default class Ui {
  constructor(html) {
    this.html = html;
  }

  clear() {
    this.html.innerHTML = '';
  }

  render(data) {
    const html = `
      <div class="conversations__descriptions">
        <span><strong>${data.username}</strong></span>
        <span>${data.message}</span>
        <div>${dateFns.distanceInWordsToNow(data.created_at.toDate(), { addSuffix: true })}</div>
      </div>
    `;

    this.html.innerHTML += html;
  }
}
