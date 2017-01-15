# Hello AngularJS w/ Ionic!
The hello world demonstrates how easy it is to develop an AngularJS application
for the front-end of your product solution by using Ionic and
specifically Ionic Creator.

[Ionic](https://ionicframework.com/) is a powerful framework based on [Apache Cordova](https://cordova.apache.org/)
which homogenizes function and
look-and-feel for mobile apps and web apps across all of the major
mobile device platforms like Windows, iOS and Android as well as all of the major browsers.
This means you can have a single code base but can deploy to any device.

A few advantages of this include:
-   Faster, cheaper development (you are developing and maintaining only 1 application code base)
-   Reach the ENTIRE MARKET with your application, NOT just the Apple mobile app market, NOT just the Android mobile app market, NOT just the Windows mobile app market
-   JavaScript skills only required. You don't have to learn Java or Swift and all of the native Android and iOS frameworks.

[Ionic Creator](http://ionic.io/products/creator) is a web-based IDE created by the Ionic team which provides
a drag-and-drop GUI builder for your AngularJS applications as well as integrated
support for AngularJS scripting.

Ionic Creator currently supports AngularJS (1.x) and has not been updated to
support Angular2, so we will be doing this example on the
back of AngularJS (1.x).  Soon enough, Ionic Creator will be updated to support
the new Angular version and we can tackle learning it then.

## Install Ionic
### For Linux (Ubuntu 16.04 LTS):
`sudo npm install -g ionic`

### For Windows (7, 10):
In Git Bash terminal, run the following command:
`npm install -g ionic`

## Creating an Ionic App Project
-   Create a free account here and log in: https://creator.ionic.io/app/login
-   Click the + New Project button (select Blank template) and start drag-and-dropping GUI components
onto the iPhone displayed at center screen.

Please note that each GUI component has settings
that can be configured and the default iPhone device can be changed in an upper-left dropdown
menu to several different mobile devices including phones and tablets.

## Exporting an Ionic App Project
You can easily export your Ionic app project from Ionic Creator and download it
to your local machine and run it from there.
Go [here](http://docs.usecreator.com/docs/exporting) for the official guide.

## Running an Ionic App in the Browser
Ionic launches the JavaScript components of your Ionic application
on NodeJS under the hood, so please check out our [NodeJS Hello World](https://github.com/bdmossma/hellogit/tree/master/js/hellonodejs)
to install it before you get started with this example.

### For Windows (7, 10):
`ionic start MyIonicApp`

### For Linux (Ubuntu 16.04 LTS):
`ionic start MyIonicApp`

## Deploying an Ionic App
### Submitting to the Apple App store
Go [here](http://docs.usecreator.com/docs/submit-your-app-to-the-apple-app-store) for the official guide.

### Submitting to the Google Play Store
Go [here](http://docs.usecreator.com/docs/submit-your-app-to-the-google-play-store) for the official guide.
