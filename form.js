$(document).ready(function () {
  // ===============================
  // Configuration
  // ===============================
  const config = {
    breakpoints: {
      mobile: 820,
    },
    timing: {
      container: 0.5,
      background: 0.6,
      content: 0.3,
      stagger: 0.08,
    },
    ease: {
      container: 'power1.inOut',
      background: 'power2.inOut',
      content: 'power2.out',
      bounce: 'back.out(1.7)',
    },
    colors: {
      primary: '#e55f36',
      hover: '#cc532f',
    },
    api: {
      endpoint: 'https://hydro-cleansing.com/api/capture-leads',
    },
  };

  const isMobile = window.innerWidth <= config.breakpoints.mobile;

  // ===============================
  // DOM Elements
  // ===============================
  const elements = {
    form: $('#form'),
    submitButton: $('#submitButton'),
    container: $('.contact--container'),
    background: $('.background--container'),
    formFields: $('.form-field input, .form-field textarea'),
    contentElements: [
      '.contactForm--headers h2',
      '.contactForm--headers h3',
      '.form-field',
      '.button',
      '.separator',
      '.cta-button',
    ],
  };

  // ===============================
  // Animation Setup
  // ===============================
  const setupInitialStates = () => {
    // Reset all animations
    gsap.set(elements.contentElements, {
      opacity: 0,
      y: 20,
      scale: 0.9,
    });

    if (!isMobile) {
      gsap.set(elements.container, {
        opacity: 0,
        x: '100%',
      });

      gsap.set(elements.background, {
        width: '0%',
      });
    }
  };

  const createMainAnimation = () => {
    const tl = gsap.timeline();

    if (isMobile) {
      return createMobileAnimation(tl);
    }
    return createDesktopAnimation(tl);
  };

  const createDesktopAnimation = (tl) => {
    // Entry animation
    tl.addLabel('start')
      .to(
        elements.background,
        {
          duration: config.timing.background,
          width: '50%',
          ease: config.ease.background,
        },
        'start'
      )
      .to(
        elements.container,
        {
          duration: config.timing.container,
          opacity: 1,
          x: '0%',
          ease: config.ease.container,
        },
        'start+=0.1'
      )

      // Content animation
      .addLabel('content', '-=0.1')
      .to(
        '.contactForm--headers h2',
        {
          duration: config.timing.content,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: config.ease.bounce,
        },
        'content'
      )
      .to(
        '.contactForm--headers h3',
        {
          duration: config.timing.content,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: config.ease.bounce,
        },
        'content+=0.1'
      )
      .to(
        '.form-field',
        {
          duration: config.timing.content,
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: config.timing.stagger,
          ease: config.ease.bounce,
        },
        'content+=0.2'
      )
      .to(
        ['.button', '.separator', '.cta-button'],
        {
          duration: config.timing.content,
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: config.timing.stagger,
          ease: config.ease.bounce,
        },
        '>-0.1'
      );

    return tl;
  };

  const createMobileAnimation = (tl) => {
    tl.to(elements.container, {
      duration: config.timing.content,
      opacity: 1,
      ease: config.ease.container,
    }).to(elements.contentElements, {
      duration: config.timing.content,
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: config.timing.stagger,
      ease: config.ease.bounce,
    });

    return tl;
  };

  // ===============================
  // Form Field Interactions
  // ===============================
  const setupFieldInteractions = () => {
    elements.formFields.each(function () {
      const field = $(this);
      const wrapper = field.closest('.form-field');
      const focusTl = gsap.timeline({ paused: true });

      focusTl.to(wrapper, {
        duration: 0.2,
        scale: 1.02,
        ease: config.ease.content,
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
      (value, element, param) => {
        if ($(element).prop('required') && !value) return false;
        return !value || new RegExp(param).test(value);
      },
      'Please check your input.'
    );

    return elements.form.validate({
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
      errorPlacement: (error, element) => {
        error.addClass('error');
        error.appendTo(element.closest('.form-field'));
      },
      highlight: (element) => {
        $(element).closest('.form-field').addClass('has-error');
      },
      unhighlight: (element) => {
        $(element).closest('.form-field').removeClass('has-error');
      },
    });
  };

  // ===============================
  // Submit Button Animation
  // ===============================
  const animateSubmitButton = (button) => {
    return new Promise((resolve) => {
      if (button.hasClass('active')) return resolve();

      button.addClass('active');

      const planeTl = gsap.timeline({
        onComplete: () => {
          button.removeClass('active');
          resolve();
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
    });
  };

  // ===============================
  // Form Submission
  // ===============================
  const handleFormSubmit = async (form) => {
    const formData = new FormData(form);

    try {
      const response = await fetch(config.api.endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status: ${response.status}`);
      }

      await Swal.fire({
        title: 'Thank you!',
        html: `If you need us urgently please call us on <br><b><a href='tel:08007408888' style='color: ${config.colors.primary}; text-decoration: none; font-size: 20px'>0800 740 8888</a></b>`,
        icon: 'success',
      });

      form.reset();
      validator.resetForm();
      $('.form-field').removeClass('has-error');
    } catch (error) {
      console.error('Submission error:', error);

      await Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        html: `Try again or contact us directly on <br><b><a href='tel:08007408888' style='color: ${config.colors.primary}; text-decoration: none; font-size: 20px'>0800 740 8888</a></b>`,
      });
    }
  };

  // ===============================
  // Initialize
  // ===============================
  const init = () => {
    setupInitialStates();
    const validator = setupFormValidation();
    setupFieldInteractions();
    createMainAnimation();

    // Form Submit Handler
    elements.form.on('submit', async function (e) {
      e.preventDefault();
      if (!$(this).valid()) return;

      await animateSubmitButton(elements.submitButton);
      await handleFormSubmit(this);
    });
  };

  init();
});
