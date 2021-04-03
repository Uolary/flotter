import './flotter.css';

const libraryName = 'flotter';
const libraryClassNames = {
  content: `${libraryName}__content`,
  popup: `${libraryName}__popup`,
  rectangle: `${libraryName}__rectangle`,
  title: `${libraryName}__title`,
  quentin: `${libraryName}__title_quentin`,
  watchNow: `${libraryName}__watch-now`,
  backgroundDark: `${libraryName}__background_dark`,
  player: `${libraryName}__player`,
  iframePlayer: `${libraryName}__iframe-player`,
  iframePlayerLoading: `${libraryName}__iframe-player_loading`,
  preloaderVideo: `${libraryName}__preloader-video`,
  close: `${libraryName}-close`,
  closeIcon: `${libraryName}-close__icon`
};
const defaultOptions = {
  className: 'flotter',
  youtubeUrl: '',
  backgroundImage: '',
  titleText: ''
};

export default class Flotter {
  constructor(element, userOptions) {
    this.id = `flotter-${new Date().valueOf()}`;
    this.offsetTop = 0;
    this.loadBackground = false;
    this.element = element;
    this.options = this._simpleOptions(defaultOptions, userOptions);
    this.onInit = this.options.onInit;
    this.watchNowBtn = this._createWatchNowBtn();
    this.popupContent = this._createContentPopup();
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
    document.addEventListener('DOMContentLoaded', this.eventCheckBackground);
    document.addEventListener('click', this.eventDocumentClick);
    document.addEventListener('keyup', this.eventDocumentKeyUp, true);
    document.addEventListener('focus', this.eventFocus, true);
    window.addEventListener('scroll', this.eventScroll);
    window.addEventListener('resize', this.eventResize);
  }

  static removeEvents() {
    document.removeEventListener('DOMContentLoaded', this.eventCheckBackground);
    document.removeEventListener('click', this.eventDocumentClick);
    document.removeEventListener('keyup', this.eventDocumentKeyUp);
    document.removeEventListener('focus', this.eventFocus);
    window.removeEventListener('scroll', this.eventScroll);
    window.removeEventListener('resize', this.eventResize);
  }

  static eventDocumentClick(event) {
    const target = event.target;
    const ancestor = target.closest('[id^="flotter-"]');

    if (ancestor) {
      const targetAncestor = document.querySelector(`#${ancestor.id}`);

      if (target.closest(`.${libraryClassNames.watchNow}`)) {
        Flotter.windowSize = {
          y: window.pageYOffset,
          x: window.pageXOffset
        };
        Flotter.isOpenPopUp = true;
        document.body.insertAdjacentElement('beforeend', Flotter.createPopup(targetAncestor));
      }
    }

    if (target.closest(`.${libraryClassNames.close}`)) {
      Flotter.isOpenPopUp = false;
      document.body.querySelector(`.${libraryClassNames.popup}`).remove();
    }
  }

  static createPopup(element) {
    const popup = document.createElement('div');
    popup.classList.add(libraryClassNames.popup);

    popup.setAttribute('aria-modal', 'true');
    popup.setAttribute('role', 'dialog');

    popup.insertAdjacentElement('beforeend', this.createBackgroundDark());
    popup.insertAdjacentElement('beforeend', this.createPlayer(element));

    return popup;
  }

  static createPlayer(element) {
    const player = document.createElement('div');
    const iframeYoutube = document.createElement('iframe');
    const preloaderHTML = `<div class="${libraryClassNames.preloaderVideo}"><div></div><div></div><div></div><div></div></div>`;
    const initialUrlYouTube = 'https://www.youtube.com/embed/';
    const urlVideo = element.dataset.videoUrl;
    let urlParams;
    try {
      const userYouTubeUrl = new URL(urlVideo);
      const urlSearch = userYouTubeUrl.search;
      urlParams = new URLSearchParams(urlSearch);
    } catch (error) {
      urlParams = new URLSearchParams('?v=');
    }

    player.classList.add(libraryClassNames.player);

    iframeYoutube.classList.add(libraryClassNames.iframePlayer, libraryClassNames.iframePlayerLoading);
    iframeYoutube.setAttribute('title', 'YouTube video player');
    iframeYoutube.setAttribute('frameborder', '0');
    iframeYoutube.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframeYoutube.setAttribute('allowfullscreen', '');
    iframeYoutube.setAttribute('src', `${initialUrlYouTube}${urlParams.get('v')}`);

    iframeYoutube.addEventListener('load', (event) => {
      event.target.classList.remove(libraryClassNames.iframePlayerLoading);
      document.querySelector(`.${libraryClassNames.preloaderVideo}`).remove();
    })

    player.insertAdjacentElement('beforeend', this.createPopupCloseBtn());
    player.insertAdjacentElement('beforeend', iframeYoutube);
    player.insertAdjacentHTML('beforeend', preloaderHTML);

    return player;
  }

