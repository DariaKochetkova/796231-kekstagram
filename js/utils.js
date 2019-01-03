'use strict';

(function () {
  window.utils = {
    EFFECT: {
      chrome: 'grayscale',
      sepia: 'sepia',
      marvin: 'invert',
      phobos: 'blur',
      heat: 'brightness'
    },
    EFFECT_DEPTH_MAX: {
      chrome: 1,
      sepia: 1,
      marvin: 100,
      phobos: 3,
      heat: 3
    },

    EFFECT_DEPTH_MIN: {
      chrome: 0,
      sepia: 0,
      marvin: 0,
      phobos: 0,
      heat: 1
    },
    EFFECT_STRING: {
      chrome: '',
      sepia: '',
      marvin: '%',
      phobos: 'px',
      heat: ''
    },
    PIC_SIZE_DEFAULT: 100
  };
})();
