import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// Components
import { Link, graphql } from 'gatsby';
import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { inner } from '../styles/shared';

interface TagTemplateProps {
  pageContext: {
    tag: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        coverImage: string;
        facebook: string;
        twitter: string;
        author: {
          name: string;
          url: string;
        };
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: {
        node: PageContext;
      }[];
    };
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image?: {
      childImageSharp: {
        sizes: any;
      };
    };
    title: string;
    date: string;
    tags: string[];
    author: {
      id: string;
      bio: string;
      avatar: {
        children: {
          fixed: {
            src: string;
          };
        }[];
      };
    };
  };
}

const Tags: React.SFC<TagTemplateProps> = props => {
  const siteMetadata = props.data.site.siteMetadata;
  const tag = props.pageContext.tag;
  const { edges, totalCount } = props.data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;

  return (
    <IndexLayout className="tag-template tag-fiction">
      <Wrapper>
        <header className="site-header outer no-cover">
          <div className="inner">
            <SiteNav
              isHome={false}
              title={tagHeader}
              siteUrl={props.data.site.siteMetadata.siteUrl}
            />
            <div className="site-header-content">
              <h1 className="site-title">{tag}</h1>
              {/* TODO: tag description */}
              <h2 className="site-description">
                A collection of {totalCount > 1 && `${totalCount} posts`}
                {totalCount === 1 && `1 post`}
                {totalCount === 0 && `No posts`}
              </h2>
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main outer">
          <div className={`${inner}`}>
            <div className="post-feed">
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
        <Footer siteMetadata={siteMetadata} />
      </Wrapper>
    </IndexLayout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        siteUrl
        coverImage
        facebook
        twitter
        author {
          name
          url
        }
      }
    }
    allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            image {
              childImageSharp {
                sizes(maxWidth: 1240) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(quality: 100) {
                      src
                    }
                  }
                }
              }
            }
          }
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