  static createPopupCloseBtn() {
    const closeBtn = document.createElement('button');
    const iconClose = document.createElement('span');

    closeBtn.classList.add(libraryClassNames.close);
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('title', 'Close popup');
    closeBtn.setAttribute('aria-label', 'Close');

    iconClose.classList.add(libraryClassNames.closeIcon);
    closeBtn.insertAdjacentElement('beforeend', iconClose);

    return closeBtn;
  }

  static createBackgroundDark() {
    const backgroundDark = document.createElement('div');
    backgroundDark.classList.add(libraryClassNames.backgroundDark);

    return backgroundDark;
  }

  static eventFocus(event) {
    const popup = document.querySelector(`.${libraryClassNames.popup}`);

    if (Flotter.isOpenPopUp && !popup.contains(event.target)) {
      event.stopPropagation();
      popup.querySelector(`.${libraryClassNames.close}`).focus();
    }
  }

  static eventDocumentKeyUp(event) {
    const popup = document.querySelector(`.${libraryClassNames.popup}`);

    if ('key' in event) {
      if (event.key === 'Escape' && Flotter.isOpenPopUp) {
        popup.remove();
        Flotter.isOpenPopUp = false;
      }
    }
  }

  static eventScroll() {
    Flotter.eventCheckBackground();

    if (Flotter.isOpenPopUp) {
      window.scrollTo(Flotter.windowSize.x, Flotter.windowSize.y);
    }
  }

  static eventResize() {
    Flotter.instances.forEach((instance) => {
      instance.offsetTop = instance.element.getBoundingClientRect().top + document.body.scrollTop;
    });
  }

  static eventCheckBackground() {
    Flotter.instances.forEach((instance) => {
      if (window.pageYOffset + window.innerHeight > instance.offsetTop && !instance.loadBackground) {
        const flotterWrap = document.querySelector(`#${instance.id}`).querySelector(`.${libraryName}`);
        flotterWrap.style.backgroundImage = `url(${instance.options.backgroundImage})`;

        instance.loadBackground = true;
      }
    });
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
          classList.push(this.options.className);
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
    container.setAttribute('class', libraryName);

    container.insertAdjacentElement('beforeend', this.popupContent);

    return container;
  }

  _createContentPopup() {
    const contentPopup = document.createElement('div');
    const childElements = [
      this._createRectangle(),
      this._createTitle(),
      this.watchNowBtn
    ];

    contentPopup.setAttribute('class', libraryClassNames.content);

    childElements.forEach((element) => {
      contentPopup.insertAdjacentElement('beforeend', element);
    });

    return contentPopup;
  }

  _createRectangle() {
    const rectangle = document.createElement('div');
    rectangle.classList.add(libraryClassNames.rectangle);

    return rectangle;
  }

  _createTitle() {
    const htmlTitle = this.options.titleText
      .replace('<quentin>', `<span class="${libraryClassNames.quentin}">`)
      .replace('</quentin>', '</span>');

    const title = document.createElement('div');
    title.classList.add(libraryClassNames.title);
    title.insertAdjacentHTML('beforeend', htmlTitle);

    return title;
  }

  _createWatchNowBtn() {
    const svg = `
      <svg width="41" height="30" viewBox="0 0 41 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4002 21.4289V8.57112L27.0514 15.0005L16.4002 21.4289ZM40.1437 4.68482C39.6715 2.84149 38.2827 1.38874 36.5183 0.89617C33.3215 0 20.5 0 20.5 0C20.5 0 7.67959 0 4.48175 0.89617C2.71728 1.38874 1.32854 2.84149 0.857324 4.68482C0 8.02647 0 15.0005 0 15.0005C0 15.0005 0 21.9735 0.857324 25.3163C1.32854 27.1596 2.71728 28.6123 4.48175 29.1049C7.67959 30 20.5 30 20.5 30C20.5 30 33.3215 30 36.5183 29.1049C38.2827 28.6123 39.6715 27.1596 40.1437 25.3163C41 21.9735 41 15.0005 41 15.0005C41 15.0005 41 8.02647 40.1437 4.68482Z" fill="#FFDF37"/>
      </svg>`;
    const button = document.createElement('button');
    button.classList.add(libraryClassNames.watchNow);
    button.setAttribute('type', 'button');
    button.setAttribute('title', 'Open popup');

    button.insertAdjacentHTML('beforeend', svg);

    return button;
  }

  _insertWrapPopup() {
    this.element.setAttribute('id', this.id);
    this.element.setAttribute('data-video-url', this.options.youtubeUrl);
    this.element.insertAdjacentElement('beforeend', this.container);

    this.offsetTop = this.element.getBoundingClientRect().top + document.body.scrollTop;
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
