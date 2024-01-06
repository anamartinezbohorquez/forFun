const noButton = document.getElementById('noBtn');

const yesButton = document.getElementById('yesBtn');

noButton.addEventListener('click', () => {
  const maxWidth = window.innerWidth - noButton.clientWidth;
  const maxHeight = window.innerHeight - noButton.clientHeight;

  const newX = Math.floor(Math.random() * maxWidth);
  const newY = Math.floor(Math.random() * maxHeight);

  noButton.style.transform = `translate(${newX}px, ${newY}px)`;
});



yesButton.addEventListener('click', () => {
  window.location.href = 'page1.html'; // Redirect to page1.html on Yes button click
});
