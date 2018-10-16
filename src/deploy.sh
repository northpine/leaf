#!/bin/sh
yarn build
firebase deploy --token $FIREBASE_TOKEN