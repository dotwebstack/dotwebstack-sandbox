# DotWebStack Sandbox

A sandbox environment to play around with the DotWebStack framework.

[![Build Status](https://travis-ci.org/dotwebstack/dotwebstack-sandbox.svg?branch=master)](https://travis-ci.org/dotwebstack/dotwebstack-sandbox)

## Usage

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
