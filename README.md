# Flotter
A simple JavaScript popup generator.

Check out the [example](http://).

## Connecting
In the `dist` folder you will find JavaScript and Css files, choose a file type convenient for you and connect to your library.

An example of connecting JavaScript:
`<script src="./flotter.min.js"></script>`

An example of connecting Css:
`<link rel="stylesheet" href="./flotter.min.css">`

## Usage

To initialize the library, you need to call the init method and pass the element in which the HTTL code will be generated, as well as an object with settings.

Example code:

```js
const element = document.querySelector('.flotter-popup');

flotter.init(element, {
  onInit: function () {
    console.log('Init popup in', element);
  },
  youtubeUrl: 'https://www.youtube.com/watch?v=jpBJ9CUMjE8&ab_channel=DexModerr',
  backgroundImage: '/background.jpg',
  titleText: 'Digestion is <quentin>the key</quentin> to overall wellness in Body, Mind and Spirit'
});
```

`onInit` - callback function will be called generating HTML code.

`youtubeUrl` - url address on video from [YouTube](https://www.youtube.com/).

`backgroundImage` - url address for background image.

`titleText` - title for the popup content block.

`<quentin>` - tag in `titleText` is used to indicate color in a different font.

## Internal APIs:

`Flotter.version` - indicates the version of the library.

`Flotter.instances` - an array for storing instances of initialized popups.

`Flotter.eventsActivated` - indicates if library events have been activated.

`Flotter.isOpenPopUp` - indicates whether the popup is open.
