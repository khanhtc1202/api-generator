# API generator

## System's features

1. Auto read mongodb's attributes
2. Auto generate CRUD API for colections in mongodb 
3. Support RESTFul API to get a complete administration interface


## System's struct

```bash
.
├── README.md
├── app
├── config
├── manager
├── template
├── app.js
├── dbtools.js   
├── gulpfile.js
└── package.json
```

1. `app`          => contain controllers, models
2. `config`       => contain config files: express, db, routes
3. `manager`    => contain administration interface files 
4. `template`      => template files to generate controllers and models
5. `app.js`       => run server
6. `dbtools.js`        => seed db from db config file
7. `gulpfile.js`  => read db to generate controllers and models file to app folder


## How to run

### Require packages

#### For `gulp` to generate file
#### For `mongodb` to connect to mongodb
#### For `mongoose` to create model
#### For `ng-admin` Support RESTFul API to get a complete administration interface


### Run system



> Install require packages

```bash
$ npm install
```
> Create and seed db

```bash
$ node dbtools
```

> Read db and generate controller and model files

```bash
$ gulp gen
```

>  Run server

```bash
$ npm start
```
or
```bash
$ node app.js
```
