/*! Bespoke.js v0.4.0 © 2014 Mark Dalgleish, Licensed MIT */
!function(a,b){var c=function(b,c){var h=1===b.nodeType?b:document.querySelector(b),i=[].filter.call(h.children,function(a){return"SCRIPT"!==a.nodeName}),j=i[0],k={},l=function(a,b){i[a]&&(q("deactivate",r(j,b)),j=i[a],i.map(m),q("activate",r(j,b)),f(j,"active"),g(j,"inactive"))},m=function(a,b){var c=b-i.indexOf(j),d=c>0?"after":"before";["before(-\\d+)?","after(-\\d+)?","active","inactive"].map(g.bind(null,a)),a!==j&&["inactive",d,d+"-"+Math.abs(c)].map(f.bind(null,a))},n=function(a,b){return arguments.length?(q("slide",r(i[a],b))&&l(a,b),void 0):i.indexOf(j)},o=function(a,b){var c=i.indexOf(j)+a;q(a>0?"next":"prev",r(j,b))&&l(c,b)},p=function(a,b){return(k[a]||(k[a]=[])).push(b),function(){k[a]=k[a].filter(function(a){return a!==b})}},q=function(a,b){return(k[a]||[]).reduce(function(a,c){return a&&c(b)!==!1},!0)},r=function(a,b){return b=b||{},b.index=i.indexOf(a),b.slide=a,b},s={on:p,fire:q,slide:n,next:o.bind(null,1),prev:o.bind(null,-1),parent:h,slides:i};f(h,"parent"),i.map(function(a){f(a,"slide")});for(var t in c){if(!e[t])throw Error("Missing plugin: "+a+"-"+t);c[t]!==!1&&e[t](s,c[t])}return l(0),d.push(s),s},d=[],e={},f=function(b,c){b.classList.add(a+"-"+c)},g=function(b,c){b.className=b.className.replace(RegExp(a+"-"+c+"(\\s|$)","g")," ").trim()},h=function(a){return function(){var b=arguments;d.map(function(c){c[a].apply(null,b)})}};b[a]={from:c,slide:h("slide"),next:h("next"),prev:h("prev"),plugins:e}}("bespoke",window);
/*! bespoke-keys v0.1.0 © 2013 Mark Dalgleish, Licensed MIT */
bespoke.plugins.keys=function(a,b){var c=b===!0||"horizontal"==b;document.addEventListener("keydown",function(b){(34==b.which||32==b.which||c&&39==b.which||!c&&40==b.which)&&a.next(),(33==b.which||c&&37==b.which||!c&&38==b.which)&&a.prev()})};
/*! bespoke-touch v0.1.0 © 2013 Mark Dalgleish, Licensed MIT */
bespoke.plugins.touch=function(a,b){var c,d,e=b===!0||"horizontal"==b?"X":"Y";a.parent.addEventListener("touchstart",function(a){1==a.touches.length&&(c=a.touches[0]["page"+e],d=0)}),a.parent.addEventListener("touchmove",function(a){1==a.touches.length&&(a.preventDefault(),d=a.touches[0]["page"+e]-c)}),a.parent.addEventListener("touchend",function(){Math.abs(d)>50&&(d>0?a.prev():a.next())})};
/*! bespoke-scale v0.2.0 © 2013 Mark Dalgleish, Licensed MIT */
!function(a){a.plugins.scale=function(a,b){var c=a.parent,d=a.slides[0],e=d.offsetHeight,f=d.offsetWidth,g="zoom"===b||"zoom"in c.style&&"transform"!==b,h=function(a){var b=document.createElement("div");return b.className="bespoke-scale-parent",c.insertBefore(b,a),b.appendChild(a),b},i=g?a.slides:a.slides.map(h),j=function(a){var b="Moz Webkit O ms".split(" ");return b.reduce(function(b,d){return d+a in c.style?d+a:b},a.toLowerCase())}("Transform"),k=g?function(a,b){b.style.zoom=a}:function(a,b){b.style[j]="scale("+a+")"},l=function(){var a=c.offsetWidth/f,b=c.offsetHeight/e;i.forEach(k.bind(null,Math.min(a,b)))};window.addEventListener("resize",l),l()}}(bespoke);
/*! bespoke-hash v0.1.2 © 2013 Mark Dalgleish, Licensed MIT */
(function(e){e.plugins.hash=function(e){var t,n=function(){var t=window.location.hash.slice(1),n=parseInt(t,10);t&&(n?r(n-1):e.slides.forEach(function(e,n){e.getAttribute("data-bespoke-hash")===t&&r(n)}))},r=function(n){n!==t&&e.slide(n)};setTimeout(function(){n(),e.on("activate",function(e){var n=e.slide.getAttribute("data-bespoke-hash");window.location.hash=n||e.index+1,t=e.index}),window.addEventListener("hashchange",n)},0)}})(bespoke);
/*! bespoke-state v0.2.2 © 2013 Mark Dalgleish, Licensed MIT */
(function(e){e.plugins.state=function(e){var t=function(t,n){var r=n.slide.getAttribute("data-bespoke-state");r&&r.split(" ").forEach(function(n){n&&e.parent.classList[t](n)})};e.on("activate",t.bind(null,"add")),e.on("deactivate",t.bind(null,"remove"))}})(bespoke);
/*! bespoke-bullets v0.2.1 © 2013 Mark Dalgleish, Licensed MIT */
(function(e){e.plugins.bullets=function(e,t){var n,r,i=e.slides.map(function(e){return[].slice.call(e.querySelectorAll(typeof t=="string"?t:"[data-bespoke-bullet]"),0)}),s=function(){var e=n+1;if(a(1))return u(n,r+1),!1;i[e]&&u(e,0)},o=function(){var e=n-1;if(a(-1))return u(n,r-1),!1;i[e]&&u(e,i[e].length-1)},u=function(e,t){n=e,r=t,i.forEach(function(n,r){n.forEach(function(n,i){n.classList.add("bespoke-bullet"),r<e||r===e&&i<=t?(n.classList.add("bespoke-bullet-active"),n.classList.remove("bespoke-bullet-inactive")):(n.classList.add("bespoke-bullet-inactive"),n.classList.remove("bespoke-bullet-active"))})})},a=function(e){return i[n][r+e]!==undefined};e.on("next",s),e.on("prev",o),e.on("slide",function(e){u(e.index,0)}),u(0,0)}})(bespoke);


