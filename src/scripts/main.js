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

bespoke.plugins.startXGif = function (deck, options) {
  var setStopped = function (stopped) {
    return function (slide) {

      window.wat = slide.slide.querySelectorAll('x-gif')
      return [].map.call(slide.slide.querySelectorAll('x-gif'), function (gif) {
        console.log(gif, stopped)
        gif.stopped = stopped;
      });
    }
  };

  deck.on('activate', setStopped(null));
  deck.on('deactivate', setStopped(true));
}

window.addEventListener('polymer-ready', function () {
  bespoke.from('article', {
    keys: true,
    touch: true,
    scale: true,
    hash: true,
    state: true,
    bullets: true,
    delaySrc: true,
    startXGif: true
  });
})
