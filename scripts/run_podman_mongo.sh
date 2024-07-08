#!/usr/bin/env bash

# Remember to run `podman pull docker.io/mongo` before running this if you haven't already
podman run --rm -it -p 27017:27017 mongo
