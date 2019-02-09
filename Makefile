.PHONY: \
  dev start \
  build production \
  lint prettier lint-fix jest test \
  make-migration migrate rollback

default: dev

install:
	npm install
	npx npm-merge-driver install -g

################################################################################

# Starts the server in development mode, restarting when changes detected.
dev:
	npx nodemon --exec ts-node server/

# Starts the server in development mode.
start:
	npx ts-node server/

################################################################################

build:
	npx next build ./client

clean:
	rm -rf client/.next

production:
	npx ts-node -T server

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
	npx knex migrate:make

# Migrate the database to the latest migration.
migrate:
	npx knex migrate:latest

# Roll back the database to before the latest mgiration.
rollback:
	npx knex migrate:rollback

seed:
	npx knex seed:run --knexfile knexfile.ts
