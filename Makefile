
.DEFAULT_GOAL := build

brew:
	brew install node

install:
	npm install typescript --save-dev
	npm install ts-node --save-dev
	npm install @types/node --save-dev
	npm install @grpc/grpc-js
	npm install grpc-tools
	

clean:
	rm -rf dist/
	rm -rf tmp/
	rm -f coverage/
	rm -f result.json

init-dependency:
	npm install typescript --save-dev
	npm install ts-node --save-dev
	npm install @types/node --save-dev
	npm install @grpc/grpc-js
	npm install protobufjs

mod:
	npm install
	npm dedupe

# Generate TypeScript definitions from .proto files
protoc:
	grpc_tools_node_protoc \
		--js_out=import_style=commonjs,binary:src/proto \
		--grpc_out=grpc_js:src/proto \
		--ts_out=src/proto \
		--proto_path=proto/v1 \
		proto/v1/*.proto

check:
	npx eslint src/**/*.ts --quiet

lint:
	npx eslint src/**/*.ts --fix
	npx prettier --write src/**/*.ts

# disallow any parallelism (-j) for Make. This is necessary since some
# commands during the build process create temporary files that collide
# under parallel conditions.
.NOTPARALLEL:

.PHONY: clean mod lint lint-fix