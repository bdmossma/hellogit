# Hello NodeJS!
NodeJS is based upon the V8 JavaScript engine from the Google Chrome project.
It performs "just in time" compilation of JavaScript to machine code and consistently
outperforms other engines.

The brilliance of NodeJS is writing JavaScript in the back-end, not just in the
front-end of your product.  This allows a front-end developer who knows JavaScript
to work as a full-stack developer.

This is particularly helpful with Agile development where teams are
delivering functionality as "user stories" which are completely functional slices through the entire
product stack.

Not to mention, front-end or back-end developers are much, much easier to find than
full-stack developers.

## Install NodeJS
### For Linux (Ubuntu 16.04 LTS):
`sudo apt-get install nodejs`

### For Windows (7, 10):
Download and install NodeJS from https://nodejs.org/dist/v6.9.4/node-v6.9.4-x64.msi

### NodeJS Package Manager (npm)
When you install NodeJS, you also get `npm`, the powerful and very easy-to-use
NodeJS package manager.

In 2011, NodeJS was the most active
open-source project in github and continues to be one of the most popular, with a vibrant
developer community and untold thousands of packages being contributed all the time,
so you can use `npm` to install a package for pretty much anything
you can imagine.

Common npm commands:
-   `npm init        # steps thru creating a new nodejs project in current dir`
-   `npm install     # installs all nodejs packages specified in package.json in your project dir`
-   `npm install (package name)    # install specified nodejs package`

### NodeJS Project File
The `package.json` file is the heart of your nodejs project configuration.
It is recommended that you run `npm init` in your project directory and let it guide you through
creating your `package.json` file and specifying your chosen software license, your
git repo URL, and other configuration items.

Lastly, you can open the `package.json` file and list all of your dependencies.
It is easy to list dependencies. You can easily add new dependencies to
`package.json` as shown below. You can use a specific version or list an asterisk
to use the latest available version.

```json
{
  "name": "MyNodeJSAppName",
  "version": "1.0.0",
  "description": "This NodeJS app does XYZ!!!",
  "main": "MyNodeJSApp.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/<MyUsername>/<MyGitRepoName>.git"
  },
  "author": "<My Full Name>",
  "license": "MIT",
  "dependencies": {
      "express": "*"
  }
}
```

### Running a NodeJS Application
Piece of cake!

#### For Windows (7, 10):
`nodejs app.js`

#### For Linux (Ubuntu 16.04 LTS):
`node app.js`
