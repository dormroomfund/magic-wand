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
dev:
	DEBUG=knex:query npx nodemon --exec ts-node server/

# Starts the server in development mode.
start:
	$(NPX) ts-node server/

################################################################################

build:
	$(NPX) next build ./client

clean:
	rm -rf client/.next

production:
	$(NPX) ts-node -T server

################################################################################

# Checks for style issues.
lint:
	$(NPX) eslint server/. client/. test/. --ext js,jsx --config .eslintrc.json

# Runs the TypeScript type checker.
typecheck:
	$(NPX) tsc --noEmit

# Runs a type coverage analysis of the codebase.
type-coverage:
	$(NPX) type-coverage --strict --at-least 50

# Runs prettier on the codebase.
prettier:
	$(NPX) prettier --write "{server,client,test}/**/*.js" "config/**/*.json"

# Lint, format, and fix style issues.
lint-fix:
	$(NPX) eslint --fix server/. client/. test/. --ext js,jsx --config .eslintrc.json

# Runs the test suite.
jest:
	$(NPX) jest

# Runs the full test suite.
test: lint jest

################################################################################

# Make a migration from template.
make-migration:
	npx knex migrate:make

# Migrate the database to the latest migration.
migrate:
	$(NPX) knex migrate:latest --knexfile knexfile.ts

# Roll back the database to before the latest mgiration.
rollback:
	$(NPX) knex migrate:rollback --knexfile knexfile.ts

seed:
	$(NPX)  knex seed:run --knexfile knexfile.ts
