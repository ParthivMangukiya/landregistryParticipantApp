# landregistryParticipantApp

This project is a subpart of the Land Registry Trust Management System. Please visit parent repository for more information via below link

https://github.com/ParthivMangukiya/landregistryFabric.git

## Pre-requisites

This application communicates with a business network (https://github.com/ParthivMangukiya/landregistrybussiness.git) through Rest API. So it is required to have two rest server exposed at port 3000 and 3001

1. Port 3000: This server is configured as multi-user mode. It relies on GitHub access token to log in any user.
   
2. Port 3001: This server is configured to sign up any user and provide new identity.
 
# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
