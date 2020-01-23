import {graphql} from 'gatsby';
import React from 'react';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
    inner,
    outer,
    PostFeed,
    PostFeedRaise,
    SiteDescription,
    SiteHeader,
    SiteHeaderContent,
    SiteMain,
    SiteTitle,
} from '../styles/shared';
import {PageContext} from './post';
import Helmet from 'react-helmet';
import config from '../website-config';

interface TagTemplateProps {
    pathContext: {
        slug: string;
    };
    pageContext: {
        tag: string;
    };
    data: {
        allFlotiqBlogTag: {
            edges: Array<{
                node: {
                    id: string;
                    description?: string;
                    tag: string;
                    image?: {
                        id: string;
                        extension: string;
                    };
                };
            }>;
        };
        allFlotiqBlogPost: {
            totalCount: number;
            edges: Array<{
                node: PageContext;
            }>;
        };
    };
}

const Tags: React.FC<TagTemplateProps> = props => {
    const tag = (props.pageContext.tag) ? props.pageContext.tag : '';
    const {edges, totalCount} = props.data.allFlotiqBlogPost;
    const tagData = props.data.allFlotiqBlogTag.edges.find(
        n => n.node.tag.toLowerCase() === tag.toLowerCase(),
    );

    return (
        <IndexLayout>
            <Helmet>
                <html lang={config.lang}/>
                <title>
                    {tag} - {config.title}
                </title>
                <meta
                    name="description"
                    content={tagData && tagData.node ? tagData.node.description : ''}
                />
                <meta property="og:site_name" content={config.title}/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content={`${tag} - ${config.title}`}/>
                <meta property="og:url" content={config.siteUrl + props.pathContext.slug}/>
                {config.facebook && <meta property="article:publisher" content={config.facebook}/>}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={`${tag} - ${config.title}`}/>
                <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug}/>
                {config.twitter && (
                    <meta
                        name="twitter:site"
                        content={`@${config.twitter.split('https://twitter.com/')[1]}`}
                    />
                )}
            </Helmet>
            <Wrapper>
                <header
                    className={`${tagData && tagData.node.image ? '' : 'no-cover'}`}
                    css={[outer, SiteHeader]}
                    style={{
                        backgroundImage:
                            tagData && tagData.node.image ?
                                `url('${tagData.node.image.id}')` :
                                '',
                    }}
                >
                    <div css={inner}>
                        <SiteNav isHome={false}/>
                        <SiteHeaderContent>
                            <SiteTitle>{tag}</SiteTitle>
                            <SiteDescription>
                                {tagData && tagData.node.description ? (
                                    tagData.node.description
                                ) : (
                                    <>
                                        A collection of {totalCount > 1 && `${totalCount} posts`}
                                        {totalCount === 1 && '1 post'}
                                        {totalCount === 0 && 'No posts'}
                                    </>
                                )}
                            </SiteDescription>
                        </SiteHeaderContent>
                    </div>
                </header>
                <main id="site-main" css={[SiteMain, outer]}>
                    <div css={inner}>
                        <div css={[PostFeed, PostFeedRaise]}>
                            {edges.map(({node}) => (
                                <PostCard key={node.slug} post={node}/>
                            ))}
                        </div>
                    </div>
                </main>
                <Footer/>
            </Wrapper>
        </IndexLayout>
    );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allFlotiqBlogTag {
    edges {
      node {
        description
        id
        tag
        image {
          extension
          id
        }
      }
    }
  }
    allFlotiqBlogPost(
      limit: 2000
      sort: { fields: [flotiqInternal___updatedAt], order: DESC }
      filter: {tags: {elemMatch: {tag: {eq: $tag}}}}
    ) {
      edges {
      node {
        content
        id
        slug
        title
        tags {
          id
          tag
          description
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
