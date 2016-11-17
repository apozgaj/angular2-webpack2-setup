Starter pack for Angular2 with webpack2
=======================================

Starter pack includes:
- angular2 setup with webpack2 
- treeshaking + AOT compilation
- optimized build with DLLs for polyfills and vendors
- lite-server config + vscode launch configurations 

DEV Environment setup
---------------------

1. npm install
2. npm run build:dll
3. Run either: npm run compile:dev OR npm run watch:dev

PROD Environment setup
---------------------

1. npm run compile:prod
2. Find the build in build/aot

HTTP Server startup
-------------------

HTTP Server should be started in the Build/Client folder which will appear once the compilation is done.




