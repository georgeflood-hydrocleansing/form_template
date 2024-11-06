const container = document.querySelector('.background--container');

document.addEventListener('DOMContentLoaded', function () {
  fetch('config.json')
    .then((response) => response.json())
    .then((data) => {
      const hostName = window.location.hostname;
      const container = document.querySelector('.background--container');
      let backgroundImageUrl;

      if (data[hostName]) {
        const domainConfig = data[hostName];
        backgroundImageUrl = domainConfig.backgroundImage;
        document.querySelector('.contactForm--headers h3').textContent =
          domainConfig.text;
      } else {
        backgroundImageUrl = 'url(/images/liquidwaste.jpg)';
        document.querySelector('.contactForm--headers h3').textContent =
          'Are you interested in working together?';
      }

      // Preload the background image
      const img = new Image();
      img.onload = function () {
        container.style.backgroundImage = backgroundImageUrl;
        // Trigger the event to start the animation
        $(document).trigger('backgroundImageLoaded');
      };
      img.src = backgroundImageUrl
        .replace(/^url\(["']?/, '')
        .replace(/["']?\)$/, '');
    })
    .catch((error) => {
      console.error('Error loading the JSON config:', error);
    });
});
