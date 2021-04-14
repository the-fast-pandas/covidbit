<img src="https://github.com/the-fast-pandas/covidbit/blob/master/server/api/models/emailService/images/covidbit-logo.png?raw=true" height="100">

Template for a platform that can provide small businesses with the opportunity to advertise their businesses, safety measures, track covid-19 cases among staff and clients and be certified as a safe business. 

It also has the potential to allow the public to make well-informed decisions by giving access to official governmental data about covid-19 and to reviews of the business that they intend to visit.

## Table of contents
* [Description](#description)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Build With](#build-with)
* [Features](#features)
* [Deployment](#deployment)
* [Authors](#authors)
* [License](#license)

## Description

<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/><img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/><img alt="Angular.js" src="https://img.shields.io/badge/angular.js%20-%23E23237.svg?&style=for-the-badge&logo=angularjs&logoColor=white"/><img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>

This is a mean stack solution, a JavaScript software stack that has as its main components MongoDB, Express.js, AngularJS, and Node.js. 

MongoDB is a NoSQL database program that uses JSON-like documents with schema and because of this integrates well with JavaScript-based components. 

Express.js is a modular web application framework package for Node.js, the server-side application framework. 

And AngularJS is the client-side application framework.

## Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/) (environment for all the steps of [Instalation](#instalation))
* [Atlas Account on MongoDB](https://docs.atlas.mongodb.com/getting-started/)
* [Herokku Account](https://dashboard.heroku.com/apps)
* [Netlify Account](https://www.netlify.com/)
* [Postman](https://www.postman.com/) (optional, used for server testing)

## Installation 

<img alt="Visual Studio Code" src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?&style=for-the-badge&logo=visual-studio-code&logoColor=white"/>

On Visual Studio on a new workspace:

```
git clone https://github.com/the-fast-pandas/covidbit.git
```

### Frontend

```
cd covidbit
npm install
npm install --save-dev @angular-devkit/build-angular #this needs to be explicitally installed
```

This should make frontend ready to run:

```
ng serve   # initial setup is on PORT=4200
```

### Server

Open a new terminal window:

```
cd covidbit/server
npm install
```

This should make the local server ready to run:

```
npm start   # initial setup is on PORT=2000
```

### Database

A noSQL database needs to be created on MongoDb called covidbit with the follow collections:

* SmallBusiness
* Administrator
* Cases
* Invitations
* Safety

A connection string needs to be generated and replaced on the server .env file. You can refer to [MongoDb documentation](https://docs.mongodb.com/guides/server/drivers/) to learn how to generate one.

## Build With 

### Frontend template

Frontend components were created with [Nebula](https://akveo.github.io/nebular/), a free customizable Angular UI Library. Exceptions to this are the graphs and charts that are modules from [PrimeNg](https://www.primefaces.org/primeng/). 

Angular components are mostly written in Typescript - or Javascript with type definition - which allows for better documentation and code validation.

### External Services

Three external services are used for data :

* [News API](https://newsapi.org/): allows for the access of canadian news about covid-19 in english (this can be easily customized in the connection string). To use this service is necessary to create an API KEY and replace it in the connection string on the server [**.env** file](https://github.com/the-fast-pandas/covidbit/blob/backend/.env).

* [Covid Data API](https://opencovid.ca/api/): the API for the *COVID-19 Canada Open Data Working Group dataset*, a dedicated team of volunteers with expertise in epidemiology, public health, and data science from the University of Toronto and University of Guelph. It is used to feed the graphs with official governmental data and its data can be arranged by province and health region. This is the only external service called by the client side and its fetching methods and connection strings can be found at **app/services/api.service.ts**.

* [Geocoding API](https://developers.google.com/maps/documentation/geocoding/start): a service by google that provides geocoding and reverse geocoding of addresses. It is used to track the business addresses on the map. To use this service is necessary to create an API KEY and replace it in the connection string on the server [**.env** file](https://github.com/the-fast-pandas/covidbit/blob/backend/.env).

### Server

A server  was built using [Node.js](https://nodejs.org/en/docs/guides/getting-started-guide/) to allow communication between the frontend, database and other services. It listens to server ports using the HTTP module and gives an appropriate response back to the client. The server also host an email service created with [nodemailer](https://nodemailer.com/about/).

## Features

### Tracker Map
### Graphs

Graphs are used to display data from the covid-19 official sources (tracker-map component) and analytics (admin-dashboard). All the code necessary to process and display the data was created for this project. No other tool was used.

<img alt="graph" src="https://github.com/the-fast-pandas/covidbit/blob/master/download.png" height="200"><img alt="graph" src="https://github.com/the-fast-pandas/covidbit/blob/master/echarts.png" height="200">

### Email Service
### Authentication

## Deployment

<img alt="Heroku" src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/>

For the deployment, the server-side and client-side were separated and deployed as two different apps.

The [node.js server](https://backend-covidbit.herokuapp.com/api/status) is deployed on Heroku, a cloud-based platform. To test the working routes use **/api/route-to-test**.

The [AngularJS frontend](https://covidbit.netlify.app/home) is deployed on Netlify, another cloud-based service.

Both services support GitHub, so the base code is hosted here on two different branches: [**backend**](https://github.com/the-fast-pandas/covidbit/tree/backend) and [**covid-bit**](https://github.com/the-fast-pandas/covidbit/tree/covid-bit). Heroku and Netlify support continuous deployment, so making changes and updating the app is simple. Any updates to the code in GitHub would be immediately published on both of the cloud hosting services. 

Instructions on how to deploy your own version can be found [here](https://devcenter.heroku.com/articles/deploying-nodejs) and [here](https://www.netlify.com/blog/2019/09/23/first-steps-using-netlify-angular/).

## Authors

<img src="https://image.freepik.com/free-vector/baby-panda-waving-paw-cartoon_42750-612.jpg" width="100" height="100">

We are **The Fast Pandas**, a group of five aspiring software developers from Seneca College: *Teresa Costa*,*John Turkson*,*Valentina Derksen*,*Adilah Ismail*, and *Yevgeniya Anasheva*.

## License

The source code for this project is licensed under the [MIT](https://choosealicense.com/licenses/mit/).

## Project Status

This project was created to fulfill requisites for graduation from the CPA program and no future updates are anticipated.
