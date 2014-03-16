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
