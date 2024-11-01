$(document).ready(function () {
  // ===============================
  // Configuration
  // ===============================
  const config = {
    timing: {
      base: 0.3, // Base animation duration
      stagger: 0.05, // Time between sequential items
      overlap: 0.1, // Overlap between major sections
    },
    ease: {
      smooth: 'power2.out',
      bounce: 'back.out(1.2)',
      snappy: 'power3.out',
    },
    breakpoint: 820,
    colors: {
      primary: '#e55f36',
      hover: '#cc532f',
    },
  };

  const isMobile = window.innerWidth <= config.breakpoint;

  // ===============================
  // Animation Timeline Setup
  // ===============================
  const mainTl = gsap.timeline();

  // Set initial states
  gsap.set('.contact--container', {
    opacity: 0,
    ...(isMobile ? {} : { x: '100%' }),
  });

  gsap.set(['.contactForm--headers h2', '.contactForm--headers h3'], {
    opacity: 0,
    y: -20,
  });

  gsap.set('.form-field', {
    opacity: 0,
    y: 20,
  });

  gsap.set(['.button', '.separator', '.cta-button'], {
    opacity: 0,
    y: 20,
  });

  // ===============================
  // Build Main Animation Sequence
  // ===============================
  if (!isMobile) {
    mainTl
      // Container Entry
      .to('.background--container', {
        duration: config.timing.base,
        width: '50%',
        ease: config.ease.smooth,
      })
      .to('.contact--container', {
        duration: config.timing.base,
        opacity: 1,
        x: '0%',
        ease: config.ease.smooth,
      })
      // Headers
      .to('.contactForm--headers h2', {
        duration: config.timing.base,
        opacity: 1,
        y: 0,
        ease: config.ease.snappy,
      })
      .to(
        '.contactForm--headers h3',
        {
          duration: config.timing.base,
          opacity: 1,
          y: 0,
          ease: config.ease.snappy,
        },
        `-=${config.timing.overlap}`
      )
      // Form Fields
      .to(
        '.form-field',
        {
          duration: config.timing.base,
          opacity: 1,
          y: 0,
          stagger: config.timing.stagger,
          ease: config.ease.smooth,
        },
        `-=${config.timing.overlap}`
      )
      // Action Buttons
      .to(
        '.button',
        {
          duration: config.timing.base,
          opacity: 1,
          y: 0,
          ease: config.ease.bounce,
        },
        `-=${config.timing.overlap}`
      )
      .to(
        ['.separator', '.cta-button'],
        {
          duration: config.timing.base,
          opacity: 1,
          y: 0,
          stagger: config.timing.stagger,
          ease: config.ease.bounce,
        },
        `-=${config.timing.overlap}`
      );
  } else {
    mainTl
      .to('.contact--container', {
        duration: config.timing.base,
        opacity: 1,
        ease: config.ease.smooth,
      })
      .to(
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
          stagger: config.timing.stagger,
          ease: config.ease.smooth,
        }
      );
  }

  // ===============================
  // Interactive Animations
  // ===============================
  // Button hover effect using a paused timeline to prevent stutter
  document.querySelectorAll('.cta-button').forEach((button) => {
    const hoverTl = gsap.timeline({ paused: true });

    hoverTl
      .to(button, {
        duration: 0.2,
        scale: 1.02,
        backgroundColor: config.colors.hover,
        boxShadow: '0 4px 12px rgba(229, 95, 54, 0.2)',
        ease: config.ease.smooth,
      })
      .to(
        button.querySelector('.fa-phone'),
        {
          duration: 0.2,
          rotate: 12,
          scale: 1.1,
          ease: config.ease.smooth,
        },
        0
      );

    button.addEventListener('mouseenter', () => hoverTl.play());
    button.addEventListener('mouseleave', () => hoverTl.reverse());
  });

  // Form field focus animations
  document
    .querySelectorAll('.form-field input, .form-field textarea')
    .forEach((field) => {
      const focusTl = gsap.timeline({ paused: true });

      focusTl.to(field.closest('.form-field'), {
        duration: 0.2,
        scale: 1.01,
        ease: config.ease.smooth,
      });

      field.addEventListener('focus', () => focusTl.play());
      field.addEventListener('blur', () => focusTl.reverse());
    });

  // ===============================
  // Form Validation
  // ===============================
  const validator = $('#form').validate({
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

  // ===============================
  // Form Submission
  // ===============================
  async function submitForm(form) {
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

      if (!response.ok) throw new Error('Submission failed');

      await response.json();

      Swal.fire({
        title: 'Thank you!',
        html: `If you need us urgently please call us on <br><b><a href='tel:02086893339' style='color: #e55f36; text-decoration: none; font-size: 20px'>0208 689 3339</a></b>`,
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
        html: `Try again or contact us directly on <br><b><a href='tel:02086893339' style='color: #e55f36; text-decoration: none; font-size: 20px'>0208 689 3339</a></b>`,
      });
    }
  }

  // ===============================
  // Event Handlers
  // ===============================
  $('#form').on('submit', function (e) {
    e.preventDefault();

    if ($(this).valid()) {
      submitForm(this);
    }
  });
});
