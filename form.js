$(document).ready(function () {
  // ===============================
  // Configuration
  // ===============================
  const isMobile = window.innerWidth <= 820;
  const config = {
    timing: {
      base: 0.3,
      stagger: 0.08,
      background: 0.5,
    },
    ease: {
      smooth: 'power2.out',
      bounce: 'back.out(1.7)',
      snappy: 'power3.out',
    },
    colors: {
      primary: '#e55f36',
      hover: '#cc532f',
    },
  };

  // ===============================
  // Initial States
  // ===============================
  const setupInitialStates = () => {
    if (!isMobile) {
      gsap.set('.contact--container', {
        opacity: 0,
        x: '100%',
      });
    }

    // Sequential elements start position
    gsap.set(
      [
        '.contactForm--headers h2',
        '.contactForm--headers h3',
        '.form-field',
        '.button',
        '.separator',
        '.cta-button',
      ],
      {
        opacity: 0,
        y: 20,
        scale: 0.9,
      }
    );
  };

  // ===============================
  // Main Animation Timeline
  // ===============================
  const createAnimationTimeline = () => {
    const tl = gsap.timeline();

    if (!isMobile) {
      // Desktop sequence
      tl.to('.background--container', {
        duration: config.timing.background,
        width: '50%',
        ease: config.ease.smooth,
      })
        .to(
          '.contact--container',
          {
            duration: config.timing.background,
            opacity: 1,
            x: '0%',
            ease: config.ease.smooth,
          },
          '-=0.3'
        )
        // Pop-in sequences
        .to('.contactForm--headers h2', {
          duration: config.timing.base,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: config.ease.bounce,
        })
        .to(
          '.contactForm--headers h3',
          {
            duration: config.timing.base,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: config.ease.bounce,
          },
          '-=0.15'
        )
        .to(
          '.form-field',
          {
            duration: config.timing.base,
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: config.timing.stagger,
            ease: config.ease.bounce,
          },
          '-=0.1'
        )
        .to(
          '.button',
          {
            duration: config.timing.base,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: config.ease.bounce,
          },
          '-=0.1'
        )
        .to(
          '.separator',
          {
            duration: config.timing.base,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: config.ease.bounce,
          },
          '-=0.1'
        )
        .to(
          '.cta-button',
          {
            duration: config.timing.base,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: config.ease.bounce,
          },
          '-=0.1'
        );
    } else {
      // Mobile sequence
      tl.to('.contact--container', {
        duration: config.timing.base,
        opacity: 1,
        ease: config.ease.smooth,
      }).to(
        [
          '.contactForm--headers h2',
          '.contactForm--headers h3',
          '.form-field',
          '.button',
          '.separator',
          '.cta-button',
        ],
        {
          duration: config.timing.base,
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: config.timing.stagger,
          ease: config.ease.bounce,
        }
      );
    }

    return tl;
  };

  // ===============================
  // Interactive Animations
  // ===============================
  const setupInteractions = () => {
    // Optimized CTA Button Hover
    gsap.utils.toArray('.cta-button').forEach((button) => {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(button, {
          duration: 0.2,
          scale: 1.03,
          backgroundColor: config.colors.hover,
          boxShadow: '0 4px 15px rgba(229, 95, 54, 0.3)',
          ease: config.ease.smooth,
        })
        .to(
          button.querySelector('.fa-phone'),
          {
            duration: 0.2,
            rotate: 15,
            scale: 1.2,
            ease: config.ease.smooth,
          },
          0
        );

      button.addEventListener('mouseenter', () => hoverTl.play());
      button.addEventListener('mouseleave', () => hoverTl.reverse());
    });

    // Form Field Focus
    $('.form-field input, .form-field textarea').each(function () {
      const field = $(this);
      const wrapper = field.closest('.form-field');
      const focusTl = gsap.timeline({ paused: true });

      focusTl.to(wrapper, {
        duration: 0.2,
        scale: 1.02,
        ease: config.ease.smooth,
      });

      field
        .on('focus', () => focusTl.play())
        .on('blur', () => focusTl.reverse());
    });
  };

  // ===============================
  // Form Validation
  // ===============================
  const setupFormValidation = () => {
    $.validator.addMethod(
      'pattern',
      function (value, element, param) {
        if (this.optional(element)) return true;
        return new RegExp(param).test(value);
      },
      'Please check your input.'
    );

    return $('#form').validate({
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
  };

  // ===============================
  // Submit Button Animation
  // ===============================
  const animateSubmitButton = (button, callback) => {
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
          duration: 0.2,
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
          duration: 0.2,
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
          '--left-wing-background': config.colors.hover,
          '--right-wing-background': config.colors.hover,
        })
        .to(button, {
          duration: 0.1,
          '--left-wing-background': config.colors.primary,
          '--right-wing-background': config.colors.primary,
        })
        .to(button, {
          duration: 0.2,
          '--success-opacity': 1,
          '--success-scale': 1,
        });
    }
  };

  // ===============================
  // Form Submission
  // ===============================
  const handleFormSubmit = async (form) => {
    const formData = new FormData(form);

    try {
      const response = await fetch(
        'https://hydro-cleansing.com/api/capture-leads',
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok)
        throw new Error(`Submission failed with status: ${response.status}`);

      Swal.fire({
        title: 'Thank you!',
        html: `If you need us urgently please call us on <br><b><a href='tel:08007408888' style='color: #e55f36; text-decoration: none; font-size: 20px'>0800 740 8888</a></b>`,
        icon: 'success',
      });

      form.reset();
      validator.resetForm();
      $('.form-field').removeClass('has-error');
    } catch (error) {
      console.error('Submission error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        html: `Try again or contact us directly on <br><b><a href='tel:08007408888' style='color: #e55f36; text-decoration: none; font-size: 20px'>0800 740 8888</a></b>`,
      });
    }
  };

  // ===============================
  // Initialize
  // ===============================
  setupInitialStates();
  const validator = setupFormValidation();
  setupInteractions();
  createAnimationTimeline();

  // Form Submit Handler
  $('#form').on('submit', function (e) {
    e.preventDefault();
    if ($(this).valid()) {
      animateSubmitButton($('#submitButton'), () => {
        handleFormSubmit(this);
      });
    }
  });
});
