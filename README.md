# Weather PWA

This project is an attempt to show how easy it is to convert a standard web application into PWA, and enjoy the benefits of using service angular service workers and PWA.

## How to run it

Application is integrated with Angular CLI. To run it, first create a production build by running `ng build --prod` from inside the project directory. Then, to serve it over HTTP, use an external http server instead of `ng serve`. I recommend using http-server. To install http-server run `npm i -g http-server` and then `http-server -c-1` from the `dist/weather-pwa` directory.

## Branches

In case you want to create your own PWA from scratch, start with `work` branch. It contains a standard Angular web application, ready be converted into a PWA.
If case you get lost, please check out branches `pwa-step-x` where x should be a number from 1 to 4. 

## What's implemented

The most recent version is on the `master` branch. It supports:
- Storing previously selected cities in IndexedDB (localForage)
- Caching the app-shell by the Angular Service Worker
- Intercepting requests to the YAHOO! Weather API and caching the results for further offline usage
- Displaying "Add to home button" popup on mobile devices

## Check it out

If you want to test how the application works, it's available on [Firebase](https://geekweeks-weather-pwa.firebaseapp.com/)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
