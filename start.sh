#!/bin/bash

ES_HOST="localhost:9200"
ES_USER="es"
ES_PASS="es"

export ES_HOST ES_USER ES_PASS

meteor --port 3033
