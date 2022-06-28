---
layout: post
title: "Removing remote and local git tags"
author: [masimplo]
tags: [""]
image: ../images/headers/tagging.png
date: "2016-11-19"
draft: false
---

When I first set up a teamcity build server I thought it would be a good idea to tag my git commits with the build number that teamcity processed that commit. Back then I wasn't really using tags for much and thought I would be adding value to my repo, which I later discovered was only adding noise.

Nowadays I am using tags for releases (as they are supposed to be) and for some other equally important reasons, but I have been left with the old unwanted tags in my repo. In my opinion the tag system of git is flawed. If a tag is pushed to a central repo (i.e. github) then everyone will get it and there is no real solution to put the genie back in the bottle. You can delete the tag all you want, next push from a colleague and the tag is just back in there. I have tried deleting the tags again and again, one by one, many times, even sent emails to colleagues to do the same at the same time as me, but they always find a way to creep back in (e.g from rarely used laptop or a build agent not online for some time).

I can no longer justify manually deleting them so I had to look for a more robust way to delete them every now and then, hoping that we got them in every single dark place they might be hiding. I found a couple of ways of doing this but the fastest and one liner one is like follows.

The tags I want to delete in bulk have a common characteristic that they contain the word _build_ in them. Your case might be different so you will want to modify the following to fit your needs.

**Delete remote tags command:**

    git ls-remote --tags origin | awk '/^(.*)(\s+)(.*build.*[0-9])$/ {print ":" $2}' | xargs git push origin

Lets break this bad boy down.
`git ls-remote --tags origin` just says list all the tags that are on the origin repo. The output of this command looks like:
`1bdcdfa0ee5ca981b6d13922913c46ff49f00356 refs/tags/build-882` (i.e. hash [spaces] refs/tags/tagName).

We only want to keep the last part so we use awk.`(.*)` will match the hash, `(\s+)` will match the spaces and (._build._[0-9]) will match the refs/tags/tagName part. The third part is what you want to modify to make this work for your particular situation. The output of the two first parts of the complete command will look like `:refs/tags/build-859` as we added the colon to make the output match the argument needed by the third command.

`git push origin :refs/tags/build-859` will delete the tag build-859 (this is the 'official' way of deleting a remote tag), so we are using xargs to pass the whole list of matching tags to the third command and thus delete all of them. The output of the complete command will look like:

    - [deleted]         build-859
    - [deleted]         build-878
    ...
    - [deleted]         build-1888

Finally you want to delete local tags matching the same pattern as well, so that you don't push the "bad" tags back to origin next time you push all tags.

**Delete local tags command:**

    git tag -l | awk '/^(.*build.*)$/ {print $1}' | xargs git tag -d

will take care of the local tags with output similar to the following:

    Deleted tag 'build-859' (was 26172b3)
    Deleted tag 'build-878' (was 0ff90af)
    ...
    Deleted tag 'build-1888' (was 39191b7)

If you are confident that you don't have any local tags that do not exist on the remote (other than the ones you don't want) it might be easier to delete all local tags and then just fetch from origin. You can do this by simply skipping the awk part.

**Delete all local tags command:**

    git tag -l | xargs git tag -d

If some day I manage to find a way to annihilate those tags completely and forever, I will let you know. Until we win that war, at least lets win some battles.
