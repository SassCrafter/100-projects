export const headerScrollHandler = (e) => {
    const header = document.getElementById('header');
    const scrollPos = window.scrollY;
    const headerHeight = header.offsetHeight;

    if (scrollPos > headerHeight) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}