"use strict";

bespoke.plugins.delaySrc = function (deck, options) {
  var delayedObjects = deck.slides.map(function (slide) {
    return [].slice.call(slide.querySelectorAll('[data-bespoke-delay-src]'), 0);
  });

  deck.on('activate', function (slide) {
    delayedObjects[slide.index].map(function (object) {
      object.setAttribute('src', object.dataset.bespokeDelaySrc);
      requestAnimationFrame(function () {
        object.classList.add('scrolldown');
      })
    })
  });

  deck.on('deactivate', function (slide) {
    delayedObjects[slide.index].map(function (object) {
      object.setAttribute('src', '');
      object.classList.remove('scrolldown');
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
        stopped ? gif.setAttribute('stopped', '') : gif.removeAttribute('stopped');
        slide.slide.classList.remove('x-gif-finished');
        if (!stopped) gif.addEventListener('x-gif-finished', function () {
          slide.slide.classList.add('x-gif-finished');
        })
      });
    }
  };

  deck.on('activate', setStopped(false));
  deck.on('deactivate', setStopped(true));
}

bespoke.from('article', {
  keys: true,
  touch: true,
  scale: false,
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

var brightness = 0;
document.addEventListener('keyup', function (e) {
  var setBrightness = function () {
    document.querySelector('article').style.webkitFilter =
      "brightness(" + (1 + brightness) + ") contrast(" + (1 + brightness * 0.25) + ")"
  }
  if (e.shiftKey) {
    if (e.keyCode == 38) {
      brightness += 0.1;
      setBrightness(brightness);
    } else if (e.keyCode == 40) {
      brightness -= 0.1;
      setBrightness(brightness);
    } else if (e.keyCode == 48) {
      brightness = 0;
      setBrightness(brightness);
    }
  }
})