/* **********************************************
     Begin prism-core.js
********************************************** */

var self = (typeof window !== 'undefined') ? window : {};

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

var _ = self.Prism = {
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content));
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o) {
			var type = _.util.type(o);

			switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					return o.slice();
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		// Insert a token before another token in a language literal
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];
			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback) {
			for (var i in o) {
				callback.call(o, i, o[i]);

				if (_.util.type(o) === 'Object') {
					_.languages.DFS(o[i], callback);
				}
			}
		}
	},

	highlightAll: function(async, callback) {
		var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1];
			grammar = _.languages[language];
		}

		if (!grammar) {
			return;
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		parent = element.parentNode;

		if (/pre/i.test(parent.nodeName)) {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent;

		if(!code) {
			return;
		}

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		_.hooks.run('before-highlight', env);

		if (async && self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = Token.stringify(JSON.parse(evt.data), language);

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language)

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
		}
	},

	highlight: function (text, grammar, language) {
		var tokens = _.tokenize(text, grammar);
		return Token.stringify(_.util.encode(tokens), language);
	},

	tokenize: function(text, grammar, language) {
		var Token = _.Token;

		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		tokenloop: for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var pattern = grammar[token],
				inside = pattern.inside,
				lookbehind = !!pattern.lookbehind,
				lookbehindLength = 0;

			pattern = pattern.pattern || pattern;

			for (var i=0; i<strarr.length; i++) { // Don’t cache length as it changes during the loop

				var str = strarr[i];

				if (strarr.length > text.length) {
					// Something went terribly wrong, ABORT, ABORT!
					break tokenloop;
				}

				if (str instanceof Token) {
					continue;
				}

				pattern.lastIndex = 0;

				var match = pattern.exec(str);

				if (match) {
					if(lookbehind) {
						lookbehindLength = match[1].length;
					}

					var from = match.index - 1 + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    len = match.length,
					    to = from + len,
						before = str.slice(0, from + 1),
						after = str.slice(to + 1);

					var args = [i, 1];

					if (before) {
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);
				}
			}
		}

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content) {
	this.type = type;
	this.content = content;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (Object.prototype.toString.call(o) == '[object Array]') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (env.type == 'comment') {
		env.attributes['spellcheck'] = 'true';
	}

	_.hooks.run('wrap', env);

	var attributes = '';

	for (var name in env.attributes) {
		attributes += name + '="' + (env.attributes[name] || '') + '"';
	}

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';

};

