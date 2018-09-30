import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import * as _ from 'lodash';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'react-emotion';
import { setLightness } from 'polished';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import InfinityIcon from '../components/icons/infinity';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import PostContent from '../components/PostContent';
import SubscribeForm from '../components/SubscribeForm';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';

const PostFullHeader = styled.header`
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
  color: ${colors.blue};
`;

const PostFullTitle = styled.h1`
  margin: 0;
  color: ${setLightness('0.05', colors.darkgrey)};
  @media (max-width: 500px) {
    font-size: 2.9rem;
  }
`;

const DateDivider = styled.span`
  display: inline-block;
  margin: 0 6px 1px;
`;

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        coverImage: string;
        facebook: string;
        twitter: string;
        logo: string;
        author: {
          name: string;
          url: string;
        };
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
            sizes: any;
          };
        };
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
    };
    relatedPosts: {
      totalCount: number;
      edges: {
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
          };
          fields: {
            slug: string;
          };
        };
      }[];
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

const PageTemplate: React.SFC<PageTemplateProps> = props => {
  const post = props.data.markdownRemark;
  const siteMetadata = props.data.site.siteMetadata;

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <title>{post.frontmatter.title}</title>
      </Helmet>
      <Wrapper className="post-template">
        <header className="site-header outer">
          <div className="inner">
            <SiteNav
              isHome={false}
              title={props.data.site.siteMetadata.title}
              siteUrl={props.data.site.siteMetadata.siteUrl}
              logo={props.data.site.siteMetadata.logo}
            />
          </div>
        </header>
        <main id="site-main" className="site-main outer">
          <div className="inner">
            <article className="post-full {{#unless feature_image}}no-image{{/unless}}">
              <PostFullHeader>
                <PostFullMeta>
                  <PostFullMetaDate dateTime={post.frontmatter.date}>{post.frontmatter.userDate}</PostFullMetaDate>
                  {post.frontmatter.tags &&
                    post.frontmatter.tags.length > 0 && (
                      <>
                        <DateDivider>/</DateDivider>
                        <Link to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>{post.frontmatter.tags[0]}</Link>
                      </>
                    )}
                </PostFullMeta>
                <PostFullTitle>{post.frontmatter.title}</PostFullTitle>
              </PostFullHeader>

              {post.frontmatter.image.childImageSharp && (
                <figure className="post-full-image">
                  <Img style={{ height: '100%' }} sizes={post.frontmatter.image.childImageSharp.sizes} />
                </figure>
              )}
              <PostContent htmlAst={post.htmlAst} />

              {/* The big email subscribe modal content */}
              <SubscribeForm title={siteMetadata.title}/>

              <footer className="post-full-footer">
                <section className="author-card">
                  {/* TODO: default avatar */}
                  {/* TODO: author page url */}
                  <img
                    className="author-profile-image"
                    src={post.frontmatter.author.avatar.children[0].fixed.src}
                    alt={post.frontmatter.author.id}
                  />
                  <section className="author-card-content">
                    <h4 className="author-card-name">
                      <Link to={`/author/${_.kebabCase(post.frontmatter.author.id)}/`}>{post.frontmatter.author.id}</Link>
                    </h4>
                    {post.frontmatter.author.bio ? (
                      <p>{post.frontmatter.author.bio}</p>
                    ) : (
                      <p>
                        Read <Link to={`/author/${_.kebabCase(post.frontmatter.author.id)}/`}>more posts</Link> by this author.
                      </p>
                    )}
                  </section>
                </section>
                <div className="post-full-footer-right">
                  <Link className="author-card-button" to={`/author/${_.kebabCase(post.frontmatter.author.id)}/`}>
                    Read More
                  </Link>
                </div>
              </footer>
            </article>
          </div>
        </main>

        {/* Links to Previous/Next posts */}
        <aside className="read-next outer">
          <div className="inner">
            <div className="read-next-feed">
              {props.data.relatedPosts && (
                <article className="read-next-card" style={{ backgroundImage: `url(${props.data.site.siteMetadata.coverImage})` }}>
                  <header className="read-next-card-header">
                    <small className="read-next-card-header-sitetitle">&mdash; {props.data.site.siteMetadata.title} &mdash;</small>
                    <h3 className="read-next-card-header-title">
                      <Link to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>{post.frontmatter.tags[0]}</Link>
                    </h3>
                  </header>
                  <div className="read-next-divider">
                    <InfinityIcon />
                  </div>
                  <div className="read-next-card-content">
                    <ul>
                      {props.data.relatedPosts.edges.map(n => {
                        return (
                          <li key={n.node.frontmatter.title}>
                            <Link to={n.node.fields.slug}>{n.node.frontmatter.title}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <footer className="read-next-card-footer">
                    <Link to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>
                      {props.data.relatedPosts.totalCount > 1 && `See all ${props.data.relatedPosts.totalCount} posts`}
                      {props.data.relatedPosts.totalCount === 1 && `1 post`}
                      {props.data.relatedPosts.totalCount === 0 && `No posts`} →
                    </Link>
                  </footer>
                </article>
              )}

              {props.pageContext.prev && <PostCard post={props.pageContext.prev} />}
              {props.pageContext.next && <PostCard post={props.pageContext.next} />}
            </div>
          </div>
        </aside>
        <Footer siteMetadata={siteMetadata} />
      </Wrapper>
    </IndexLayout>
  );
};

export default PageTemplate;

export const query = graphql`
  query($slug: String, $primaryTag: String) {
    site {
      siteMetadata {
        title
        description
        logo
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
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }, limit: 3) {
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
