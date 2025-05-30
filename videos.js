const video = document.getElementById('video-brasah1');
video.volume = 1;
video.loop = true;

let userPaused = false; // Flag para saber se o usuário pausou manualmente

// Controle por visibilidade na tela
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !userPaused) {
      video.play();
    } else if (!entry.isIntersecting) {
      video.pause();
      video.currentTime = 0;
    }
  });
}, {
  threshold: 0.5
});

observer.observe(video);

document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.querySelector('.btn-watch');
  const icon = playButton.querySelector('.btn-icon');
  const text = playButton.querySelector('span');

  playButton.addEventListener('click', () => {
    if (video.paused) {
      userPaused = false;
      video.play();
      icon.src = 'img/pause-svgrepo-com.svg';
      icon.alt = 'pause';
      text.textContent = 'Pausar';
    } else {
      userPaused = true;
      video.pause();
      icon.src = 'img/play-button-svgrepo-com.svg';
      icon.alt = 'play';
      text.textContent = 'Assistir';
    }
  });
});
