import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';
import styled, { css } from 'react-emotion';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import PostCard from '../components/PostCard';
import { SiteHeader, outer, SiteHeaderContent, inner, PostFeed, PostFeedRaise, SiteMain } from '../styles/shared';

const SiteTitle = styled.h1`
  z-index: 10;
  margin: 0;
  padding: 0;
  font-size: 3.8rem;
  font-weight: 700;
`;

const SiteDescription = styled.h2`
  z-index: 10;
  margin: 0;
  padding: 5px 0;
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

const HomePosts = css`
  @media (min-width: 795px) {
    .post-card:nth-child(6n + 1):not(.no-image) {
      flex: 1 1 100%;
      flex-direction: row;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      border-radius: 5px 0 0 5px;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-content {
      flex: 0 1 357px;
    }

    .post-card:nth-child(6n + 1):not(.no-image) h2 {
      font-size: 2.6rem;
    }

    .post-card:nth-child(6n + 1):not(.no-image) p {
      font-size: 1.8rem;
      line-height: 1.55em;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-content-link {
      padding: 30px 40px 0;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-meta {
      padding: 0 40px 30px;
    }
  }
`;

export interface IndexProps {
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
}

const IndexPage: React.SFC<IndexProps> = props => {
  const siteMetadata = props.data.site.siteMetadata;
  console.log(props);
  return (
    <IndexLayout>
      <Wrapper>
        <header
          className={`${SiteHeader} ${outer}`}
          style={{
            backgroundImage: `url(${siteMetadata.coverImage})`,
          }}
        >
          <div className={`${inner}`}>
            <SiteHeaderContent>
              <SiteTitle>
                {props.data.logo ? (
                  <img style={{ maxHeight: '45px' }} src={props.data.logo.childImageSharp.fixed.src} alt={siteMetadata.title} />
                ) : (
                  siteMetadata.title
                )}
              </SiteTitle>
              <SiteDescription>{siteMetadata.description}</SiteDescription>
            </SiteHeaderContent>
            <SiteNav isHome={true} />
          </div>
        </header>
        <main id="site-main" className={`${SiteMain} ${outer}`}>
          <div className={`${inner}`}>
            <div className={`${PostFeed} ${PostFeedRaise}`}>
              {props.data.allMarkdownRemark.edges.map(post => {
                return <PostCard key={post.node.fields.slug} post={post.node} />;
              })}
            </div>
          </div>
        </main>
        {props.children}

        <Footer />
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
