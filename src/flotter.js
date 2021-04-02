import './flotter.css';

const libraryName = 'flotter';
const contentPopupClassName = 'content-popup';
const popupClassName = 'popup';
const defaultOptions = {
  className: 'flotter-wrap',
  youtubeUrl: null,
  backgroundImage: null,
  titleText: ''
};

export default class Flotter {
  constructor(element, userOptions) {
    this.id = `flotter-${new Date().valueOf()}`;
    this.element = element;
    this.options = this._simpleOptions(defaultOptions, userOptions);
    this.onInit = this.options.onInit;
    this.watchNowBtn = this._createWatchNowBtn();
    this.closePopupBtn = this._createPopupCloseBtn();
    this.popupContent = this._createContentPopup();
    this.popup = this._createPopup();
    this.container = this._createContainer();

    Flotter.instances.push(this);

    this._insertWrapPopup();

    this._init();
  }

  static init(element, userOptions) {
    this.createInstance(element, userOptions);

    if (!Flotter.eventsActivated) {
      Flotter.eventsActivated = true
      this.addEvents();
    }
  }

  static destroy(element) {
    const elementId = element.id;

    Flotter.instances = Flotter.instances.filter((instance) => {
      if (instance.id === elementId) {
        element.removeAttribute('id');
        element.removeChild(instance.container);
      } else {
        return true;
      }
    });

    if (!Flotter.instances.length) {
      Flotter.eventsActivated = false;
      this.removeEvents();
    }

    Flotter.isOpenPopUp = false;
  }

  static createInstance(element, userOptions) {
    let data = element[libraryName];

    // Create a new instance.
    if (!data) {
      data = new Flotter(element, userOptions);
      element[libraryName] = data;
    }
  }

  static addEvents() {
    document.addEventListener('click', this.eventDocumentClick);
    document.addEventListener('keyup', this.eventDocumentKeyUp);
    window.addEventListener('scroll', this.eventScroll);
  }

  static removeEvents() {
    document.removeEventListener('click', this.eventDocumentClick);
    document.removeEventListener('keyup', this.eventDocumentKeyUp);
    window.removeEventListener('scroll', this.eventScroll);
  }

  static eventDocumentClick(event) {
    const target = event.target;
    const ancestor = target.closest('[id^="flotter-"]');

    if (ancestor) {
      const targetAncestor = document.querySelector(`#${ancestor.id}`);
      const popupBlock = targetAncestor.querySelector(`.${popupClassName}`);
      const watchNowBtnSelector = `.${contentPopupClassName}__watch-now`;
      const closePopupBtnSelector = `.${popupClassName}-close`;
      const popUpOpenClassName = `${popupClassName}_open`;
      if (target.closest(watchNowBtnSelector)) {
        popupBlock.classList.add(popUpOpenClassName);
        Flotter.windowSize = {
          y: window.pageYOffset,
          x: window.pageXOffset
        };
        Flotter.isOpenPopUp = true;
      }

      if (target.closest(closePopupBtnSelector)) {
        popupBlock.classList.remove(popUpOpenClassName);
        Flotter.isOpenPopUp = false;
      }
    }
  }

  static eventDocumentKeyUp(event) {
    const focusElement = document.activeElement;
    const popupBlocks = document.querySelectorAll(`.${popupClassName}`);
    const popUpOpenClassName = `${popupClassName}_open`;

    if (!focusElement.closest(`.${popUpOpenClassName}`)) {
      popupBlocks.forEach((block) => {
        if (block.classList.contains(popUpOpenClassName)) {
          block.querySelector(`.${popupClassName}-close`).focus();
        }
      });
    }

    if ('key' in event) {
      if (event.key === 'Escape') {
        popupBlocks.forEach((block) => {
          if (block.classList.contains(popUpOpenClassName)) {
            block.classList.remove(popUpOpenClassName);
            Flotter.isOpenPopUp = false;
          }
        });
      }
    }
  }

  static eventScroll() {
    if (Flotter.isOpenPopUp) {
      window.scrollTo(Flotter.windowSize.x, Flotter.windowSize.y);
    }
  }

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
  }

  _createContainer() {
    const container = document.createElement('div');
    container.setAttribute('class', this.options.className);
    container.style.backgroundImage = `url(${this.options.backgroundImage})`;

    container.insertAdjacentElement('beforeend', this.popupContent);
    container.insertAdjacentElement('beforeend', this.popup);

    return container;
  }

  _createContentPopup() {
    const contentPopup = document.createElement('div');
    const childElements = [
      this._createRectangle(),
      this._createTitle(),
      this.watchNowBtn
    ];

    contentPopup.setAttribute('class', contentPopupClassName);

    childElements.forEach((element) => {
      contentPopup.insertAdjacentElement('beforeend', element);
    });

    return contentPopup;
  }

  _createRectangle() {
    const rectangle = document.createElement('div');
    rectangle.classList.add(`${contentPopupClassName}__rectangle`);

    return rectangle;
  }

  _createTitle() {
    const htmlTitle = this.options.titleText
      .replace('<quentin>', `<span class="${contentPopupClassName}__title_quentin-text">`)
      .replace('</quentin>', '</span>');

    const title = document.createElement('div');
    title.classList.add(`${contentPopupClassName}__title`);
    title.insertAdjacentHTML('beforeend', htmlTitle);

    return title;
  }

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
  }

  _createPopup() {
    const popup = document.createElement('div');
    popup.classList.add(popupClassName);

    popup.setAttribute('aria-modal', 'true');
    popup.setAttribute('role', 'dialog');

    popup.insertAdjacentElement('beforeend', this._createBackgroundDark());
    popup.insertAdjacentElement('beforeend', this._createPlayer());

    return popup;
  }

  _createBackgroundDark() {
    const backgroundDark = document.createElement('div');
    backgroundDark.classList.add(`${popupClassName}__background_dark`);

    return backgroundDark;
  }

  _createPlayer() {
    const player = document.createElement('div');
    const iframeYoutube = document.createElement('iframe');
    const initialUrlYouTube = 'https://www.youtube.com/embed/';
    const userYouTubeUrl = new URL(this.options.youtubeUrl);
    const urlSearch = userYouTubeUrl.search;
    const urlParams = new URLSearchParams(urlSearch);

    player.classList.add('player');

    iframeYoutube.setAttribute('title', 'YouTube video player');
    iframeYoutube.setAttribute('frameborder', '0');
    iframeYoutube.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframeYoutube.setAttribute('allowfullscreen', '');
    iframeYoutube.setAttribute('src', `${initialUrlYouTube}${urlParams.get('v')}`);

    player.insertAdjacentElement('beforeend', this.closePopupBtn);
    player.insertAdjacentElement('beforeend', iframeYoutube);

    return player;
  }

  _createPopupCloseBtn() {
    const closeBtn = document.createElement('button');
    const iconClose = document.createElement('span');

    closeBtn.classList.add('popup-close');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('title', 'Close popup');
    closeBtn.setAttribute('aria-label', 'Close');

    iconClose.classList.add(`${popupClassName}-close__icon`);
    closeBtn.insertAdjacentElement('beforeend', iconClose);

    return closeBtn;
  }

  _insertWrapPopup() {
    this.element.setAttribute('id', this.id);
    this.element.insertAdjacentElement('beforeend', this.container);
  }

  _init() {
    if (this.onInit && typeof this.onInit === 'function') {
      this.onInit();
    }
  }
}

Flotter.version = VERSION;
Flotter.instances = [];
Flotter.eventsActivated = false;
Flotter.isOpenPopUp = false;
