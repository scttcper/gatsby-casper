#!/bin/sh
rm -rf public/blog
mkdir -p public/blog
find public/ -maxdepth 1 -mindepth 1 -not -name blog -exec mv '{}' public/blog/ \;
