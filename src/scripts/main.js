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
  var gifs = deck.slides.map(function (slide) {
    return [].slice.call(slide.querySelectorAll('x-gif'), 0);
  });

  var setStopped = function (stopped) {
    return function (slide) {
      gifs[slide.index].map(function (gif) {
        gif.stopped = stopped;
        slide.slide.classList.remove('x-gif-finished');
        if (!stopped) gif.addEventListener('x-gif-finished', function () {
          slide.slide.classList.add('x-gif-finished');
        })
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

  window.addEventListener('resize', function () {
    [].forEach.call(document.querySelectorAll('x-gif'), function (elem) {
      elem.relayout();
    });
  })
})
