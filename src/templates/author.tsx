import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Img, { FluidObject } from 'gatsby-image';

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
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SiteMain,
  SocialLink,
  SiteArchiveHeader,
  NoImage,
  SiteNavMain,
} from '../styles/shared';
import { PageContext } from './post';
import Facebook from '../components/icons/facebook';
import { Helmet } from 'react-helmet';
import config from '../website-config';
import Website from '../components/icons/website';
import Twitter from '../components/icons/twitter';

const HiddenMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

const AuthorHeader = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10vw 0 10px;
  align-items: center;
  @media (max-width: 500px) {
    padding: 10px 0 0;

    /* no image */
    padding-bottom: 10px;
  }
`;

const AuthorMeta = styled.div`
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin: 0 0 0 1px;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const AuthorBio = styled.h2`
  z-index: 10;
  flex-shrink: 0;
  margin: 6px 0 0;
  max-width: 46em;
  font-size: 2rem;
  line-height: 1.3em;
  font-weight: 400;
  opacity: 0.8;
`;

const Bull = styled.span`
  display: inline-block;
  margin: 0 12px;
  opacity: 0.5;
`;

const AuthHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0 0 30px;
  @media (max-width: 500px) {
    align-items: center;
    margin: 16px 0 0 0;
  }
`;

// .site-header-content .author-profile-image
const AuthorProfileBioImage = css`
  z-index: 10;
  flex-shrink: 0;
  margin: -4px 0 0;
  width: 110px;
  height: 110px;
  box-shadow: rgba(255, 255, 255, 0.1) 0 0 0 6px;
  border-radius: 100%;
`;

interface AuthorTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    author: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
    authorYaml: {
      id: string;
      website?: string;
      twitter?: string;
      facebook?: string;
      location?: string;
      // eslint-disable-next-line @typescript-eslint/camelcase
      profile_image?: {
        childImageSharp: {
          fluid: any;
        };
      };
      bio?: string;
      avatar: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
}

const Author: React.FC<AuthorTemplateProps> = props => {
  const author = props.data.authorYaml;

  const edges = props.data.allMarkdownRemark.edges.filter(edge => {
    const isDraft = edge.node.frontmatter.draft !== true || process.env.NODE_ENV === 'development';

    let authorParticipated = false;
    if (edge.node.frontmatter.author) {
      edge.node.frontmatter.author.forEach(function (element) {
        if (element.id === author.id) {
          authorParticipated = true;
        }
      });
    }

    return isDraft && authorParticipated;
  });
  const totalCount = edges.length;

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {author.id} - {config.title}
        </title>
        <meta name="description" content={author.bio} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${author.id} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        <meta property="article:publisher" content="https://www.facebook.com/ghost" />
        <meta property="article:author" content="https://www.facebook.com/ghost" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${author.id} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper css={NoImage}>
        <header className={`site-archive-header no-image`} css={[SiteHeader, SiteArchiveHeader]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>

          <div css={[outer]} className={`site-header-background no-image`}>
            <div css={inner}>
              <SiteHeaderContent css={AuthorHeader} className="site-header-content">
                <img
                  css={[AuthorProfileImage, AuthorProfileBioImage]}
                  src={props.data.authorYaml.avatar.childImageSharp.fluid.src}
                  alt={author.id}
                />
                <AuthHeaderContent className="author-header-content">
                  <SiteTitle className="site-title">{author.id}</SiteTitle>
                  {author.bio && <AuthorBio className="author-bio">{author.bio}</AuthorBio>}
                  <AuthorMeta>
                    {author.location && (
                      <div css={HiddenMobile}>
                        {author.location} <Bull>&bull;</Bull>
                      </div>
                    )}
                    <div css={HiddenMobile}>
                      {totalCount > 1 && `${totalCount} posts`}
                      {totalCount === 1 && '1 post'}
                      {totalCount === 0 && 'No posts'} <Bull>•</Bull>
                    </div>
                    {author.website && (
                      <div>
                        <a
                          className="social-link-wb"
                          css={SocialLink}
                          href={author.website}
                          title="Website"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Website />
                        </a>
                      </div>
                    )}
                    {author.twitter && (
                      <a
                        className="social-link-tw"
                        css={SocialLink}
                        href={`https://twitter.com/${author.twitter}`}
                        title="Twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter />
                      </a>
                    )}
                    {author.facebook && (
                      <a
                        className="social-link-fb"
                        css={SocialLink}
                        href={`https://www.facebook.com/${author.facebook}`}
                        title="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook />
                      </a>
                    )}
                    {/* TODO: RSS for author */}
                    {/* <a
                  css={SocialLink} className="social-link-rss"
                  href="https://feedly.com/i/subscription/feed/https://demo.ghost.io/author/ghost/rss/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ height: '1.9rem' }}
                  >
                    <circle cx="6.18" cy="17.82" r="2.18" />
                    <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
                  </svg>
                </a> */}
                  </AuthorMeta>
                </AuthHeaderContent>
              </SiteHeaderContent>
            </div>
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed]}>
              {edges.map(({ node }) => {
                return <PostCard key={node.fields.slug} post={node} />;
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
          fluid(maxWidth: 3720) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      avatar {
        childImageSharp {
          fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2000
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            draft
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid
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
