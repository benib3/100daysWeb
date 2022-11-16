const imageElement = document.getElementById("main-image");

new simpleParallax(imageElement, {
  scale: 1.6,
  delay: 0.1,
});
const mainTitle = document.getElementsByClassName("paragraph");
new simpleParallax(mainTitle, {
  scale: 1.6,
  delay: 0.2,
});
