# Hello & Welcome!
This repo is a collection of hello world examples
that are by design incredibly simple but also cover practical topics
that one might work on in the real world.

For the time being, the emphasis is on hello world examples for
each layer of the [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) stack:
+   M: [MongoDB](https://en.wikipedia.org/wiki/MongoDB)
+   E: [ExpressJS](https://en.wikipedia.org/wiki/Express.js)
+   A: [AngularJS](https://en.wikipedia.org/wiki/AngularJS)
+   N: [NodeJS](https://en.wikipedia.org/wiki/Node.js)

The goal here is to reduce learning curve by dividing and conquering: We are decomposing the larger problem
of learning the MEAN stack into smaller pieces.  We tackle learning one layer at a time, and then
at the end we put all the layers together.

Some popular MEAN stack variants are:
+   MEEN stack (AngularJS replaced by [EmberJS](https://en.wikipedia.org/wiki/Ember.js))
+   MERN stack (AngularJS replaced by [ReactJS](https://en.wikipedia.org/wiki/React_(JavaScript_library)))

It is interesting to note the order of popularity of the alternatives:
1 AngularJS (promoted by Google),
2 ReactJS (promoted by Facebook),
3 EmberJS (sprung from jQuery tradition).

# Getting Started
The MEAN stack is cross-platform, running on Linux, Windows, and macOS.  We will provide instructions
for installing it on Windows (7, 10) and Linux (Ubuntu 16.04 LTS).

The foundation of the
MEAN stack is NodeJS, so it is the first part of
MEAN stack that gets installed.  But before we get started, we recommend installing a
few helpful dev tools.

## Install Development Tools
### Install Git Bash
You can certainly use Windows command prompt if you wish, but I highly recommend using
the Git Bash terminal emulator.  It installs a Git client, emulates Unix path syntax (forward slashes)
and many common commands (ls, touch, mkdir, cd, etc), and just provides a nice Linux look and feel
and function for your terminal experience.

#### For Windows (7, 10) Only:
1   Download and install Git Bash from https://git-scm.com/download/win
2   In Git Bash terminal, checkout this git repo to your local machine:
mkdir -p /C/workspace/hellogit
cd /C/workspace/hellogit
git clone https://github.com/bdmossma/hellogit.git
3   Setup a git account with a git server:
Note that you'll need to setup a user account with a git server like github.com or gitlab.com
which you can do for free.  To pull down the examples in this repo, you'll need
an account specifically with github.com.
4   In Git Bash terminal, cache your git credentials for the git repo you checked out:
cd /C/workspace/hellogit
git config credential.helper cache    # prompts you for your git credentials

#### For Linux (Ubuntu 16.04 LTS):
Not terminal emulator required. Bash is natively part Linux distributions.

#### Common Git commands
-   git clone <repo url>
-   git add <file or dir>
-   git mv <current filename> <new filepath and/or name>
-   git commit <filepath or dir> -m "committing some code changes to git repo"    # git is a distributed config management system, so this just commits to your local repo
-   git push <filepath, dir, or nothing>    # this actually is the point where your code changes get push up to your chosen git server (back to "origin")

### Install Atom IDE
#### For Linux (Ubuntu 16.04 LTS):
sudo apt-get install atom

#### For Windows (7, 10):
1   Download and install Atom from https://atom.io/download/windows
2   In Git Bash terminal, install helpful atom plug-ins:
apm install atom-ternjs
apm install autocomplete-plus

## Install NodeJS
#### For Linux (Ubuntu 16.04 LTS):
sudo apt-get install nodejs
sudo apm install atom-ternjs
sudo apm install autocomplete-plus

#### For Windows (7, 10):
Download and install NodeJS from https://nodejs.org/dist/v6.9.4/node-v6.9.4-x64.msi
This installs npm, the NodeJS package manager.

#### NodeJS Package Manager (npm)
In 2011, NodeJS was the most active
open-source project in github and continues to be one of the most popular, with a vibrant
developer community and untold thousands of packages being contributed all the time,
so you can use npm to install a package for pretty much anything
you can imagine.

Command npm commands:
-   npm init        # steps thru creating a new nodejs project in current dir
-   npm install     # installs all nodejs packages specified in package.json at current dir
-   npm install <package name>    # install specified nodejs package
The package.json file is the heart of your nodejs project configuration.
It is recommended that you run "npm init" in your project dir and let it guide you through
creating your package.json file and specifying your chosen software license, your
github url, and other configuration items.
Lastly, you can open the package.json file and list all of your dependencies.
It is easy to list dependencies. You can easily add new dependencies to
package.json as shown below. You can use a specific version or list an asterisk
to use the latest available version.
`
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
`

## Install ExpressJS
#### For Linux (Ubuntu 16.04 LTS):

## Install MongoDB
## Install AngularJS
