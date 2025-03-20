const container = document.querySelector('.background--container');

document.addEventListener('DOMContentLoaded', function () {
  fetch('config.json')
    .then((response) => response.json())
    .then((data) => {
      console.log(Object.keys(data).length);
      const hostName = window.location.hostname;
      const container = document.querySelector('.background--container');
      let backgroundImageUrl;

      const companyName = hostName
        .replace(
          /\.(co\.uk|com|uk|org\.uk|net|london|website|blog|services|ltd)$/,
          ''
        )
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      function determineCompanyType(hostname, backgroundImage) {
        if (backgroundImage.includes('FloodResponse')) {
          return 'EmergencyService';
        }
        if (backgroundImage.includes('CCTV')) {
          return 'InspectionService';
        }
        if (backgroundImage.includes('roadsweeper')) {
          return 'CleaningService';
        }
        if (backgroundImage.includes('pumpservices')) {
          return 'MaintenanceService';
        }
        if (backgroundImage.includes('festival')) {
          return 'EventService';
        }
        if (backgroundImage.includes('fatberg')) {
          return 'WasteManagementCompany';
        }
        if (
          backgroundImage.includes('sewagewaste') ||
          backgroundImage.includes('septicwaste')
        ) {
          return 'WasteManagementCompany';
        }

        if (hostname.includes('flood')) return 'EmergencyService';
        if (hostname.includes('cctv') || hostname.includes('survey'))
          return 'InspectionService';
        if (hostname.includes('sweep') || hostname.includes('clean'))
          return 'CleaningService';
        if (hostname.includes('pump')) return 'MaintenanceService';
        if (hostname.includes('event') || hostname.includes('festival'))
          return 'EventService';
        if (hostname.includes('waste') || hostname.includes('disposal'))
          return 'WasteManagementCompany';
        if (hostname.includes('logistics') || hostname.includes('transport'))
          return 'TransportCompany';

        return 'LocalBusiness';
      }

      if (data[hostName]) {
        const domainConfig = data[hostName];
        backgroundImageUrl = domainConfig.backgroundImage;
        document.title = `${domainConfig.title} Specialists | 24x7 support`;
        document.querySelector('.contactForm--headers h3').textContent =
          domainConfig.text;

        const companyType = determineCompanyType(hostName, backgroundImageUrl);
        const schemaMarkup = {
          '@context': 'https://schema.org',
          '@type': companyType,
          name: companyName,
          url: `https://${hostName}/`,
          logo: 'https://hydro-websites-assets.s3.eu-west-2.amazonaws.com/fatberg-fighters/logo.png',
          description: domainConfig.text,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+44-800-740-8888',
            contactType: 'Customer Service',
            email: 'enquiries@hydro-cleansing.com',
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'United Kingdom',
            addressRegion: 'London',
          },
          areaServed: 'United Kingdom',
          sameAs: [
            'https://www.facebook.com/hydrocleansingltd',
            'https://twitter.com/HydroCleansing',
            'https://www.linkedin.com/company/hydro-cleansing-ltd',
          ],
        };

        let schemaScript = document.querySelector(
          'script[type="application/ld+json"]'
        );
        if (!schemaScript) {
          schemaScript = document.createElement('script');
          schemaScript.type = 'application/ld+json';
          document.head.appendChild(schemaScript);
        }
        schemaScript.textContent = JSON.stringify(schemaMarkup, null, 2);

        document
          .querySelector('meta[name="description"]')
          .setAttribute('content', domainConfig.text);
        document
          .querySelector('meta[property="og:title"]')
          .setAttribute('content', `${companyName} | Contact Us`);
        document
          .querySelector('meta[property="og:description"]')
          .setAttribute('content', domainConfig.text);
        document
          .querySelector('meta[property="og:url"]')
          .setAttribute('content', `https://${hostName}/`);
        document
          .querySelector('meta[name="twitter:title"]')
          .setAttribute('content', `${companyName} | Contact Us`);
        document
          .querySelector('meta[name="twitter:description"]')
          .setAttribute('content', domainConfig.text);
      } else {
        backgroundImageUrl = 'url(/images/liquidwaste.jpg)';
        document.querySelector('.contactForm--headers h3').textContent =
          'Are you interested in working together?';
      }

      const img = new Image();
      img.onload = function () {
        container.style.backgroundImage = backgroundImageUrl;
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
