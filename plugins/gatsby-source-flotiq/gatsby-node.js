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

  let response = await fetch(apiUrl + '/api/v1/content/flotiqBlogPost?hydrate=1&status=public', {
    headers: headers,
  });
  if (response.ok) {
    const json = await response.json();
    await Promise.all(json.data.map(async datum => {
      if(datum.author && datum.author.length && datum.author[0].avatar && datum.author[0].avatar.length){
        const response2  = await fetch(apiUrl + datum.author[0].avatar[0].dataUrl, {headers: headers});

        if(response2.ok) {
          datum.author[0].avatar[0] = await response2.json();

        }
      } else {
        datum.author[0].avatar = [{"id":"", "extension":""}];
      }
      return createNode({
        // custom
        slug: datum.slug,
        title: datum.title,
        content: datum.content,
        headerImage: datum.headerImage,
        tags: datum.tags,
        author: datum.author,
        excerpt: datum.excerpt,
        metaDescription: datum.metaDescription,
        relatedPosts: datum.relatedPosts,
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

  response = await fetch(apiUrl + '/api/v1/content/flotiqBlogTag?hydrate=1', {
    headers: headers,
  });
  if (response.ok) {
    const json = await response.json();
    await Promise.all(json.data.map(async datum => {
      return createNode({
        // custom
        tag: datum.tag,
        description: datum.description,
        image: datum.image,
        flotiqInternal: datum.internal,
        // required
        id: datum.id,
        parent: null,
        children: [],
        internal: {
          type: 'FlotiqBlogTag',
          contentDigest: crypto
            .createHash('md5')
            .update(JSON.stringify(datum))
            .digest('hex'),
        },
      });
    }));
  }

  response = await fetch(apiUrl + '/api/v1/content/flotiqBlogAuthor?hydrate=1', {
    headers: headers,
  });
  if (response.ok) {
    const json = await response.json();
    await Promise.all(json.data.map(async datum => {
      return createNode({
        // custom
        name: datum.name,
        bio: datum.bio,
        avatar: datum.avatar,
        slug: datum.slug,
        flotiqInternal: datum.internal,
        // required
        id: datum.id,
        parent: null,
        children: [],
        internal: {
          type: 'FlotiqBlogAuthor',
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
      tags: [FlotiqBlogTag]!
      author: [FlotiqBlogAuthor]!
      excerpt: String!
      metaDescription: String!
      relatedPosts: [FlotiqBlogPost]!
    }
    type FlotiqBlogTag implements Node {
      tag: String!
      description: String!
      image: [FlotiqGallery]!
      flotiqInternal: FlotiqInternal!
    }
    type FlotiqBlogAuthor implements Node {
      name: String!
      bio: String!
      avatar: [FlotiqGallery]!
      slug: String!
      flotiqInternal: FlotiqInternal!
    }
    type FlotiqGallery {
      id: String
      extension: String
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
