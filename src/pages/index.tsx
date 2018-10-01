import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';
import styled from 'react-emotion';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import PostCard from '../components/PostCard';

const SiteTitle = styled.h1`
  z-index: 10;
  margin: 0;
  padding: 0;
  font-size: 3.8rem;
  font-weight: 700;
`;

export interface IndexProps {
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    }
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        coverImage: string;
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

const IndexPage: React.SFC<IndexProps> = (props) => {
  const siteMetadata = props.data.site.siteMetadata;
  console.log(props);
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
              <SiteTitle>
                {props.data.logo ? (
                  <img className="site-logo" src={props.data.logo.childImageSharp.fixed.src} alt={siteMetadata.title} />
                ) : (
                  siteMetadata.title
                )}
              </SiteTitle>
              <h2 className="site-description">{siteMetadata.description}</h2>
            </div>
            <SiteNav isHome={true} title={siteMetadata.title} siteUrl={siteMetadata.siteUrl} />
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

export default IndexPage;

export const pageQuery = graphql`
  query {
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
