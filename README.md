# boilerplate_MEAN

This repo is to be used for quick prototyping. This uses the MEAN stack: mongo, express, angular and node.

This also includes authentication set up for easy user authentication.


Things to replace:

-boilerplate_MEAN (references in: index.html, server.js)

-boilerApp (references in: app.js/index.html,firstController.js)

-firstController(s) (name of the file in /public/ and in /controllers/, references in: server.js/app.js/firstController.js,index.html)

-firstTemplate (name of the file in public/templates, references in: app.js)

-nameOfState (references in: app.js, index.html)

Steps to check "hello world" functionality:

-run npm install

-run mongod

-run node server.js

-should see listening on port 3000

-link to "First Test State" this will be a test of ui router

-There you should see "This is the first test state This should say 7: 7" (7 is from the firstController.js file to ensure angular is working properly)
