(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("flotter", [], factory);
	else if(typeof exports === 'object')
		exports["flotter"] = factory();
	else
		root["flotter"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/flotter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/flotter.css":
/*!*************************!*\
  !*** ./src/flotter.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://flotter/./src/flotter.css?");

/***/ }),

/***/ "./src/flotter.js":
/*!************************!*\
  !*** ./src/flotter.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\n__webpack_require__(/*! ./flotter.css */ \"./src/flotter.css\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar libraryName = 'flotter';\nvar libraryClassNames = {\n  content: libraryName + '__content',\n  popup: libraryName + '__popup',\n  rectangle: libraryName + '__rectangle',\n  title: libraryName + '__title',\n  quentin: libraryName + '__title_quentin',\n  watchNow: libraryName + '__watch-now',\n  backgroundDark: libraryName + '__background_dark',\n  player: libraryName + '__player',\n  iframePlayer: libraryName + '__iframe-player',\n  iframePlayerLoading: libraryName + '__iframe-player_loading',\n  preloaderVideo: libraryName + '__preloader-video',\n  close: libraryName + '-close',\n  closeIcon: libraryName + '-close__icon'\n};\nvar defaultOptions = {\n  className: 'flotter',\n  youtubeUrl: '',\n  backgroundImage: '',\n  titleText: ''\n};\n\nvar Flotter = function () {\n  function Flotter(element, userOptions) {\n    _classCallCheck(this, Flotter);\n\n    this.id = 'flotter-' + new Date().valueOf();\n    this.offsetTop = 0;\n    this.loadBackground = false;\n    this.element = element;\n    this.options = this._simpleOptions(defaultOptions, userOptions);\n    this.onInit = this.options.onInit;\n    this.watchNowBtn = this._createWatchNowBtn();\n    this.popupContent = this._createContentPopup();\n    this.container = this._createContainer();\n\n    Flotter.instances.push(this);\n\n    this._insertWrapPopup();\n\n    this._init();\n  }\n\n  _createClass(Flotter, [{\n    key: '_simpleOptions',\n\n\n    /* private methods */\n\n    value: function _simpleOptions(defaultOpt, userOptions) {\n      var opt = {};\n\n      for (var key in defaultOpt) {\n        if (defaultOpt.hasOwnProperty(key)) {\n          opt[key] = defaultOpt[key];\n        }\n      }\n      for (var _key in userOptions) {\n        if (userOptions.hasOwnProperty(_key)) {\n          if (_key === 'className') {\n            var classList = userOptions[_key].split(' ');\n            classList.push(this.options.className);\n            opt[_key] = classList.join(' ');\n\n            continue;\n          }\n          opt[_key] = userOptions[_key];\n        }\n      }\n\n      return opt;\n    }\n  }, {\n    key: '_createContainer',\n    value: function _createContainer() {\n      var container = document.createElement('div');\n      container.setAttribute('class', libraryName);\n\n      container.insertAdjacentElement('beforeend', this.popupContent);\n\n      return container;\n    }\n  }, {\n    key: '_createContentPopup',\n    value: function _createContentPopup() {\n      var contentPopup = document.createElement('div');\n      var childElements = [this._createRectangle(), this._createTitle(), this.watchNowBtn];\n\n      contentPopup.setAttribute('class', libraryClassNames.content);\n\n      childElements.forEach(function (element) {\n        contentPopup.insertAdjacentElement('beforeend', element);\n      });\n\n      return contentPopup;\n    }\n  }, {\n    key: '_createRectangle',\n    value: function _createRectangle() {\n      var rectangle = document.createElement('div');\n      rectangle.classList.add(libraryClassNames.rectangle);\n\n      return rectangle;\n    }\n  }, {\n    key: '_createTitle',\n    value: function _createTitle() {\n      var htmlTitle = this.options.titleText.replace('<quentin>', '<span class=\"' + libraryClassNames.quentin + '\">').replace('</quentin>', '</span>');\n\n      var title = document.createElement('div');\n      title.classList.add(libraryClassNames.title);\n      title.insertAdjacentHTML('beforeend', htmlTitle);\n\n      return title;\n    }\n  }, {\n    key: '_createWatchNowBtn',\n    value: function _createWatchNowBtn() {\n      var svg = '\\n      <svg width=\"41\" height=\"30\" viewBox=\"0 0 41 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.4002 21.4289V8.57112L27.0514 15.0005L16.4002 21.4289ZM40.1437 4.68482C39.6715 2.84149 38.2827 1.38874 36.5183 0.89617C33.3215 0 20.5 0 20.5 0C20.5 0 7.67959 0 4.48175 0.89617C2.71728 1.38874 1.32854 2.84149 0.857324 4.68482C0 8.02647 0 15.0005 0 15.0005C0 15.0005 0 21.9735 0.857324 25.3163C1.32854 27.1596 2.71728 28.6123 4.48175 29.1049C7.67959 30 20.5 30 20.5 30C20.5 30 33.3215 30 36.5183 29.1049C38.2827 28.6123 39.6715 27.1596 40.1437 25.3163C41 21.9735 41 15.0005 41 15.0005C41 15.0005 41 8.02647 40.1437 4.68482Z\" fill=\"#FFDF37\"/>\\n      </svg>';\n      var button = document.createElement('button');\n      button.classList.add(libraryClassNames.watchNow);\n      button.setAttribute('type', 'button');\n      button.setAttribute('title', 'Open popup');\n\n      button.insertAdjacentHTML('beforeend', svg);\n\n      return button;\n    }\n  }, {\n    key: '_insertWrapPopup',\n    value: function _insertWrapPopup() {\n      this.element.setAttribute('id', this.id);\n      this.element.setAttribute('data-video-url', this.options.youtubeUrl);\n      this.element.insertAdjacentElement('beforeend', this.container);\n\n      this.offsetTop = this.element.getBoundingClientRect().top + document.body.scrollTop;\n    }\n  }, {\n    key: '_init',\n    value: function _init() {\n      if (this.onInit && typeof this.onInit === 'function') {\n        this.onInit();\n      }\n    }\n  }], [{\n    key: 'init',\n    value: function init(element, userOptions) {\n      this.createInstance(element, userOptions);\n\n      if (!Flotter.eventsActivated) {\n        Flotter.eventsActivated = true;\n        this.addEvents();\n      }\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy(element) {\n      var elementId = element.id;\n\n      Flotter.instances = Flotter.instances.filter(function (instance) {\n        if (instance.id === elementId) {\n          element.removeAttribute('id');\n          element.removeChild(instance.container);\n        } else {\n          return true;\n        }\n      });\n\n      if (!Flotter.instances.length) {\n        Flotter.eventsActivated = false;\n        this.removeEvents();\n      }\n\n      Flotter.isOpenPopUp = false;\n    }\n  }, {\n    key: 'createInstance',\n    value: function createInstance(element, userOptions) {\n      var data = element[libraryName];\n\n      // Create a new instance.\n      if (!data) {\n        data = new Flotter(element, userOptions);\n        element[libraryName] = data;\n      }\n    }\n  }, {\n    key: 'addEvents',\n    value: function addEvents() {\n      document.addEventListener('DOMContentLoaded', this.eventCheckBackground);\n      document.addEventListener('click', this.eventDocumentClick);\n      document.addEventListener('keyup', this.eventDocumentKeyUp, true);\n      document.addEventListener('focus', this.eventFocus, true);\n      window.addEventListener('scroll', this.eventScroll);\n      window.addEventListener('resize', this.eventResize);\n    }\n  }, {\n    key: 'removeEvents',\n    value: function removeEvents() {\n      document.removeEventListener('DOMContentLoaded', this.eventCheckBackground);\n      document.removeEventListener('click', this.eventDocumentClick);\n      document.removeEventListener('keyup', this.eventDocumentKeyUp);\n      document.removeEventListener('focus', this.eventFocus);\n      window.removeEventListener('scroll', this.eventScroll);\n      window.removeEventListener('resize', this.eventResize);\n    }\n  }, {\n    key: 'eventDocumentClick',\n    value: function eventDocumentClick(event) {\n      var target = event.target;\n      var ancestor = target.closest('[id^=\"flotter-\"]');\n\n      if (ancestor) {\n        var targetAncestor = document.querySelector('#' + ancestor.id);\n\n        if (target.closest('.' + libraryClassNames.watchNow)) {\n          Flotter.windowSize = {\n            y: window.pageYOffset,\n            x: window.pageXOffset\n          };\n          Flotter.isOpenPopUp = true;\n          document.body.insertAdjacentElement('beforeend', Flotter.createPopup(targetAncestor));\n        }\n      }\n\n      if (target.closest('.' + libraryClassNames.close)) {\n        Flotter.isOpenPopUp = false;\n        document.body.querySelector('.' + libraryClassNames.popup).remove();\n      }\n    }\n  }, {\n    key: 'createPopup',\n    value: function createPopup(element) {\n      var popup = document.createElement('div');\n      popup.classList.add(libraryClassNames.popup);\n\n      popup.setAttribute('aria-modal', 'true');\n      popup.setAttribute('role', 'dialog');\n\n      popup.insertAdjacentElement('beforeend', this.createBackgroundDark());\n      popup.insertAdjacentElement('beforeend', this.createPlayer(element));\n\n      return popup;\n    }\n  }, {\n    key: 'createPlayer',\n    value: function createPlayer(element) {\n      var player = document.createElement('div');\n      var iframeYoutube = document.createElement('iframe');\n      var preloaderHTML = '<div class=\"' + libraryClassNames.preloaderVideo + '\"><div></div><div></div><div></div><div></div></div>';\n      var initialUrlYouTube = 'https://www.youtube.com/embed/';\n      var urlVideo = element.dataset.videoUrl;\n      var urlParams = void 0;\n      try {\n        var userYouTubeUrl = new URL(urlVideo);\n        var urlSearch = userYouTubeUrl.search;\n        urlParams = new URLSearchParams(urlSearch);\n      } catch (error) {\n        urlParams = new URLSearchParams('?v=');\n      }\n\n      player.classList.add(libraryClassNames.player);\n\n      iframeYoutube.classList.add(libraryClassNames.iframePlayer, libraryClassNames.iframePlayerLoading);\n      iframeYoutube.setAttribute('title', 'YouTube video player');\n      iframeYoutube.setAttribute('frameborder', '0');\n      iframeYoutube.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');\n      iframeYoutube.setAttribute('allowfullscreen', '');\n      iframeYoutube.setAttribute('src', '' + initialUrlYouTube + urlParams.get('v'));\n\n      iframeYoutube.addEventListener('load', function (event) {\n        event.target.classList.remove(libraryClassNames.iframePlayerLoading);\n        document.querySelector('.' + libraryClassNames.preloaderVideo).remove();\n      });\n\n      player.insertAdjacentElement('beforeend', this.createPopupCloseBtn());\n      player.insertAdjacentElement('beforeend', iframeYoutube);\n      player.insertAdjacentHTML('beforeend', preloaderHTML);\n\n      return player;\n    }\n  }, {\n    key: 'createPopupCloseBtn',\n    value: function createPopupCloseBtn() {\n      var closeBtn = document.createElement('button');\n      var iconClose = document.createElement('span');\n\n      closeBtn.classList.add(libraryClassNames.close);\n      closeBtn.setAttribute('type', 'button');\n      closeBtn.setAttribute('title', 'Close popup');\n      closeBtn.setAttribute('aria-label', 'Close');\n\n      iconClose.classList.add(libraryClassNames.closeIcon);\n      closeBtn.insertAdjacentElement('beforeend', iconClose);\n\n      return closeBtn;\n    }\n  }, {\n    key: 'createBackgroundDark',\n    value: function createBackgroundDark() {\n      var backgroundDark = document.createElement('div');\n      backgroundDark.classList.add(libraryClassNames.backgroundDark);\n\n      return backgroundDark;\n    }\n  }, {\n    key: 'eventFocus',\n    value: function eventFocus(event) {\n      var popup = document.querySelector('.' + libraryClassNames.popup);\n\n      if (Flotter.isOpenPopUp && !popup.contains(event.target)) {\n        event.stopPropagation();\n        popup.querySelector('.' + libraryClassNames.close).focus();\n      }\n    }\n  }, {\n    key: 'eventDocumentKeyUp',\n    value: function eventDocumentKeyUp(event) {\n      var popup = document.querySelector('.' + libraryClassNames.popup);\n\n      if ('key' in event) {\n        if (event.key === 'Escape' && Flotter.isOpenPopUp) {\n          popup.remove();\n          Flotter.isOpenPopUp = false;\n        }\n      }\n    }\n  }, {\n    key: 'eventScroll',\n    value: function eventScroll() {\n      Flotter.eventCheckBackground();\n\n      if (Flotter.isOpenPopUp) {\n        window.scrollTo(Flotter.windowSize.x, Flotter.windowSize.y);\n      }\n    }\n  }, {\n    key: 'eventResize',\n    value: function eventResize() {\n      Flotter.instances.forEach(function (instance) {\n        instance.offsetTop = instance.element.getBoundingClientRect().top + document.body.scrollTop;\n      });\n    }\n  }, {\n    key: 'eventCheckBackground',\n    value: function eventCheckBackground() {\n      Flotter.instances.forEach(function (instance) {\n        if (window.pageYOffset + window.innerHeight > instance.offsetTop && !instance.loadBackground) {\n          var flotterWrap = document.querySelector('#' + instance.id).querySelector('.' + libraryName);\n          flotterWrap.style.backgroundImage = 'url(' + instance.options.backgroundImage + ')';\n\n          instance.loadBackground = true;\n        }\n      });\n    }\n  }]);\n\n  return Flotter;\n}();\n\nexports.default = Flotter;\n\n\nFlotter.version = \"1.1.0\";\nFlotter.instances = [];\nFlotter.eventsActivated = false;\nFlotter.isOpenPopUp = false;\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://flotter/./src/flotter.js?");

/***/ })

/******/ });
});