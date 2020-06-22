<a href="https://flotiq.com/">
    <img src="https://editor.flotiq.com/fonts/fq-logo.svg" alt="Flotiq logo" title="Flotiq" align="right" height="60" />
</a>

Flotiq Blog
==============

This is a [Gatsby](https://gatsbyjs.org) starter project for a blog with tags and authors. It's configured to pull recipe data from [Flotiq](https://flotiq.com) and can be easily deployed to your cloud hosting - Heroku, Netlify, Gatsby Cloud, etc.

See it live on [Flotiq/Blog](https://flotiq.com/blog/)

Screenshot

![Flotiq Blog Image](https://github.com/flotiq/flotiq-blog/raw/master/flotiq-blog-home.png)

## Quick start

1. **Start project from template using Gatsby CLI**
    
    ```bash
    gatsby new flotiq-blog https://github.com/flotiq/flotiq-blog.git
    ```
1. **Setup "flotiqBlogTag", "flotiqBlogAuthor", and "flotiqBlogPost" Content Type in Flotiq**

   Create your [Flotiq.com](https://flotiq.com) account. 
   
   Next, create necessary Content Types:

   ![Tag content type in flotiq](docs/create-definition1.png)
   ![Author content type in flotiq](docs/create-definition2.png)
   ![Post content type in flotiq](docs/create-definition3.png)
    
   _Note: You can also create necessary types using [Flotiq REST API](https://flotiq.com/docs/API/)._ 

1. **Configure application**

    The next step is to configure our application to know from where it has to fetch the data.
       
    You need to create a file called `.env` inside the root of the directory, with the following structure:

    ```
    GATSBY_FLOTIQ_BASE_URL=https://api.flotiq.com
    GATSBY_FLOTIQ_API_KEY=YOUR FLOTIQ API KEY
    ```

1.  **Start developing**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd flotiq-blog
    npm install
    gatsby develop
    ```
    
    If you wish to import example posts, tags and authors to your account, before running `gatsby develop` run:
    
    ```sh
    node ./.flotiq/importExample.js
    ```
    
    It will add 4 images, 1 tag, 1 author and 3 posts to your Flotiq account.
    
    _Note: You need to put your Read and write API key in `.env` for import to work. You don't need any content types in your account. If you already have tag with ids `flotiqBlogTag-1`, author with `flotiqBlogAuthor-1` or posts with ids `flotiqBlogPost-1`, `flotiqBlogPost-2` and `flotiqBlogPost-3` they will be overwritten._
   
1.  **Open the source code and start editing!**
    
    Your site is now running at [http://localhost:8000](http://localhost:8000)!
    
    _Note: You'll also see a second link: _[http://localhost:8000/___graphql](http://localhost:8000/___graphql)`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._
    
    Open a project directory in your code editor of choice and edit `src/templates/index.js`. Save your changes, and the browser will update in real time!

1. **Manage your recipes using Flotiq editor**
      
    You can now easily manage your recipes using [Flotiq editor](https://editor.flotiq.com)
    
    ![Managing recipes using Flotiq](docs/manage-recipes.png)

# Deploy

You can deploy this project to Heroku in 3 minutes:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/flotiq/flotiq-blog)

Or to Netlify:

[![Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/flotiq/flotiq-blog)
  
## Collaborating

   If you wish to talk with us about this project, feel free to hop on our [discord server](https://discord.gg/FwXcHnX).
   
   If you found a bug, please report it in [issues](https://github.com/flotiq/flotiq-blog/issues).
