const parallaxContainer = document.getElementById("parallax");

const parallaxHandler = (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const windowH = window.innerHeight / 2;
  const windowW = window.innerWidth / 2;

  const depth1 = `${50 - (mouseX - windowW) * 0.01}% ${
    50 - (mouseY - windowH) * 0.01
  }%`;
  const depth2 = `${50 - (mouseX - windowW) * 0.02}% ${
    50 - (mouseY - windowH) * 0.02
  }%`;
  const depth3 = `${50 - (mouseX - windowW) * 0.02}% ${
    50 - (mouseY - windowH) * 0.03
  }%`;

  parallaxContainer.style.backgroundPosition = `${depth1}, ${depth2}, ${depth3}`;
};

parallaxContainer.addEventListener("mousemove", parallaxHandler);
