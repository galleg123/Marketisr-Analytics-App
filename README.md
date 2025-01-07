# Marketisr Analytics App
This app was created for Marketisr during my intership with them.

The purpose of the app is to fetch insights data from the meta insights api.

This data it then displays in a TV screen in their office where they can get a quick overview of all their customers.

## Memory
The app uses both localstorage and cookies to store the newest data fetched from the API to avoid excessive API calls.

## Deployment
The app is build into a dockerimage which was then transfered to the system that runs the app where it is set to automatically start the app on bootup, aswell as open up the web browser with the app in it.

