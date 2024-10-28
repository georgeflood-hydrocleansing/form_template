const container = document.querySelector('.background--container');

document.addEventListener('DOMContentLoaded', function () {
  fetch('config.json')
    .then((response) => response.json())
    .then((data) => {
      const hostName = window.location.hostname;
      const container = document.querySelector('.background--container');

      if (data[hostName]) {
        const domainConfig = data[hostName];

        container.style.backgroundImage = domainConfig.backgroundImage;

        document.querySelector('.contactForm--headers h3').textContent =
          domainConfig.text;
      } else {
        //// DEFAULT BACKGROUND IMAGE AND TEXT
        container.style.backgroundImage =
          'url(https://images.unsplash.com/photo-1553211274-94febfa26133?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        document.querySelector('.contactForm--headers h3').textContent =
          'Are you interested in working together?';
      }
    })
    .catch((error) => {
      console.error('Error loading the JSON config:', error);
    });
});
