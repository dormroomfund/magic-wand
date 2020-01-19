NPX = npx

.PHONY: \
  dev start \
  build production \
  lint prettier lint-fix jest test \
  make-migration migrate rollback

default: dev

install:
	npm install
	$(NPX) npm-merge-driver install -g

################################################################################

# Starts the server in development mode, restarting when changes detected.
# TODO: Check if style variables have changed and regenerate.
dev:
	npx nodemon --exec ts-node server/

dev-debug:
	DEBUG=knex:query LOGLEVEL=debug npx nodemon --exec ts-node server/

# Starts the server in development mode.
start: style-variables
	$(NPX) ts-node server/

style-variables:
	$(NPX) scss-to-json client/stylesheets/_colors.scss > client/stylesheets/colors.json

################################################################################

build:
	$(NPX) next build ./client

clean:
	rm -rf client/.next

production:
	NODE_ENV=production $(NPX) ts-node -T server

################################################################################

# Checks for style issues.
lint: lint-js lint-sass

lint-js:
	$(NPX) eslint server client test --ext js,jsx,ts,tsx --config .eslintrc.json

lint-sass:
	$(NPX) stylelint "client/stylesheets/**/*.scss"

# Runs the TypeScript type checker.
typecheck:
	$(NPX) tsc --noEmit

# Runs a type coverage analysis of the codebase.
type-coverage:
	$(NPX) type-coverage --strict --at-least 85 --detail --cache

# Formats code to style and lint specifications.
fmt: lint-fix prettier

# Runs prettier on the codebase.
prettier:
	$(NPX) prettier --write \
		"{server,client,test}/**/*.{js,jsx,ts,tsx}" \
		"client/stylesheets/**/*.{css,sass,scss}" \
		"config/**/*.json"

# Lint, format, and fix style issues.
lint-fix: lint-fix-js lint-fix-sass

lint-fix-js:
	$(NPX) eslint --fix server client test --ext js,jsx,ts,tsx --config .eslintrc.json

lint-fix-sass:
	$(NPX) stylelint "client/stylesheets/**/*.scss" --fix

smoke:
	make production &
	$(NPX) wait-on http://localhost:3000/ -t 90000 && echo "success"


# Makes the test database
test-db:
	createdb magic_wand_test

# Runs the test suite.
# TODO: There's a stale postgres process lying around that's causing the need for this
# forceExit.
jest:
	$(NPX) jest --forceExit

# Runs Cypress CI tests
ci-cypress:
	make production > server.log 2&>1 &
	$(NPX) wait-on http://localhost:3000 -t 90000 && make cypress-run
	cat server.log

# Runts Cypress tests
cypress-run:
	$(NPX) cypress run

# Opens Cypress
cypress-open:
	$(NPX) cypress open

# Runs the full test suite.
test:
	$(NPX) jest --forceExit
	$(NPX) cypress run

################################################################################

# Initialize the database for CI
# NOTE: We should create two different databases as the smoke test will test the production setup
# 		whereas jest will set NODE_ENV=test and use the testing database.
ci-database:
	createdb -U postgres -h 0.0.0.0 magic_wand
	createdb -U postgres -h 0.0.0.0 magic_wand_test
	make migrate-ci
	make seed

# Migrate the production and test database to the latest migration.
migrate-ci:
	$(NPX) knex migrate:latest --knexfile knexfile.ts
	$(NPX) knex migrate:latest --knexfile test/testdb_knexfile.ts

# Migrate just the production database
migrate:
	$(NPX) knex migrate:latest --knexfile knexfile.ts

# Roll back the product and test database to before the latest mgiration.
migrate-rollback:
	$(NPX) knex migrate:rollback --knexfile knexfile.ts

seed:
	$(NPX) knex seed:run --knexfile knexfile.ts
