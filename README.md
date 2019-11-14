# magic-wand

> pipeline automation for Dorm Room Fund


## Setup and Running

Make sure you have Postgres installed already. To install:

```
$ make install
$ createdb magic_wand
$ make migrate
```

To run:

```
$ make
```

To test:

```
$ make test
```

For a full list of commands, consult the `Makefile`.

### Gotchas

If you installed Postgres via Homebrew, you may get the error 
`psql: FATAL: role “postgres” does not exist`. 
[To resolve](https://stackoverflow.com/questions/15301826/psql-fatal-role-postgres-does-not-exist#comment101477151_15309551), 
run `/usr/local/opt/postgresql/bin/createuser -s postgres`.

If you are using the latest version of node/npm, you may have linking errors with `node-sass`. This can be resolved by 
using a node version manager such as [n](https://github.com/tj/n) and downgrading (e.g. to `11.0.0`).

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
