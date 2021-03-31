import './flotter.css';

const pluginName = 'flotter';
const contentPopupClassName = 'content-popup';
const defaultOptions = {
  className: 'flotter-wrap',
  disableClassName: 'flotter_disable',
  openPopUpClassName: 'flotter_open',
  startEvent: ['mousedown', 'touchstart', 'pointerdown'],
  youtubeUrl: null,
  backgroundImage: null,
  titleText: '',
  quentinText: ''
};

export default class Flotter {
  constructor(element, userOptions) {
    this.element = element;
    this.options = this._simpleOptions(defaultOptions, userOptions);
    this.onInit = this.options.onInit;

    Flotter.instances.push(this);

    this.popup = this._createContentPopup();
    this.container = this._createContainer();

    this._insertWrapPopup();

    this._init();
  }

  static init(element, userOptions) {
    if (element.length) {
      Array.prototype.slice.call(element).forEach((el) => {
        this.createInstance(el, userOptions);
      });
    } else {
      this.createInstance(element, userOptions);
    }
  }

  static createInstance(element, userOptions) {
    let data = element[pluginName];

    // Create a new instance.
    if (!data) {
      data = new Flotter(element, userOptions);
      element[pluginName] = data;
    }
  };

  /* private methods */

  _simpleOptions(defaultOpt, userOptions) {
    const opt = {};

    for (let key in defaultOpt) {
      if (defaultOpt.hasOwnProperty(key)) {
        opt[key] = defaultOpt[key];
      }
    }
    for (let key in userOptions) {
      if (userOptions.hasOwnProperty(key)) {
        if (key === 'className') {
          let classList = userOptions[key].split(' ');
          classList.push('flotter-wrap');
          opt[key] = classList.join(' ');

          continue;
        }
        opt[key] = userOptions[key];
      }
    }

    return opt;
  };

  _createContainer() {
    const container = document.createElement('div');
    container.setAttribute('class', this.options.className);

    container.insertAdjacentElement('beforeend', this.popup);

    return container;
  };

  _createContentPopup() {
    const contentPopup = document.createElement('div');
    const childElements = [
      this._createRectangle(),
      this._createTitle(),
      this._createWatchNowBtn()
    ];

    contentPopup.setAttribute('class', contentPopupClassName);
    contentPopup.setAttribute('aria-hidden', 'false');

    childElements.forEach((element) => {
      contentPopup.insertAdjacentElement('beforeend', element);
    });

    return contentPopup;
  };

  _createRectangle() {
    const rectangle = document.createElement('div');
    rectangle.classList.add(`${contentPopupClassName}__rectangle`);

    return rectangle;
  };

  _createTitle() {
    const title = document.createElement('div');
    title.classList.add(`${contentPopupClassName}__title`);
    title.insertAdjacentText('beforeend', this.options.titleText);

    return title;
  };

  _createWatchNowBtn() {
    const svg = `
      <svg class="${contentPopupClassName}__watch-now-icon" width="41" height="30" viewBox="0 0 41 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4002 21.4289V8.57112L27.0514 15.0005L16.4002 21.4289ZM40.1437 4.68482C39.6715 2.84149 38.2827 1.38874 36.5183 0.89617C33.3215 0 20.5 0 20.5 0C20.5 0 7.67959 0 4.48175 0.89617C2.71728 1.38874 1.32854 2.84149 0.857324 4.68482C0 8.02647 0 15.0005 0 15.0005C0 15.0005 0 21.9735 0.857324 25.3163C1.32854 27.1596 2.71728 28.6123 4.48175 29.1049C7.67959 30 20.5 30 20.5 30C20.5 30 33.3215 30 36.5183 29.1049C38.2827 28.6123 39.6715 27.1596 40.1437 25.3163C41 21.9735 41 15.0005 41 15.0005C41 15.0005 41 8.02647 40.1437 4.68482Z" fill="#FFDF37"/>
      </svg>`;
    const button = document.createElement('button');
    button.classList.add(`${contentPopupClassName}__watch-now`);
    button.setAttribute('type', 'button');
    button.setAttribute('title', 'Open popup');

    button.insertAdjacentHTML('beforeend', svg);

    return button;
  };

  _insertWrapPopup() {
    this.element.insertAdjacentElement('beforeend', this.container);
  };

  _init() {
    if (this.onInit && typeof this.onInit === 'function') {
      this.onInit();
    }
  };
}

Flotter.version = VERSION;
Flotter.instances = [];
