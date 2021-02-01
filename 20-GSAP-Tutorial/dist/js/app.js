/* eslint-disable no-undef */
const navButton = document.getElementById('nav-button');
const navOpen = document.querySelector('.nav__opened');
const tl = gsap.timeline({
  paused: true,
  reversed: true,
  defaults: { ease: Power2.easeOut },
});

tl.to('.cover', 1, {
  width: '60%',
  left: '40%',
  // eslint-disable-next-line no-undef
})
  .to(
    '.nav',
    1,
    {
      height: '100%',
    },
    // eslint-disable-next-line comma-dangle
    '-=0.5'
  )
  .fromTo(
    navOpen,
    0.5,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      onCOmplete() {
        navOpen.style.pointerEvents = 'auto';
      },
      // eslint-disable-next-line comma-dangle
    }
  );

const toggleTimeline = (timeline) => {
  timeline.reversed() ? timeline.play() : timeline.reverse();
};

navButton.addEventListener('click', () => {
  toggleTimeline(tl);
});
