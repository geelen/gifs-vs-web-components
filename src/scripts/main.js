"use strict";

bespoke.plugins.delaySrc = function (deck, options) {
  var delayedObjects = deck.slides.map(function (slide) {
    return [].slice.call(slide.querySelectorAll('[data-bespoke-delay-src]'), 0);
  });

  deck.on('activate', function (slide) {
    delayedObjects[slide.index].map(function (object) {
      object.src = object.dataset.bespokeDelaySrc;
    })
  });

  deck.on('deactivate', function (slide) {
    delayedObjects[slide.index].map(function (object) {
      object.src = "";
    })
  })
}

bespoke.from('article', {
  keys: true,
  touch: true,
  scale: true,
  hash: true,
  state: true,
  bullets: true,
  delaySrc: true
});

(function() {
  var i, image, j, matches, rules, sheet;

  if (document.styleSheets) {
    for (i = 0; i < document.styleSheets.length; ++i) {
      sheet = document.styleSheets[i];
      if (sheet.rules) {
        for (j = 0; j < sheet.rules.length; ++j) {
          rules = sheet.rules[j];
          if (rules.style && rules.style.backgroundImage) {
            matches = rules.style.backgroundImage.match(/url\((.*)\)/);
            if (matches) {
              image = new Image();
              image.src = matches[1];
            }
          }
        }
      }
    }
  }
})();
