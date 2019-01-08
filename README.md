# magic-wand

> pipeline automation for Dorm Room Fund


## Setup and Running

Make sure you have Postgres installed already. To install:

```
$ npm install
$ createdb magic_wand
$ npx knex migrate:latest
```

To run:

```
$ npm start
```

To test:

```
$ npm test
```

## Scaffolding

Use the feathers scaffolding tool to generate code:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Components

### Database

We use [objection.js](http://vincit.github.io/objection.js/) as our ORM, 
which builds on knex.js. Migrations are handled by knex.js as a result.

[Objection.js Guide](http://vincit.github.io/objection.js/)  
[Knex.js Guide](https://knexjs.org/#Migrations)  
[Knex.js Migrations Guide](https://knexjs.org/#Migrations)  

### Typechecking and Validation

We use [tcomb](https://github.com/gcanti/tcomb) to check types where useful.
