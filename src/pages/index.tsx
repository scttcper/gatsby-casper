import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import PostCard from '../components/PostCard';

type StaticQueryProps = {
  children?: any;
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        coverImage: string;
        logo?: string;
        facebook: string;
        twitter: string;
      };
    };
    allMarkdownRemark: {
      edges: {
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
            date: string;
            image: {
              childImageSharp: {
                sizes: any;
              };
            };
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
            tags?: string[];
          };
          excerpt: string;
          fields: {
            layout: string;
            slug: string;
          };
        };
      }[];
    };
  };
};

export default (props: StaticQueryProps) => {
  const siteMetadata = props.data.site.siteMetadata;
  return (
    <IndexLayout>
      <Wrapper className="home-template">
        <header
          className="site-header outer"
          style={{
            backgroundImage: `url(${siteMetadata.coverImage})`,
          }}
        >
          <div className="inner">
            <div className="site-header-content">
              <h1 className="site-title">
                {siteMetadata.logo ? (
                  <img
                    className="site-logo"
                    src="https://demo.ghost.io/content/images/2014/09/Ghost-Transparent-for-DARK-BG.png"
                    alt={siteMetadata.title}
                  />
                ) : (
                  siteMetadata.title
                )}
              </h1>
              <h2 className="site-description">{siteMetadata.description}</h2>
            </div>
            <SiteNav isHome={true} title={siteMetadata.title} siteUrl={siteMetadata.siteUrl} logo={siteMetadata.logo} />
          </div>
        </header>
        <main id="site-main" className="site-main outer">
          <div className="inner">
            <div className="post-feed">
              {props.data.allMarkdownRemark.edges.map(post => {
                return <PostCard key={post.node.fields.slug} post={post.node} />;
              })}
            </div>
          </div>
        </main>
        {props.children}

        <Footer siteMetadata={siteMetadata} />
      </Wrapper>
    </IndexLayout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        logo
        siteUrl
        coverImage
        facebook
        twitter
      }
    }
    allMarkdownRemark(limit: 1000, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
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
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
