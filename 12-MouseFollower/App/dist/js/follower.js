export default class Follower {
  width = 30;
  height = 30;
  constructor(hoverClass) {
    this.hoverClass = hoverClass;
    this.render();
  }

  followCursor(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const x = mouseX - this.followerEl.offsetWidth / 2;
    const y = mouseY - this.followerEl.offsetHeight / 2;
    this.followerEl.style.transform = `translate(${x}px, ${y}px)`;
  }

  cursorEnter(e) {
    const el = e.target.getBoundingClientRect();
    const { width, height } = el;
    console.log(el);
    const moveX = 15;
    this.followerEl.style = `width: ${
      width + moveX
    }px; height: ${height}px; border-radius: 0;`;
  }

  cursorLeave(e) {
    this.followerEl.style = `width:${this.width}px; height:${this.height}px; border-radius: 50%`;
  }

  render() {
    this.followerEl = document.createElement("div");
    console.log(this.followerEl);
    this.followerEl.className = "follower";
    document.body.prepend(this.followerEl);
    document.addEventListener("mousemove", this.followCursor.bind(this));
    const hoverEl = document.querySelectorAll(this.hoverClass);
    hoverEl.forEach((el) => {
      el.addEventListener("mouseenter", this.cursorEnter.bind(this));
      el.addEventListener("mouseleave", this.cursorLeave.bind(this));
    });
  }
}
