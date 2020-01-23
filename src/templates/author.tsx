import {graphql} from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';

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
import {PageContext} from './post';
import Helmet from 'react-helmet';
import config from '../website-config';

const HiddenMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
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
    pathContext: {
        slug: string;
    };
    data: {
        allFlotiqBlogPost: {
            totalCount: number;
            edges: Array<{
                node: PageContext;
            }>;
        };
        flotiqBlogAuthor: {
            id: string;
            name: string;
            slug: string;
            bio?: string;
            avatar: [{
                id: string;
                extension?: string;
            }];
        };
    };
}

const Author: React.FC<AuthorTemplateProps> = props => {
    const author = props.data.flotiqBlogAuthor;

    const edges = props.data.allFlotiqBlogPost.edges.filter(
        edge => {
            return edge.node.author && edge.node.author[0].slug === author.slug;
        }
    );
    const totalCount = edges.length;

    return (
        <IndexLayout>
            <Helmet>
                <html lang={config.lang}/>
                <title>
                    {author.id} - {config.title}
                </title>
                <meta name="description" content={author.bio}/>
                <meta property="og:site_name" content={config.title}/>
                <meta property="og:type" content="profile"/>
                <meta property="og:title" content={`${author.name} - ${config.title}`}/>
                <meta property="og:url" content={config.siteUrl + props.pathContext.slug}/>
                <meta property="article:publisher" content="https://www.facebook.com/ghost"/>
                <meta property="article:author" content="https://www.facebook.com/ghost"/>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:title" content={`${author.id} - ${config.title}`}/>
                <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug}/>
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
            <Wrapper>
                <header
                    className="no-cover"
                    css={[outer, SiteHeader]}
                >
                    <div css={inner}>
                        <SiteNav isHome={false}/>
                        <SiteHeaderContent>
                            <img
                                css={[AuthorProfileImage, AuthorProfileBioImage]}
                                src={process.env.GATSBY_FLOTIQ_BASE_URL + '/image/100x100/' + props.data.flotiqBlogAuthor.avatar[0].id + '.'  + props.data.flotiqBlogAuthor.avatar[0].extension}
                                alt={author.name}
                            />
                            <SiteTitle>{author.name}</SiteTitle>
                            {author.bio && <AuthorBio dangerouslySetInnerHTML={{__html: author.bio}} />}
                            <AuthorMeta>
                                <div css={HiddenMobile}>
                                    {totalCount > 1 && `${totalCount} posts`}
                                    {totalCount === 1 && '1 post'}
                                    {totalCount === 0 && 'No posts'} <Bull>•</Bull>
                                </div>
                            </AuthorMeta>
                        </SiteHeaderContent>
                    </div>
                </header>
                <main id="site-main" css={[SiteMain, outer]}>
                    <div css={inner}>
                        <div css={[PostFeed, PostFeedRaise]}>
                            {edges.map(({node}) => {
                                return <PostCard key={node.slug} post={node}/>;
                            })}
                        </div>
                    </div>
                </main>
                <Footer/>
            </Wrapper>
        </IndexLayout>
    );
};

export default Author;

export const pageQuery = graphql`
  query($author: String) {
    flotiqBlogAuthor(slug: {eq: $author}) {
      bio
      id
      name
      slug
      avatar {
        extension
        id
      }
    }
    allFlotiqBlogPost(sort: {fields: flotiqInternal___updatedAt, order: DESC}, limit: 2000) {
          edges {
          node {
            content
            excerpt
            id
            slug
            title
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
              slug
              avatar {
                extension
                id
              }
              bio
            }
            flotiqInternal {
              createdAt
            }
          }
        }
        totalCount
    }
  }
`;
