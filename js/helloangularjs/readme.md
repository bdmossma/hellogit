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
Ionic launches the JavaScript components of your Ionic application
on NodeJS under the hood, so please check out our [NodeJS Hello World](https://github.com/bdmossma/hellogit/tree/master/js/hellonodejs)
to install it before you get started with this example.

Ionic depends upon Cordova which depends upon Android and iOS SDKs, so naturally
all of these must be installed.  For the near term, we are showing only how to install
just the Android SDK.  (TODO: Add steps for installing iOS SDK)

PLEASE NOTE: The Android Emulator comes with the Android SDK, so this is effectively
how Ionic launches an Ionic app -- it deploys it inside of the
Android emulator or virtual device.

### For Linux (Ubuntu 16.04 LTS):
-   `sudo npm install -g ionic    # Be aware that this will take a while`
-   `npm install -g cordova       # Ionic's biggest dependency is Apache Cordova`
-   (Skip This) Download and install the latest Android SDK from here: https://developer.android.com/studio/index.html
    -   `sudo unzip android-studio-ide-<version>-linux.zip -d /opt`
    -   `cd /opt/android-studio/bin`
    -   `sudo ./studio.sh    # This will take a long time.`
-   (Skip This): Install latest JDK (Java SDK): `sudo apt-get install openjdk-8-jdk`
    -   `export JAVA_HOME=/usr/lib/jvm/java-8-openjdk`
    -   `export PATH=$PATH:/usr/lib/jvm/java-8-openjdk/bin`
    -   Verify installation: `javac -version`

### For Windows (7, 10):
In Git Bash terminal, run the following command:
-   `npm install -g ionic      # Be aware that this will take a while`
-   `npm install -g cordova    # Ionic's biggest dependency is Apache Cordova`
    -    PLEASE NOTE: Verify that `C:\npm` is added to your Path environment variable!!!
-   (Skip This) Download the latest Android SDK installer from here: https://developer.android.com/studio/index.html
    -    Run the installer.  PLEASE NOTE: This will take a long time.
    -    PLEASE NOTE: Verify that `ANROID_HOME=C:\Android\sdk` environment variable exists!!!
-   (Skip This) Download and install the latest JDK (Java SDK) from here: http://download.oracle.com/otn-pub/java/jdk/
    -    PLEASE NOTE: Verify that `JDK_HOME=C:\Program Files\Java\jdk1.8.0_111` environment variable exists!!!

## Creating an Ionic App Project in Ionic Creator
-   Create a free account here and log in: https://creator.ionic.io/app/login
-   Click the + New Project button (select Blank template) and start drag-and-dropping GUI components
onto the iPhone displayed at center screen.

Please note that each GUI component has settings
that can be configured and the default iPhone device can be changed in an upper-left dropdown
menu to several different mobile devices including phones and tablets.

## Exporting an Ionic App Project from Ionic Creator
You can easily export your Ionic app project from Ionic Creator and download it
to your local machine and run it from there.
Go [here](http://docs.usecreator.com/docs/exporting) for the official guide.

We recommend exporting as a zip and unzipping it to `/path/to/export` on your local machine.

## Creating Ionic App Project on Local Machine (using Ionic Creator export)
Do note that it is recommended to build out the GUI your Ionic app using Ionic Creator and
after that exporting it if you wish. The GUI building part of your app development greatly benefits from
using Ionic Creator.

### For Windows (7, 10) or Linux (Ubuntu 16.04 LTS):
-   `ionic start myionicsapp_v1 /path/to/export    # The last option tells ionic to use the source from the export when creating the new project`
-   `cd myionicapp_v1/www    # This holds all of the source for your Ionic app that you care about. Ignore all of the Ionic boilerplate above this subdirectory.`
-   Recommend opening the above directory in Atom IDE or your favorite text editor.  This will be the central hub for continuing your development.

## Running an Ionic App on Local Machine
### In the Browser (recommended):
-   `cd myionicapp_v1`
-   `ionic serv --address 127.0.0.1`

### In Simulator (Skip This):
-   `cd myionicapp_v1`
-   `ionic run [ios|android]    # This is a dubious step.  You may find yourself Googling deeply if an error happens.`
    -   IMPORTANT[1]: This may error out stating that wrong Android SDK is installed or that license is not accepted for the right version.
        At any rate, the needed version will be specified. Just go run `C:\Anroid\SDK\SDK Manager.exe` and install and accept
        the license agreement for everything that is selected.
    -   IMPORTANT[2]: Should print out "BUILD SUCCESSFUL" and launch Ionic app in Android emulator.


## Deploying an Ionic App
### Submitting to the Apple App Store
Go [here](http://docs.usecreator.com/docs/submit-your-app-to-the-apple-app-store) for the official guide.

### Submitting to the Google Play Store
Go [here](http://docs.usecreator.com/docs/submit-your-app-to-the-google-play-store) for the official guide.
