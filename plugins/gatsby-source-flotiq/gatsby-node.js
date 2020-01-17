const fetch = require('node-fetch');
const crypto = require('crypto');

let headers = {
  'accept': 'application/json',
};
let apiUrl;

exports.sourceNodes = async ({ actions }, { baseUrl, authToken }) => {
  const { createNode } = actions;
  apiUrl = baseUrl;
  headers['X-AUTH-TOKEN'] = authToken;

  const response = await fetch(apiUrl + '/api/v1/content/blogpost?hydrate=1', {
    headers: headers,
  });
  if (response.ok) {
    const json = await response.json();
    return await Promise.all(json.data.map(async datum => {
      return createNode({
        // custom
        slug: datum.slug,
        title: datum.title,
        content: datum.content,
        headerImage: datum.headerImage,
        flotiqInternal: datum.internal,
        // required
        id: datum.id,
        parent: null,
        children: [],
        internal: {
          type: 'FlotiqBlogPost',
          contentDigest: crypto
            .createHash('md5')
            .update(JSON.stringify(datum))
            .digest('hex'),
        },
      });
    }));
  }

  return {};
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type FlotiqBlogPost implements Node {
      slug: String!
      title: String!
      content: String!
      headerImage: [FlotiqGallery]!
      flotiqInternal: FlotiqInternal!
    }
    type FlotiqGallery {
      id: String!
      extension: String!
    }
    type FlotiqInternal {
      createdAt: String!
      deletedAt: String!
      updatedAt: String!
      contentType: String!
    }
  `;
  createTypes(typeDefs);
};
