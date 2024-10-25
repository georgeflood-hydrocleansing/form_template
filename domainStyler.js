const container = document.querySelector('.background--container');

const backgroundImg = {
  'example.hydro.com': `url(https://images.unsplash.com/photo-1553211274-94febfa26133?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
};

function applyBackground() {
  const hostName = window.location.hostname;

  if (backgroundImg[hostName]) {
    container.style.backgroundImage = backgroundImg[hostName];
  } else {
    container.style.backgroundImage =
      'url(https://images.unsplash.com/photo-1553211274-94febfa26133?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
  }
}

document.addEventListener('DOMContentLoaded', applyBackground);