if (!self.document) {
	if (!self.addEventListener) {
		// in Node.js
		return self.Prism;
	}
 	// In worker
	self.addEventListener('message', function(evt) {
		var message = JSON.parse(evt.data),
		    lang = message.language,
		    code = message.code;

		self.postMessage(JSON.stringify(_.tokenize(code, _.languages[lang])));
		self.close();
	}, false);

	return self.Prism;
}

// Get current script and highlight
var script = document.getElementsByTagName('script');

script = script[script.length - 1];

if (script) {
	_.filename = script.src;

	if (document.addEventListener && !script.hasAttribute('data-manual')) {
		document.addEventListener('DOMContentLoaded', _.highlightAll);
	}
}

return self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/g,
	'prolog': /<\?.+?\?>/,
	'doctype': /<!DOCTYPE.+?>/,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
		inside: {
			'tag': {
				pattern: /^<\/?[\w:-]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[\w-]+?:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
				inside: {
					'punctuation': /=|>|"/g
				}
			},
			'punctuation': /\/?>/g,
			'attr-name': {
				pattern: /[\w:-]+/g,
				inside: {
					'namespace': /^[\w-]+?:/
				}
			}

		}
	},
	'entity': /\&#?[\da-z]{1,8};/gi
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});


/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//g,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
		inside: {
			'punctuation': /[;:]/g
		}
	},
	'url': /url\((["']?).*?\1\)/gi,
	'selector': /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
	'property': /(\b|\B)[\w-]+(?=\s*:)/ig,
	'string': /("|')(\\?.)*?\1/g,
	'important': /\B!important\b/gi,
	'punctuation': /[\{\};:]/g,
	'function': /[-a-z0-9]+(?=\()/ig
};

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/ig,
			inside: {
				'tag': {
					pattern: /<style[\w\W]*?>|<\/style>/ig,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.css
			}
		}
	});
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': {
		pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,
		lookbehind: true
	},
	'string': /("|')(\\?.)*?\1/g,
	'class-name': {
		pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/ig,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
	'boolean': /\b(true|false)\b/g,
	'function': {
		pattern: /[a-z0-9_]+\(/ig,
		inside: {
			punctuation: /\(/
		}
	},
	'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
	'operator': /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[{}[\];(),.:]/g
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
	'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
		lookbehind: true
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/ig,
			inside: {
				'tag': {
					pattern: /<script[\w\W]*?>|<\/script>/ig,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.javascript
			}
		}
	});
}


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function(){

if (!self.Prism || !self.document || !document.querySelector) {
	return;
}

var Extensions = {
	'js': 'javascript',
	'html': 'markup',
	'svg': 'markup',
	'xml': 'markup',
	'py': 'python'
};

Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function(pre) {
	var src = pre.getAttribute('data-src');
	var extension = (src.match(/\.(\w+)$/) || [,''])[1];
	var language = Extensions[extension] || extension;
	
	var code = document.createElement('code');
	code.className = 'language-' + language;
	
	pre.textContent = '';
	
	code.textContent = 'Loading…';
	
	pre.appendChild(code);
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', src, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			
			if (xhr.status < 400 && xhr.responseText) {
				code.textContent = xhr.responseText;
			
				Prism.highlightElement(code);
			}
			else if (xhr.status >= 400) {
				code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
			}
			else {
				code.textContent = '✖ Error: File does not exist or is empty';
			}
		}
	};
	
	xhr.send(null);
});

})();
Prism.languages.bash = Prism.languages.extend('clike', {
	'comment': {
		pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,
		lookbehind: true
	},
	'string': {
		//allow multiline string
		pattern: /("|')(\\?[\s\S])*?\1/g,
		inside: {
			//'property' class reused for bash variables
			'property': /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g
		}
	},
	'keyword': /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g
});

Prism.languages.insertBefore('bash', 'keyword', {
	//'property' class reused for bash variables
	'property': /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g
});
Prism.languages.insertBefore('bash', 'comment', {
	//shebang must be before comment, 'important' class from css reused
	'important': /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g
});

Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//g,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
		inside: {
			'punctuation': /[;:]/g
		}
	},
	'url': /url\((["']?).*?\1\)/gi,
	'selector': /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
	'property': /(\b|\B)[\w-]+(?=\s*:)/ig,
	'string': /("|')(\\?.)*?\1/g,
	'important': /\B!important\b/gi,
	'punctuation': /[\{\};:]/g,
	'function': /[-a-z0-9]+(?=\()/ig
};

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/ig,
			inside: {
				'tag': {
					pattern: /<style[\w\W]*?>|<\/style>/ig,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.css
			}
		}
	});
}
Prism.languages.css.selector = {
	pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
	inside: {
		'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,
		'pseudo-class': /:[-\w]+(?:\(.*\))?/g,
		'class': /\.[-:\.\w]+/g,
		'id': /#[-:\.\w]+/g
	}
};

Prism.languages.insertBefore('css', 'ignore', {
	'hexcode': /#[\da-f]{3,6}/gi,
	'entity': /\\[\da-f]{1,8}/gi,
	'number': /[\d%\.]+/g
});
(function(){

if(!window.Prism) {
	return;
}

function $$(expr, con) {
	return Array.prototype.slice.call((con || document).querySelectorAll(expr));
}

function hasClass(element, className) {
  className = " " + className + " ";
  return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1
}

var CRLF = crlf = /\r?\n|\r/g;
    
function highlightLines(pre, lines, classes) {
	var ranges = lines.replace(/\s+/g, '').split(','),
	    offset = +pre.getAttribute('data-line-offset') || 0;
	
	var lineHeight = parseFloat(getComputedStyle(pre).lineHeight);

	for (var i=0, range; range = ranges[i++];) {
		range = range.split('-');
					
		var start = +range[0],
		    end = +range[1] || start;
		
		var line = document.createElement('div');
		
		line.textContent = Array(end - start + 2).join(' \r\n');
		line.className = (classes || '') + ' line-highlight';

    //if the line-numbers plugin is enabled, then there is no reason for this plugin to display the line numbers
    if(!hasClass(pre, 'line-numbers')) {
      line.setAttribute('data-start', start);

      if(end > start) {
        line.setAttribute('data-end', end);
      }
    }

		line.style.top = (start - offset - 1) * lineHeight + 'px';

    //allow this to play nicely with the line-numbers plugin
    if(hasClass(pre, 'line-numbers')) {
      //need to attack to pre as when line-numbers is enabled, the code tag is relatively which screws up the positioning
      pre.appendChild(line);
    } else {
      (pre.querySelector('code') || pre).appendChild(line);
    }
	}
}

function applyHash() {
	var hash = location.hash.slice(1);
	
	// Remove pre-existing temporary lines
	$$('.temporary.line-highlight').forEach(function (line) {
		line.parentNode.removeChild(line);
	});
	
	var range = (hash.match(/\.([\d,-]+)$/) || [,''])[1];
	
	if (!range || document.getElementById(hash)) {
		return;
	}
	
	var id = hash.slice(0, hash.lastIndexOf('.')),
	    pre = document.getElementById(id);
	    
	if (!pre) {
		return;
	}
	
	if (!pre.hasAttribute('data-line')) {
		pre.setAttribute('data-line', '');
	}

	highlightLines(pre, range, 'temporary ');

	document.querySelector('.temporary.line-highlight').scrollIntoView();
}

var fakeTimer = 0; // Hack to limit the number of times applyHash() runs

Prism.hooks.add('after-highlight', function(env) {
	var pre = env.element.parentNode;
	var lines = pre && pre.getAttribute('data-line');
	
	if (!pre || !lines || !/pre/i.test(pre.nodeName)) {
		return;
	}
	
	clearTimeout(fakeTimer);
	
	$$('.line-highlight', pre).forEach(function (line) {
		line.parentNode.removeChild(line);
	});
	
	highlightLines(pre, lines);
	
	fakeTimer = setTimeout(applyHash, 1);
});

addEventListener('hashchange', applyHash);

})();

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
};

bespoke.plugins.steps = function (deck, options) {
  var currentSlide;
  deck.on('activate', function (e) {
    var numSteps = parseInt(e.slide.dataset.bespokeSteps);
    if (numSteps && numSteps > 1) {
      currentSlide = e.slide;
      currentSlide.dataset.bespokeStepNr = 1;
    } else {
      currentSlide = undefined;
    }
  });
  deck.on('next', function (e) {
    if (currentSlide) {
      var numSteps = parseInt(currentSlide.dataset.bespokeSteps),
        stepNr = parseInt(currentSlide.dataset.bespokeStepNr);
      if (stepNr < numSteps) {
        currentSlide.dataset.bespokeStepNr = stepNr + 1;
        return false;
      }
    }
    return true;
  })
};

bespoke.from('article', {
  keys: true,
  touch: true,
  scale: false,
  hash: true,
  state: true,
  bullets: true,
  delaySrc: true,
  startXGif: true,
  steps: true
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
