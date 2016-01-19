## Geopositioning with D3 on mobile

![](https://raw.githubusercontent.com/maxArturo/d3_mobile/master/screenshot.png)

Because why not. In order to run this app, you need:

- [Cordova](https://cordova.apache.org/)

clone the app, then run 'npm install'. That will get you all the build dependencies so far.

The app JS gets transpiled from ES6, browserified, and moved to the right place via Gulp. run `npm watch` to get any changes packaged on the fly.

run `cordova serve` to see your changes on the browser, though this **is** a GPS project so you'd do better off to run this in an emulator. You will need a Mac for iOS, but any other system that can run the Android SDK will do as well.

`cordova run ios`
`cordova run android`
