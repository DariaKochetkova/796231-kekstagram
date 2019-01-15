'use strict';

(function () {
  window.utils = {
    Effect: {
      CHROME: 'grayscale',
      SEPIA: 'sepia',
      MARVIN: 'invert',
      PHOBOS: 'blur',
      HEAT: 'brightness'
    },
    EffectDepthMax: {
      CHROME: 1,
      SEPIA: 1,
      MARVIN: 100,
      PHOBOS: 3,
      HEAT: 3
    },

    EffectDepthMin: {
      CHROME: 0,
      SEPIA: 0,
      MARVIN: 0,
      PHOBOS: 0,
      HEAT: 1
    },
    EffectString: {
      CHROME: '',
      SEPIA: '',
      MARVIN: '%',
      PHOBOS: 'px',
      HEAT: ''
    },
    PIC_SIZE_DEFAULT: 100,
    ESC_KEYCODE: 27,
    SUCCESS_CODE: 200
  };
})();
