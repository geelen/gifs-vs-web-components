Title slide

Qualification/joke
A tale of Web Standards & Low Colour Depth (Animated Cats | Low Resolution Cats) in 4 parts
A tale of The Past and The Future in 4 parts

Part 1 - The idea

- A couple of years ago, me and some friends came across an interesting project...
- VastImg
  - Fullscreen GIFs
  - Random one every time you refresh
  - Hours of fun
  - There was a problem
  - Anyone could add any URL to a GIF, with no moderation
  - We should all be ashamed of ourselves. W'e took something beautiful, and we 4channed it.
- GifCity - our take
  - We built a fullscreen GIF slideshow from Tumblrs
  - Grab a tumblr (here are some cool ones), it will scrape all the GIFs and start playing them back
  - Days/weeks of fun.
- DJGif - my extension
  - About 10 months later, I wanted to do something more ambitious.
  - Noticed GIFs syncing to music were pretty cool
  - Started working on the idea, here's a quick demo (show 2 or 3 GIFs synced to the beat)
- X-Gif
  - Realised the biggest challenge was to speed up/slow down GIFs arbitrarily
  - How a GIF works.
  - What it take to play it back at a normal speed. Half speed?

Part 2 - The Component

- What's in X-GIF? (part 1)

How to release it?
- Polymer! I can define a new image tag!

How do I use it?
- It's most useful when it can be interacted with
- How do I make a slider that changes the speed of the GIF?
- How can other people drop it in to their projects? What if they use Ember/React/Angular?

Part 3 - The Release

- A huge success! (stats)
- Adding Polymer as a dependency seems a little odd.
  - The polyfills are pretty invasive. Not much can be done about that, they're trying to shim the world.
  - Polymer itself brings its own ideas about component design to the table
  - I was shipping platform.js (polyfills), polymer.js & polymer.html & layout.html. That's a fair
- But the <x-gif> syntax is simply too good to compromise
- I know, Angular directives can do that! Ember components can do that! React can probably do something like that, right?
- Superficially, it should work. angular.directive('xGif'), Ember.something('x-gif'), React.something(name: 'x-gif')
- The mental models don't fit. I'll take React as an example.
- x-gif needs to run on every requestAnimationFrame. It determines which frame a GIF should be displaying. And at the moment, it toggles a data attribute on the outer element.
- Working with a Shadow DOM, like the one Polymer/WC gives you, makes it so easy to directly manipulate elements without worrying. Angular directives afford you the same functionality. But React discourages that.
- It also uses some hacks for styling, which requires direct access to the underlying element.
- The biggest problem was the conflicting mental models of the frameworks. The frameworks have opinions about structuring your app, of course, but *their* concerns were bleeding down into mine. All I wanted to do was release a new image tag! Why is an image tag worrying about playing nicely with React's Virtual DOM?

Part 4 - The Solution

- To be honest, at this point I wasn't sure what I should do. I liked my polymer component, it worked ok with Angular too, but trying to support multiple clients seemed like a stretch.
- The breakthrough came only a few weeks ago, with the release of Chrome 36 into stable. Suddenly, here was a browser (by now it's X% of the internet), that *doesn't need* any polyfills to use Web Components. I started to wonder whether I really neaded Polymer at all?
- <polymer-element name="x-gif"> becomes document.registerElement('x-gif')
- this.ready becomes createdCallback
- this.srcChanged/this.speedChanged replaced with attributeChangedCallback
- The polymer version comes to Xkb, minified and vulcanized. Without polymer, that drops to Ykb. And Zkb of that is ES6 shims because I <3 ES6 also who cares about download size anyway.
- What's awesome, is that with a couple of snippets of code, you can inject platform.js, which is Polymer's collections of shims, that get this working on browsers without full support for Web Components.
- So now I can release a custom element without _any_ dependencies on Chrome, and one well-maintained Web Components shim on the rest.
- React/ember/angular, who cares? It's an image tag. It took me a while to break the mental model of the different frameworks. But a web component is about extending the BROWSER, not the user's APPLICATION. And it feels like it's finally here.
- The communication between your application and x-gif is the EXACT same as your app and the browser. Tags, attributes, state. You're sitting there, camouflaged by the ubiquity of the DOM.

Conclusion

- Now I'm not suggesting this approach works for all components. There is a huge, huge, HUGE amount of benefit from applying some of this thinking to destructuring your app, to treating your HTML api as a declaration of intent, to isolating things as much as possible. But communicating between components using DOM STATE may not be the most appropriate technique. If you're componentising your application, use the strengths of the framework you have in place. For those components that are truly independent of the application that uses them, well dependency-free Web Components are really at our doorstep. I've done GIFs, let's do the rest. (LOL CHEESY)

Thoughts to convey:

- Dreamcode! Write the most beautiful API you can think of. Use attributes, it's literally what they're for
- Know what type of component you're writing. There's a huge difference between a core piece of application logic you want to encapsulate and reuse & something to be used by others











