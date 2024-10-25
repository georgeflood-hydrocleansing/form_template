$(document).ready(function () {
  // Define a custom 'pattern' method for jQuery Validate
  $.validator.addMethod(
    'pattern',
    function (value, element, param) {
      if (this.optional(element)) {
        return true;
      }
      if (typeof param === 'string') {
        param = new RegExp(param);
      }
      return param.test(value);
    },
    'Please check your input.'
  );

  // Initialize form validator
  const validator = $('#form').validate({
    // Define validation rules
    rules: {
      name: {
        required: true,
        minlength: 2,
        pattern: '^[a-zA-Z\\s]+$',
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        pattern: '^(\\+44\\s?7\\d{3}|\\(?07\\d{3}\\)?)\\s?\\d{3}\\s?\\d{3}$',
      },
    },
    // Define validation error messages
    messages: {
      name: {
        required: 'Please enter your name',
        minlength: 'Name must be at least 2 characters long',
        pattern: 'The name can only consist of letters and spaces',
      },
      email: {
        required: 'Please enter your email',
        email: 'Please enter a valid email address',
      },
      phone: {
        required: 'Please enter your phone number',
        pattern: 'Please enter a valid UK phone number',
      },
    },
    // Customize error placement
    errorPlacement: function (error, element) {
      error.addClass('error');
      error.appendTo(element.closest('.form-field'));
    },
    // Highlight invalid fields
    highlight: function (element) {
      $(element).closest('.form-field').addClass('has-error');
    },
    // Unhighlight valid fields
    unhighlight: function (element) {
      $(element).closest('.form-field').removeClass('has-error');
    },
  });

  // Handle form submission
  $('#form').on('submit', function (e) {
    e.preventDefault();

    // Check if the form is valid
    if ($(this).valid()) {
      // If valid, trigger animation then submit
      animateButton(
        $('#submitButton'),
        function () {
          this.submit();
        }.bind(this)
      );
    }
    // If invalid, validation errors will be shown automatically
  });

  /**
   * Function to handle GSAP animations on the button
   * @param {jQuery Object} button - The submit button as a jQuery object
   * @param {Function} callback - A callback function to execute after animation
   */
  function animateButton(button, callback) {
    if (!button.hasClass('active')) {
      button.addClass('active');

      // GSAP Animation sequence
      gsap
        .timeline({
          onComplete: function () {
            button.removeClass('active');
            if (typeof callback === 'function') {
              callback();
            }
          },
        })
        .to(button, {
          duration: 0.2,
          '--left-wing-first-x': 50,
          '--left-wing-first-y': 100,
          '--right-wing-second-x': 50,
          '--right-wing-second-y': 100,
          onComplete: function () {
            gsap.set(button, {
              '--left-wing-first-y': 0,
              '--left-wing-second-x': 40,
              '--left-wing-second-y': 100,
              '--left-wing-third-x': 0,
              '--left-wing-third-y': 100,
              '--left-body-third-x': 40,
              '--right-wing-first-x': 50,
              '--right-wing-first-y': 0,
              '--right-wing-second-x': 60,
              '--right-wing-second-y': 100,
              '--right-wing-third-x': 100,
              '--right-wing-third-y': 100,
              '--right-body-third-x': 60,
            });
          },
        })
        .to(button, {
          duration: 0.2,
          '--left-wing-third-x': 20,
          '--left-wing-third-y': 90,
          '--left-wing-second-y': 90,
          '--left-body-third-y': 90,
          '--right-wing-third-x': 80,
          '--right-wing-third-y': 90,
          '--right-body-third-y': 90,
          '--right-wing-second-y': 90,
        })
        .to(button, {
          duration: 0.25,
          '--rotate': 50,
          '--left-wing-third-y': 95,
          '--left-wing-third-x': 27,
          '--right-body-third-x': 45,
          '--right-wing-second-x': 45,
          '--right-wing-third-x': 60,
          '--right-wing-third-y': 83,
        })
        .to(button, {
          duration: 0.2,
          '--rotate': 55,
          '--plane-x': -8,
          '--plane-y': 24,
        })
        .to(button, {
          duration: 0.3,
          '--rotate': 40,
          '--plane-x': 45,
          '--plane-y': -180,
          '--plane-opacity': 0,
          onComplete: function () {
            gsap.to(button, {
              duration: 0.3,
              opacity: 1,
              y: 0,
              clearProps: 'all',
            });
          },
        });

      // Animate button style changes
      gsap
        .timeline()
        .to(button, {
          duration: 0.1,
          '--text-opacity': 0,
          '--border-radius': 0,
          '--left-wing-background': '#cc532f',
          '--right-wing-background': '#cc532f',
        })
        .to(button, {
          duration: 0.1,
          '--left-wing-background': '#ff6b3d',
          '--right-wing-background': '#ff6b3d',
        })
        .to(button, {
          duration: 0.4,
          '--left-body-background': '#e55f36',
          '--right-body-background': '#cc532f',
        })
        .to(button, {
          duration: 0.25,
          '--success-opacity': 1,
          '--success-scale': 1,
          delay: 0.25,
        });
    }
  }
});

$(document).ready(function () {
  gsap.set('.contactForm--headers h2', { opacity: 0 });
  gsap.set('.contactForm--headers h3', { opacity: 0 });

  const mainTL = gsap.timeline();

  mainTL
    .to('.contactForm--headers h2', {
      opacity: 1,
      duration: 0.3,
    })
    .from('.contactForm--headers h2', {
      duration: 0.3,
      text: {
        value: '',
        delimiter: '',
      },
      ease: 'none',
    })
    .to('.contactForm--headers h3', {
      opacity: 1,
      duration: 0.3,
    })
    .from('.contactForm--headers h3', {
      duration: 0.3,
      text: {
        value: '',
        delimiter: '',
      },
      ease: 'none',
    })
    .from('.form-field', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.2,
      ease: 'power2.out',
    })
    .from('.button', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.out',
    });
});
