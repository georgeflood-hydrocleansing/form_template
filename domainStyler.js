const container = document.querySelector('.background--container');

document.addEventListener('DOMContentLoaded', function () {
  fetch('config.json')
    .then((response) => response.json())
    .then((data) => {
      const hostName = window.location.hostname;
      const container = document.querySelector('.background--container');

      console.log('Url count:', Object.keys(data).length);

      if (data[hostName]) {
        const domainConfig = data[hostName];

        container.style.backgroundImage = domainConfig.backgroundImage;

        document.querySelector('.contactForm--headers h3').textContent =
          domainConfig.text;
      } else {
        //// DEFAULT BACKGROUND IMAGE AND TEXT
        container.style.backgroundImage = 'url(/images/liquidwaste.jpg)';
        document.querySelector('.contactForm--headers h3').textContent =
          'Are you interested in working together?';
      }
    })
    .catch((error) => {
      console.error('Error loading the JSON config:', error);
    });
});
