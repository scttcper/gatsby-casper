const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.
  switch (node.internal.type) {
    case 'flotiqBlogPost': {
      const { permalink, layout, primaryTag } = node;
      const { relativePath } = getNode(node.parent);

      let slug = permalink;

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`;
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || '',
      });

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || '',
      });

      createNodeField({
        node,
        name: 'primaryTag',
        value: primaryTag || '',
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allFlotiqBlogPost(sort: {fields: flotiqInternal___updatedAt, order: DESC}, limit: 2000) {
    edges {
      node {
        content
        id
        slug
        title
        tags {
          id
          tag
          description
          image {
            id
            extension
          }
        }
        headerImage {
          extension
          id
        }
        author {
          id
          name
          slug
          avatar {
            extension
            id
          }
          bio
        }
        flotiqInternal {
          createdAt
        }
      }
    }
    totalCount
  }
      allFlotiqBlogAuthor {
    edges {
      node {
        id
        avatar {
          extension
          id
        }
        bio
        name
        slug
      }
    }
  }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  // Create post pages
  const posts = result.data.allFlotiqBlogPost.edges;

  // Create paginated index
  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/${i + 1}`,
      component: path.resolve('./src/templates/index.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  posts.forEach(({ node }, index) => {
    const { slug, layout } = node;
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    createPage({
      path: slug,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `post`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        prev,
        next,
        primaryTag: node.tags ? node.tags[0].tag : '',
      },
    });
  });

  // Create tag pages
  const tagTemplate = path.resolve('./src/templates/tags.tsx');
  const tags = _.uniq(
    _.flatten(
      result.data.allFlotiqBlogPost.edges.map(edge => {
        return _.castArray(_.get(edge, 'node.tags', []));
      }),
    ),
  );
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.tag)}/`,
      component: tagTemplate,
      context: {
        tag: tag.tag,
      },
    });
  });

  // Create author pages
  const authorTemplate = path.resolve('./src/templates/author.tsx');
  result.data.allFlotiqBlogAuthor.edges.forEach(edge => {
    createPage({
      path: `/author/${_.kebabCase(edge.node.slug)}/`,
      component: authorTemplate,
      context: {
        author: edge.node.slug,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // adds sourcemaps for tsx in dev mode
  if (stage === `develop` || stage === `develop-html`) {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  }
};
