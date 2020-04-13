import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import { setLightness, darken, lighten } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Helmet } from 'react-helmet';

import AuthorCard from '../components/AuthorCard';
import Footer from '../components/Footer';
import SiteNav, { SiteNavMain } from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import PostContent from '../components/PostContent';
import PostFullFooter from '../components/PostFullFooter';
import PostFullFooterRight from '../components/PostFullFooterRight';
import ReadNextCard from '../components/ReadNextCard';
import Subscribe from '../components/subscribe/Subscribe';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteHeader, SiteMain } from '../styles/shared';
import config from '../website-config';

const PostTemplate = css`
  .site-main {
    margin-top: 64px;
    background: #fff;
    padding-bottom: 4vw;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

export const PostFull = css`
  position: relative;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 70px 170px 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 11vw 50px;
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
`;

const PostFullTags = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* color: var(--midgrey); */
  color: ${colors.midgrey};
  font-size: 1.3rem;
  line-height: 1.4em;
  font-weight: 600;
  text-transform: uppercase;
`;

const PostFullCustomExcerpt = styled.p`
  margin: 20px 0 0;
  color: var(--midgrey);
  font-family: Georgia, serif;
  font-size: 2.3rem;
  line-height: 1.4em;
  font-weight: 300;

  @media (max-width: 500px) {
    font-size: 1.9rem;
    line-height: 1.5em;
  }

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
  }
`;

const PostFullByline = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0 0;
  padding-top: 15px;
  /* border-top: 1px solid color(var(--lightgrey) l(+10%)); */
  border-top: 1px solid ${lighten('0.1', colors.lightgrey)};

  .post-full-byline-content {
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }

  .post-full-byline-content .author-list {
    justify-content: flex-start;
    padding: 0 12px 0 0;
  }

  .post-full-byline-meta {
    margin: 2px 0 0;
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
    font-size: 1.2rem;
    line-height: 1.2em;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .post-full-byline-meta h4 {
    margin: 0 0 3px;
    font-size: 1.3rem;
    line-height: 1.4em;
    font-weight: 500;
  }

  .post-full-byline-meta h4 a {
    /* color: color(var(--darkgrey) l(+10%)); */
    color: ${lighten('0.1', colors.darkgrey)};
  }

  .post-full-byline-meta h4 a:hover {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
  }

  .post-full-byline-meta .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: 0.6;
  }

  @media (prefers-color-scheme: dark) {
    /* border-top-color: color(var(--darkmode) l(+15%)); */
    border-top-color: ${lighten('0.15', colors.darkmode)};

    .post-full-byline-meta h4 a {
      color: rgba(255, 255, 255, 0.75);
    }

    .post-full-byline-meta h4 a:hover {
      color: #fff;
    }
  }
`;

const PostFullMetaDate = styled.time`
  color: ${colors.blue};
`;

export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  color: ${setLightness('0.05', colors.darkgrey)};
  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const PostFullImage = styled.figure`
  margin: 0 -10vw -165px;
  height: 800px;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 1170px) {
    margin: 0 -4vw -100px;
    height: 600px;
    border-radius: 0;
  }

  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
  }
`;

const ReadNextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
`;

interface PageTemplateProps {
  pathContext: {
    slug: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      timeToRead: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        image: {
          childImageSharp: {
            fluid: any;
          };
        };
        excerpt: string;
        tags: string[];
        author: Array<{
          id: string;
          bio: string;
          avatar: {
            children: Array<{
              fixed: {
                src: string;
              };
            }>;
          };
        }>;
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image: {
      childImageSharp: {
        fluid: any;
      };
    };
    excerpt: string;
    title: string;
    date: string;
    draft?: boolean;
    tags: string[];
    author: Array<{
      id: string;
      bio: string;
      avatar: {
        children: Array<{
          fixed: {
            src: string;
          };
        }>;
      };
    }>;
  };
}

const PageTemplate: React.FC<PageTemplateProps> = props => {
  const post = props.data.markdownRemark;
  let width = '';
  let height = '';
  if (post.frontmatter.image && post.frontmatter.image.childImageSharp) {
    width = post.frontmatter.image.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
    height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
  }

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <title>{post.frontmatter.title}</title>

        <meta name="description" content={post.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
          <meta
            property="og:image"
            content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
          />
        )}
        <meta property="article:published_time" content={post.frontmatter.date} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.frontmatter.tags && (
          <meta property="article:tag" content={post.frontmatter.tags[0]} />
        )}

        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.facebook && <meta property="article:author" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
          <meta
            name="twitter:image"
            content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
          />
        )}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.frontmatter.author.id} />
        <meta name="twitter:label2" content="Filed under" />
        {post.frontmatter.tags && <meta name="twitter:data2" content={post.frontmatter.tags[0]} />}
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
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}
      </Helmet>
      <Wrapper css={PostTemplate}>
        <header className="site-header">
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isPost post={post.frontmatter} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            {/* TODO: no-image css tag? */}
            <article css={[PostFull, !post.frontmatter.image && NoImage]}>
              <PostFullHeader>
                <PostFullTags>
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <Link to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>
                      {post.frontmatter.tags[0]}
                    </Link>
                  )}
                </PostFullTags>
                <PostFullTitle>{post.frontmatter.title}</PostFullTitle>
                <PostFullCustomExcerpt>{post.frontmatter.excerpt}</PostFullCustomExcerpt>
                <PostFullByline className="post-full-byline">
                  <section className="post-full-byline-meta">
                    {/* <h4 className="author-name">{{authors}}</h4> */}
                    <div className="byline-meta-content">
                      <time className="byline-meta-date" dateTime="">
                        Today
                      </time>
                      <span className="byline-reading-time">
                        <span className="bull">&bull;</span> 20 min
                      </span>
                    </div>
                  </section>
                </PostFullByline>
              </PostFullHeader>

              {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
                <PostFullImage>
                  <Img
                    style={{ height: '100%' }}
                    fluid={post.frontmatter.image.childImageSharp.fluid}
                  />
                </PostFullImage>
              )}
              <PostContent htmlAst={post.htmlAst} />

              {/* The big email subscribe modal content */}
              {config.showSubscribe && <Subscribe title={config.title} />}

              {post.frontmatter.author.map(author => {
                return (
                  <PostFullFooter key={author.id}>
                    <AuthorCard author={author} />
                    <PostFullFooterRight authorId={author.id} />
                  </PostFullFooter>
                );
              })}
            </article>
          </div>
        </main>

        {/* Links to Previous/Next posts */}
        <aside className="read-next" css={outer}>
          <div css={inner}>
            <ReadNextFeed>
              {props.data.relatedPosts && (
                <ReadNextCard tags={post.frontmatter.tags} relatedPosts={props.data.relatedPosts} />
              )}

              {props.pageContext.prev && <PostCard post={props.pageContext.prev} />}
              {props.pageContext.next && <PostCard post={props.pageContext.next} />}
            </ReadNextFeed>
          </div>
        </aside>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default PageTemplate;

export const query = graphql`
  query($slug: String, $primaryTag: String) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      timeToRead
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        tags
        excerpt
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
                fixed(quality: 90) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
