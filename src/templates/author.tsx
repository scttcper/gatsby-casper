// tslint:disable:no-http-string
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled, { css } from 'react-emotion';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  AuthorProfileImage,
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SiteMain,
} from '../styles/shared';

const HiddenMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

const AuthorLocationSvg = css`
  height: 1.9rem;
  stroke: #fff;
`;

const AuthorMeta = styled.div`
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
  font-family: Georgia, serif;
  font-style: italic;
`;

const AuthorBio = styled.h2`
  z-index: 10;
  flex-shrink: 0;
  margin: 5px 0 10px 0;
  max-width: 600px;
  font-size: 2rem;
  line-height: 1.3em;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

const Bull = styled.span`
  display: inline-block;
  margin: 0 12px;
  opacity: 0.5;
`;

const AuthorProfileBioImage = css`
  z-index: 10;
  flex-shrink: 0;
  margin: 0 0 20px 0;
  width: 100px;
  height: 100px;
  box-shadow: rgba(255, 255, 255, 0.1) 0 0 0 6px;
`;

interface AuthorTemplateProps {
  pageContext: {
    author: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: {
        node: PageContext;
      }[];
    };
    authorYaml: {
      id: string;
      website?: string;
      twitter?: string;
      facebook?: string;
      location?: string;
      profile_image?: {
        childImageSharp: {
          sizes: any;
        };
      };
      bio?: string;
      avatar: {
        childImageSharp: {
          sizes: any;
        };
      };
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

const Author: React.SFC<AuthorTemplateProps> = props => {
  const author = props.data.authorYaml;
  const { edges, totalCount } = props.data.allMarkdownRemark;

  return (
    <IndexLayout>
      <Wrapper>
        <header
          className={`${SiteHeader} ${outer} no-cover`}
          style={{ backgroundImage: author.profile_image ? `url(${author.profile_image.childImageSharp.sizes.src})` : '' }}
        >
          <div className={`${inner}`}>
            <SiteNav isHome={false} />
            <SiteHeaderContent>
              <Img
                className={`${AuthorProfileBioImage} ${AuthorProfileImage}`}
                sizes={props.data.authorYaml.avatar.childImageSharp.sizes}
                alt="Ghost"
              />
              <SiteTitle>{author.id}</SiteTitle>
              {author.bio && <AuthorBio>{author.bio}</AuthorBio>}
              <AuthorMeta>
                {author.location && (
                  <div className={`${AuthorLocationSvg} ${HiddenMobile}`}>
                    {author.location} <Bull>&bull;</Bull>
                  </div>
                )}
                <div className={`${HiddenMobile}`}>
                  {totalCount > 1 && `${totalCount} posts`}
                  {totalCount === 1 && `1 post`}
                  {totalCount === 0 && `No posts`} <Bull>•</Bull>
                </div>
                {author.website && (
                  <a className="social-link social-link-wb" href={author.website} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M23.5 11.957c0 6.375-5.163 11.544-11.532 11.544C5.599 23.5.5 18.125.5 11.75.5 5.542 5.37.758 11.505.511l.5-.011C18.374.5 23.5 5.582 23.5 11.957zM11.505.511c-6 6.5-6 14.98 0 22.98m1-22.98c6 6.5 6 14.977 0 22.977M2 17.479h20.063m-19.657-12h19.062m-20.968 6h22.938"
                        stroke="#000"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        fill="none"
                      />
                    </svg>
                  </a>
                )}
                {author.twitter && (
                  <a
                    className="social-link social-link-tw"
                    href={`https://twitter.com/${author.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z" />
                    </svg>
                  </a>
                )}
                {author.facebook && (
                  <a
                    className="social-link social-link-fb"
                    href={`https://www.facebook.com/${author.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z" />
                    </svg>
                  </a>
                )}
                {/* TODO: RSS for author */}
                {/* <a
                  className="social-link social-link-rss"
                  href="https://feedly.com/i/subscription/feed/https://demo.ghost.io/author/ghost/rss/"
                  target="_blank"
                  rel="noopener"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="6.18" cy="17.82" r="2.18" />
                    <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
                  </svg>
                </a> */}
              </AuthorMeta>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" className={`${SiteMain} ${outer}`}>
          <div className={`${inner}`}>
            <div className={`${PostFeed} ${PostFeedRaise}`}>
              {edges.map(({ node }) => {
                if (node.frontmatter.author && node.frontmatter.author.id === author.id) {
                  return <PostCard key={node.fields.slug} post={node} />;
                }
                return null;
              })}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Author;

export const pageQuery = graphql`
  query($author: String) {
    authorYaml(id: { eq: $author }) {
      id
      website
      twitter
      bio
      facebook
      location
      profile_image {
        childImageSharp {
          sizes {
            ...GatsbyImageSharpSizes
          }
        }
      }
      avatar {
        childImageSharp {
          sizes(maxWidth: 200) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
    allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
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
