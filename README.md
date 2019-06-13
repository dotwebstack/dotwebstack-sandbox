# DotWebStack Sandbox

A sandbox environment to play around with the DotWebStack framework.

[![Build Status](https://travis-ci.org/dotwebstack/dotwebstack-sandbox.svg?branch=master)](https://travis-ci.org/dotwebstack/dotwebstack-sandbox)

## Usage

### Data

Put provided example data is your local triplestore at localhost:8890

### Precondition

Clone the [dotwebstack-framework](https://github.com/dotwebstack/dotwebstack-framework). Than build and install it:

```bash
mvn clean install
```

### Prepare configuration

Put your .trig configuration files in `src/main/resources/model`.

Put your OpenAPI Specification files in `src/main/resources/openapi`.

### Run

To start the application, run:

```bash
mvn spring-boot:run
```

### Try it

You can check the initial sandbox configuration with the following links:

<http://localhost:8080/dbp/ld/v1/doc/brewery/1>
<http://localhost:8080/dbp/ld/v1/id/brewery/1>
<http://localhost:8080/dbp/ld/v1/graph-breweries>
<http://localhost:8080/dbp/ld/v1/tuple-breweries>
<http://localhost:8080/dbp/ld/v1/tuple-brewery?id=1>
<http://localhost:8080/dbp/api/v1/breweries>
<http://localhost:8080/dbp/api/v1/brewery/1>