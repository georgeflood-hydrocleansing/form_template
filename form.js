$(document).ready(function () {
  gsap.set('.contact--container', {
    opacity: 0,
    x: '100%',
  });
  gsap.set('.contactForm--headers h2', {
    opacity: 0,
    y: 20,
  });
  gsap.set('.contactForm--headers h3', {
    opacity: 0,
    y: 20,
  });
  gsap.set('.form-field', {
    opacity: 0,
    y: 20,
  });
  gsap.set('.button', {
    opacity: 0,
    y: 20,
  });

  // ===== Animation Timeline =====
  const mainTl = gsap.timeline();

  mainTl
    .to('.background--container', {
      duration: 1.2,
      width: '50%',
      ease: 'power2.inOut',
    })
    .to(
      '.contact--container',
      {
        duration: 1,
        opacity: 1,
        x: '0%',
        ease: 'power2.out',
      },
      '-=0.7'
    )
    .to('.contactForm--headers h2', {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power3.out',
    })
    .to(
      '.contactForm--headers h3',
      {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power3.out',
      },
      '-=0.4'
    )
    .to(
      '.form-field',
      {
        duration: 0.6,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.2'
    )
    .to(
      '.button',
      {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: 'power3.out',
      },
      '-=0.2'
    );

  // ===== Form Validation =====
  $.validator.addMethod(
    'pattern',
    function (value, element, param) {
      if (this.optional(element)) return true;
      return new RegExp(param).test(value);
    },
    'Please check your input.'
  );

  $('#form').validate({
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
    errorPlacement: function (error, element) {
      error.addClass('error');
      error.appendTo(element.closest('.form-field'));
    },
    highlight: function (element) {
      $(element).closest('.form-field').addClass('has-error');
    },
    unhighlight: function (element) {
      $(element).closest('.form-field').removeClass('has-error');
    },
  });

  // ===== Submit Button Animation =====
  function animateButton(button, callback) {
    if (!button.hasClass('active')) {
      button.addClass('active');

      const planeTl = gsap.timeline({
        onComplete: function () {
          button.removeClass('active');
          if (typeof callback === 'function') callback();
        },
      });

      planeTl
        .to(button, {
          duration: 0.2,
          '--left-wing-first-x': 50,
          '--left-wing-first-y': 100,
          '--right-wing-second-x': 50,
          '--right-wing-second-y': 100,
          onComplete: () => {
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
          onComplete: () => {
            gsap.to(button, {
              duration: 0.3,
              opacity: 1,
              y: 0,
              clearProps: 'all',
            });
          },
        });

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

  // ===== Form Submit Handler =====
  $('#form').on('submit', function (e) {
    e.preventDefault();
    if ($(this).valid()) {
      animateButton(
        $('#submitButton'),
        function () {
          this.submit();
        }.bind(this)
      );
    }
  });
});
