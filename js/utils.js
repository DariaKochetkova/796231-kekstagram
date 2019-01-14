'use strict';

(function () {
  window.utils = {
    Effect: {
      chrome: 'grayscale',
      sepia: 'sepia',
      marvin: 'invert',
      phobos: 'blur',
      heat: 'brightness'
    },
    EffectDepthMax: {
      chrome: 1,
      sepia: 1,
      marvin: 100,
      phobos: 3,
      heat: 3
    },

    EffectDepthMin: {
      chrome: 0,
      sepia: 0,
      marvin: 0,
      phobos: 0,
      heat: 1
    },
    EffectString: {
      chrome: '',
      sepia: '',
      marvin: '%',
      phobos: 'px',
      heat: ''
    },
    PIC_SIZE_DEFAULT: 100,
    ESC_KEYCODE: 27
  };
})();
