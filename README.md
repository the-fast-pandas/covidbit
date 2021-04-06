# CovidBit

What is this project about

## Table of contents
* [Description](#description)
* [Prerequisites](#prerequisites)
* [Instalation](#instalation)
* [Build With](#build-with)
* [Features](#features)
* [Deployment](#deployment)
* [Issues](#issues)
* [General Reflection](#general-reflection)
* [Authors](#authors)
* [License](#license)

## Description

This is a mean stack

## Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/) (environment for all the steps of [Instalation](#instalation))
* [Atlas Account on MongoDb](https://docs.atlas.mongodb.com/getting-started/)
* [Herokku Account](https://dashboard.heroku.com/apps)

## Instalation 

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

### Angular template

Frontend components were created with [Nebula](https://akveo.github.io/nebular/), a free customizable Angular UI Library. Exceptions to this are the graphs and charts that are modules from [PrimeNg](https://www.primefaces.org/primeng/), and the tracker map generated with 

### External Services

Two external services (API) are used for data :

* News API: allows for the access of news about covid in canada. To use this service is necessary to create an [API KEY]((https://newsapi.org/) and replace it in the connection string on the method getNews() in the .ts file data.service.ts.
* Covid Data API: it uses two diffent sources for the covid official canadian data and they can be found in [here](https://api.covid19tracker.ca/docs/1.0/overview) and [here](https://opencovid.ca/api/).  

### Server


## Features

### Tracker Map
### Graphs
### News
### Email Service
### Authentication

## Deployment

This project is deploy on Heroku, a cloud based service. For this, the server and frontend were separated and depolyed as two different apps.   


## Issues 


## General Reflection


## Authors

## License
The source code for this project is licensed under the [MIT](https://choosealicense.com/licenses/mit/).

## Project Status

This project is considered complete.
