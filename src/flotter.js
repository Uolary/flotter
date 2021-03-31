import './flotter.css';

const pluginName = 'flotter';
const defaultOptions = {
  className: 'flotter',
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
    this.options = this.simpleOptions(defaultOptions, userOptions);
    this.onInit = this.options.onInit;

    Flotter.instances.push(this);

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

  simpleOptions(defaultOpt, userOptions) {
    const opt = {};

    for (let key in defaultOpt) {
      if (defaultOpt.hasOwnProperty(key)) {
        opt[key] = defaultOpt[key];
      }
    }
    for (let key in userOptions) {
      if (userOptions.hasOwnProperty(key)) {
        opt[key] = userOptions[key];
      }
    }

    return opt;
  };

  /* private methods */

  _init() {
    if (this.onInit && typeof this.onInit === 'function') {
      this.onInit();
    }
  }
}

Flotter.version = VERSION;
Flotter.instances = [];
