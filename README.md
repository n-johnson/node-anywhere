node-anywhere
=============

A javascript interpreter written in javascript to make requiring modules possible anywhere. No dependencies on a package.json file or the node_modules directory.

When you run a script, it will be checked for the necessary modules and they will be included either from a cache or first downloaded if they aren't found.

## Use Cases

Command Line Tools
  - Javascript is incredibly handy for building tools, but is often cast aside for other languages because of the overhead involved with external dependencies. If I want to use request for example, it means I either build a module and install it globally, or add a node_modules folder and install request locally to use in a given project.


Writing global tools is also much easier. You write the script with references to the modules included and just run it and it works. You can copy it direct to your bin or do whatever you want: its 100% portable!


## Usage

`npm install -g node-anywhere`

It needs to be installed globally so it is added to your path (or manually link it to mesh better with your environment)

Then, when you want to require a module, simply use this syntax:

```
var request = require('request');/*@import:request*/
```

Yes, it is a bit redundant, but there a couple big reasons for that. The first reason, is this syntax is valid javascript, so running a script with `node index.js` will work the exact same so long as the required packages can be found.

Alternatively  I could have just parsed all calls to require, however that leads to lots of issues with trying to determine if a module may be local, should be downloaded, or is just a mistake by the developer and doesn't actually exist anywhere. This way there is no question on what is happening.

Finally, there are two options for actually running the script. You can just call `node-anywhere script.js` and it will work. Or, add this as the interpreter to the first line of any javascript file.

```
#!/usr/bin/env node-anywhere
```

and then execute the file as if it was a binary. I suspect this will be quite useful given the functionality of node-anywhere.


## Compatibility
* Node v0.12+ (I use a couple functions that were added in v0.12. They easily could be refactored to be compatible with v0.10, PR's welcome.)
* I've only done limited testing, but I've not run into any issues on OSX. I'll be testing it in a Linux environment shortly. Windows is not supported.