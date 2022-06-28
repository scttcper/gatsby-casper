---
layout: post
title: "Updating Cordova config.xml version using npm version"
author: [masimplo]
tags: [""]
image: ../images/headers/cordova_logo_normal_dark_large.png
date: "2016-11-17"
draft: false
---

I like using npm scripts to do all my build and maintenance tasks. They are clear and can be reasoned with. I also like using the tooling built into npm like `npm version`. For those that don't already know you can write something like `npm version 3.5.1` and set the package.json version to the semver you passed or even do something like `npm version (major | minor | patch )` which will increment the respective version part in package json, commit it and add a git tag as well. For a complete guide of what npm version can do take look [here](https://docs.npmjs.com/cli/version).

I frequently found myself in projects that might have another file, other than package.json, that defines a version field for a specific reason. For instance I am working on an Ionic2 cross platform mobile project that uses Cordova's config.xml file to set the mobile application version. It makes sense that this version number should match the one in package json. Editing it manually is a hassle, as is oftenly overlooked and because `npm version` command commits after changing the version number, changing config.xml by hand would require a separate commit.

First I thought of using a git commit hook which can be accomplished by using the fact that npm version tags the version changing commit, but I don't like that git hooks are not version controlled and as such cannot be shared within a team and are short of like a hidden artifact that might slip through the cracks.

Reading throught the npm version documentation trying to find ways of extending or hooking onto it, I came upon a, what I think, is an elegant solution. After version 2.13.0 npm offers support for three version related scripts - `preversion, version and postversion`. As the documentation states:

> The exact order of execution is as follows:

> 1.  Check to make sure the git working directory is clean before we get started. Your scripts may add files to the commit in future steps. This step is skipped if the --force flag is set.
> 2.  Run the preversion script. These scripts have access to the old version in package.json. A typical use would be running your full test suite before deploying. Any files you want added to the commit should be explicitly added using git add.
> 3.  Bump version in package.json as requested (patch, minor, major, etc).
> 4.  Run the version script. These scripts have access to the new version in package.json (so they can incorporate it into file headers in generated files for example). Again, scripts should explicitly add generated files to the commit using git add.
> 5.  Commit and tag.
> 6.  Run the postversion script. Use it to clean up the file system or automatically push the commit and/or tag.

For my specific use case makes sense to use the version script (step 4) which takes place after the new version is available as a variable, but package.json is not committed yet. That way I can edit config.xml and then stage it for commit so it will be committed and tagged alongside package.json. It doesn't get any better than this.

For npm scripts longer than a line I like to use an external bash script and reference that in the npm script. In my **package.json** we add:

    "scripts": {
        ...
        "version": "./bin/update-config-version.sh",
        ...
      }

and in **update-config-version.sh**:

    #!/bin/bash

    CONFIG='config.xml'
    NEW_VERSION=${npm_package_version}

    if [ -e $CONFIG ]; then
        # sed to replace version in config.xml
        sed -i '' "s/\(widget.*version=\"\)\([0-9,.]*\)\"/\1$NEW_VERSION\"/" $CONFIG
        git add $CONFIG
        echo "Updated $CONFIG with version $NEW_VERSION"
    else
        echo 'Could not find config.xml'
        exit 1
    fi

We first replace the old version with the new one using sed and then stage the edited file.

Note that the new version is available by npm in an environmental variable name `npm_package_version` and we are using this variable in our script.
