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

# Runs the test suite.
jest:
	$(NPX) jest

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
	$(NPX) jest
	$(NPX) cypress run

################################################################################

# Initialize the database for CI
ci-database:
	createdb -U postgres -h 0.0.0.0 magic_wand
	make migrate
	make seed

# Migrate the database to the latest migration.
migrate:
	$(NPX) knex migrate:latest --knexfile knexfile.ts

# Roll back the database to before the latest mgiration.
migrate-rollback:
	$(NPX) knex migrate:rollback --knexfile knexfile.ts

seed:
	$(NPX)  knex seed:run --knexfile knexfile.ts
