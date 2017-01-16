# Hello Google Cloud!

## Prerequisites
-   Hello NodeJS

## Install Google Cloud SDK
Note that you should first install NodeJS and a NodeJS hello world
is provided which you can review before proceeding with
this example.

Using the Google Cloud is really simple. I would say simpler than using Amazon
Web Service by comparison.  You can use App Engine for deploying diverse
kinds of apps into the Google Cloud or you can use Compute Engine
for larger deployments including databases.

Deploying to App Engine is fairly bush-button simple.  App Engine
takes care of the load balancing and scaling for you and you can review
all kinds of metrics from your Developer Dashboard.

Firstly, you'll need to login to https://cloud.google.com with your Google account and
select Try It Free.

Go [here](https://cloud.google.com/nodejs/getting-started/hello-world) for the
official App Engine quick-start which will explain how to
setup an App Engine project (this is how you get a PROJECT_ID which you will
need later for deploying your app).

### For Linux (Ubuntu 16.04 LTS):
-   `apt-get install gcloud`
-   `gcloud init`
-   `gcloud config set project [PROJECT_ID]`
-   `gcloud auth login`

### For Windows (7, 10):
-   Download and run the installer from here: https://cloud.google.com/sdk
   -   PLEASE NOTE: Make sure to select "gcloud Beta Commands" to be included in the installation.
-   In Google Cloud SDK Shell, do the following:
    -   `gcloud init`
    -   `gcloud config set project [PROJECT_ID]`
    -   `gcloud auth login`

### Required Google App Engine app.yaml config file
You'll also need to create a little app.yaml file in your project directory.
We provide one with this example.  It's like two lines and ridiculously
simple so we won't say more on it except that you need it
in order to deploy your app.

### Required fields in your NodeJS package.json config file
Make sure the following fields are present:
-   `"engines" : { "node" : "6.9.2" }`
-   `"scripts": {"start": "node app.js"}`

## Using Google Cloudo SDK

### Deploy NodeJS App to Google App Engine
-   In Google Cloud SDK Shell, do the following:
    -   `cd /path/to/a/nodejs/project`
    -    `gcloud app deploy    # PLEASE NOTE: If this is your first deployment, it will take quite a while.`

### Visit the Deployed NodeJS App
Load this URL in your browser:
https://[PROJECT_ID].appspot.com
where PROJECT_ID=astral-sorter-155816
==> https://astral-sorter-155816.appspot.com
