# Define the paths to the source code and build artifacts
SRC_PATH=./cmd/swapscope
DIST_PATH=./dist
BUILD_PATH=./docker
DOCKERFILE_PROD=$(BUILD_PATH)/Dockerfile
DOCKERFILE_DEV=$(BUILD_PATH)/Dockerfile.dev

# Define the name of the binary and Docker image
BINARY_NAME=swapscope
DOCKER_IMAGE_NAME=swapscope

# Define the build flags for go build
BUILD_FLAGS=-ldflags="-s -w"

# Define the command for running tests
TEST_CMD=go test -race ./...

# Define the command for running the development version
DEV_CMD=go run github.com/itohio/xnotify@v0.3.1 -i .env -i internal -i pkg -i cmd --batch 100 --verbose --trigger -- go build $(SRC_PATH) -- $(DIST_PATH)/$(BINARY_NAME)

.PHONY: all
all: build

.PHONY: gen
gen:
	# Run go generate to generate any required files
	go generate ./...

.PHONY: build
build:
	# Build the production binary
	CGO_ENABLED=0 go build $(BUILD_FLAGS) -o $(DIST_PATH)/$(BINARY_NAME) $(SRC_PATH)

.PHONY: build-debug
build-debug:
	# Build the debug binary
	go build -o $(DIST_PATH)/$(BINARY_NAME) $(SRC_PATH)

.PHONY: test
test:
	$(TEST_CMD)

.PHONY: serve
serve:
	# Run the development version of the program
	$(DEV_CMD)

.PHONY: docker-build
docker-build:
	# Build the production Docker image
	docker build -f $(DOCKERFILE_PROD) -t $(DOCKER_IMAGE_NAME):latest .

.PHONY: docker-build-dev
docker-build-dev:
	# Build the development Docker image
	docker build -f $(DOCKERFILE_DEV) -t $(DOCKER_IMAGE_NAME):dev .

.PHONY: clean
clean:
	# Remove the build artifacts
	rm -rf $(DIST_PATH)

.PHONY: all-tests
all-tests: test docker-build

.PHONY: help
help:
	@echo "Makefile for building, testing, and Dockerizing a Go application"
	@echo ""
	@echo "Usage:"
	@echo "  make gen             Generate necessary files"
	@echo "  make build           Build the production binary"
	@echo "  make build-debug     Build the debug binary"
	@echo "  make test            Run all tests"
	@echo "  make serve           Run the development version of the program"
	@echo "  make docker-build    Build the production Docker image"
	@echo "  make docker-build-dev Build the development Docker image"
	@echo "  make clean           Remove build artifacts"
	@echo "  make all-tests       Run all tests and build the production Docker image"
	@echo "  make help            Display this help message"
