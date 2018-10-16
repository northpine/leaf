#!/bin/sh
yarn install && yarn build && firebase deploy --token $FIREBASE_TOKEN