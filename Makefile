.PHONY: \
  dev start \
  build production \
  lint prettier lint-fix jest test \
  make-migration migrate rollback

default: start

install:
	npm install

################################################################################

# Starts the server in development mode, restarting when changes detected.
dev:
	npx nodemon --exec ts-node server/

# Starts the server in development mode.
start:
	npx ts-node server/

################################################################################

build:
	npx babel server --out-dir dist/server
	npx babel client --out-dir dist/client
	npx next build client

clean:
	rm -rf client/.next
	rm -rf dist/

production:
	node dist/server

################################################################################

# Checks for style issues.
lint:
	npx eslint server/. client/. test/. --ext js,jsx --config .eslintrc.json

# Runs the TypeScript type checker.
typecheck:
	npx tsc --noEmit

# Runs a type coverage analysis of the codebase.
type-coverage:
	npx type-coverage --strict --at-least 50

# Runs prettier on the codebase.
prettier:
	npx prettier --write "{server,client,test}/**/*.js" "config/**/*.json"

# Lint, format, and fix style issues.
lint-fix:
	npx eslint --fix server/. client/. test/. --ext js,jsx --config .eslintrc.json

# Runs the test suite.
jest:
	npx jest

# Runs the full test suite.
test: lint jest

################################################################################

# Make a migration from template.
make-migration:
	npx knex migrate:make --knexfile knexfile.ts

# Migrate the database to the latest migration.
migrate:
	npx knex migrate:latest --knexfile knexfile.ts

# Roll back the database to before the latest mgiration.
rollback:
	npx knex migrate:rollback --knexfile knexfile.ts

seed:
	npx knex seed:run --knexfile knexfile.ts
