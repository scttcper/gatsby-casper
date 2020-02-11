import { graphql, Link } from 'gatsby';
import * as _ from 'lodash';
import { setLightness, lighten } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Helmet } from 'react-helmet';

import AuthorCard from '../components/AuthorCard';
import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import PostContent from '../components/PostContent';
import PostFullFooter from '../components/PostFullFooter';
import PostFullFooterRight from '../components/PostFullFooterRight';
import ReadNextCard from '../components/ReadNextCard';
import Subscribe from '../components/subscribe/Subscribe';
import Wrapper from '../components/Wrapper';
import SchemaOrg from '../components/SEO/SchemaOrg';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteHeader, SiteMain } from '../styles/shared';
import config from '../website-config';

const PostTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }

  .post-tag-pill {
    background-color: ${lighten('.35', colors.flotiqBlue)};
    padding: 0 5px;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    font-weight: 600;
    transition: background-color .2s ease;
    min-height: 18px;
    display: inline-flex;
    align-items: center;

    &:hover {
      text-decoration: none;
      background-color: ${lighten('.4', colors.flotiqBlue)};
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
  margin: 0 auto;
  padding: 6vw 3vw 3vw;
  max-width: 1040px;
  text-align: center;

  @media (max-width: 500px) {
    padding: 14vw 3vw 10vw;
  }
`;

const PostFullMeta = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.midgrey};
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;

  @media (max-width: 500px) {
    font-size: 1.2rem;
    line-height: 1.3em;
  }
`;

const PostFullMetaDate = styled.time`
  color: ${colors.midgrey};
`;

export const PostFullTitle = styled.h1`
  margin: 0;
  color: ${setLightness('0.05', colors.darkgrey)};
  @media (max-width: 500px) {
    font-size: 2.9rem;
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

const DateDivider = styled.span`
  display: inline-block;
  margin: 0 6px 1px;
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
    flotiqBlogPost: {
      excerpt: string;
      title: string;
      content: string;
      metaDescription: string;
      flotiqInternal: {
        createdAt: string;
        updatedAt: string;
      };
      headerImage: [{
        id: string;
        extension: string;
      }];
      tags: [{
        id: string;
        tag: string;
        description: string;
        image: {
          id: string;
          extension: string;
        }
      }]
      author: [{
        id: string;
        bio: string;
        slug: string;
        avatar: {
          id: string;
          extension: string;
        };
      }];
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          title: string;
          slug: string;
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
  title: string;
  flotiqInternal: {
    createdAt: string;
    updatedAt: string;
  };
  content: string;
  slug: string;
  id: string;
  tags: [{
    id: string;
    tag: string;
    description: string;
  }];
  headerImage: [{
    extension: string;
    id: string;
  }];
  author: [{
    id: string;
    bio: string;
    slug: string;
    name: string;
    avatar: [{
      id: string;
      extension: string
    }];
  }];
}

const PageTemplate: React.FC<PageTemplateProps> = props => {
  const post = props.data.flotiqBlogPost;
  let width = '';
  let height = '';
  // if (post.headerImage && post.headerImage.childImageSharp) {
  //   width = post.headerImage.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
  //   height = String(Number(width) / post.headerImage.childImageSharp.fluid.aspectRatio);
  // }

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <title>{post.title} - {config.title}</title>

        <meta name="description" content={post.metaDescription} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        {(post.headerImage) && (
          <meta property="og:image" content={`${config.siteUrl}${post.headerImage[0].id}`} />
        )}
        <meta property="article:published_time" content={post.flotiqInternal.createdAt} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.tags && (
          <meta property="article:tag" content={post.tags[0].tag} />
        )}

        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.facebook && <meta property="article:author" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {(post.headerImage) && (
          <meta name="twitter:image" content={`${config.siteUrl}${post.headerImage[0].id}`} />
        )}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.author[0].id} />
        <meta name="twitter:label2" content="Filed under" />
        {post.tags && <meta name="twitter:data2" content={post.tags[0].tag} />}
        {config.twitter && <meta name="twitter:site" content={`@${config.twitter.split('https://twitter.com/')[1]}`} />}
        {config.twitter && <meta
          name="twitter:creator"
          content={`@${config.twitter.split('https://twitter.com/')[1]}`}
        />}
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}
      </Helmet>
      <Wrapper css={PostTemplate}>
        <header css={[outer, SiteHeader]}>
          <div css={inner}>
            <SiteNav />
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            {/* TODO: no-image css tag? */}
            <article css={[PostFull, !post.headerImage && NoImage]}>
              <PostFullHeader>
                <PostFullMeta>
                  <PostFullMetaDate dateTime={post.flotiqInternal.createdAt}>
                    {post.flotiqInternal.createdAt.substr(0,10)}
                  </PostFullMetaDate>
                  {post.tags &&
                    post.tags.length > 0 && (
                      <>
                        <DateDivider>/</DateDivider>
                        <Link className="post-tag-pill" to={`/tags/${_.kebabCase(post.tags[0].tag)}/`}>
                          {post.tags[0].tag}
                        </Link>
                      </>
                  )}
                </PostFullMeta>
                <PostFullTitle>{post.title}</PostFullTitle>
              </PostFullHeader>

              {(post.headerImage && post.headerImage[0].id) && (
                <PostFullImage>
                  <img src={process.env.GATSBY_FLOTIQ_BASE_URL + '/image/1450x800/' + post.headerImage[0].id + '.' + post.headerImage[0].extension} style={{ height: '100%' }} alt={post.title} />
                </PostFullImage>
              )}
              <PostContent htmlAst={post.content} />

              {/* The big email subscribe modal content */}
              {config.showSubscribe && <Subscribe title={config.title} />}

              <PostFullFooter>
                <AuthorCard author={post.author} />
                <PostFullFooterRight authorId={post.author[0].slug} />
              </PostFullFooter>
            </article>
          </div>
        </main>
        <SchemaOrg
          isBlogPost={true}
          url={config.siteUrl + props.pathContext.slug}
          title={post.title}
          image={process.env.GATSBY_FLOTIQ_BASE_URL + '/image/1450x800/' + post.headerImage[0].id + '.' + post.headerImage[0].extension}
          description={post.metaDescription}
          datePublished={post.flotiqInternal.createdAt}
          dateModified={post.flotiqInternal.updatedAt}
          canonicalUrl={config.siteUrl}
          author={{name: post.author[0].slug}}
          organization={{url: config.siteUrl, logo: config.companyLogo, name:config.companyName}}
          defaultTitle={post.title}
        />
        {/* Links to Previous/Next posts */}
        <aside className="read-next" css={outer}>
          <div css={inner}>
            <ReadNextFeed>
              {props.data.relatedPosts && (
                <ReadNextCard tags={post.tags} relatedPosts={props.data.relatedPosts} />
              )}

              {props.pageContext.prev && <PostCard post={props.pageContext.prev} isIndex={true} />}
              {props.pageContext.next && <PostCard post={props.pageContext.next} isIndex={true} />}
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
    flotiqBlogPost( slug: { eq: $slug } ) {
      excerpt
      title
      content
      metaDescription
      flotiqInternal {
        createdAt
        updatedAt
      }
      tags {
        id
        tag
      }
      headerImage {
        extension
        id
      }
      author {
        id
        name
        bio
        slug
        avatar {
          id
          extension
        }
      }
    }
    relatedPosts: allFlotiqBlogPost(
      filter:{tags: {elemMatch: {tag: {eq:  $primaryTag } } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          title
          slug
        }
      }
    }
  }
`;
