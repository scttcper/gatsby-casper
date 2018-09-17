import * as React from 'react';
import { graphql, Link } from 'gatsby';
import * as _ from 'lodash';

import Page from '../components/Page';
import Container from '../components/Container';
import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import BylineSingle from '../components/BylineSingle';

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        logo: string;
        author: {
          name: string;
          url: string;
        };
      };
    };
    markdownRemark: {
      html: string;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        featureImage: string;
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
  };
}

const PageTemplate: React.SFC<PageTemplateProps> = props => {
  const post = props.data.markdownRemark;
  console.log(props);
  return (
    <IndexLayout>
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
            <article className="post-full {{post_class}} {{#unless feature_image}}no-image{{/unless}}">
              <header className="post-full-header">
                <section className="post-full-meta">
                  <time className="post-full-meta-date" dateTime={post.frontmatter.date}>
                    {post.frontmatter.userDate}
                  </time>
                  <span className="date-divider">/</span>
                  <Link to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>{post.frontmatter.tags[0]}</Link>
                </section>
                <h1 className="post-full-title">{post.frontmatter.title}</h1>
              </header>

              {post.frontmatter.featureImage && (
                <figure className="post-full-image" style={{ backgroundImage: `url(${post.frontmatter.featureImage})` }} />
              )}
              <section className="post-full-content">
                <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
              </section>

              {/* The big email subscribe modal content */}

              <section className="subscribe-form">
                <h3 className="subscribe-form-title">Subscribe to {props.data.site.siteMetadata.title}</h3>
                <p>Get the latest posts delivered right to your inbox</p>

                {/* TODO: setup form to submit somewhere */}
                <form method="post" action="/subscribe/">
                  {/* This is required for the form to work correctly  */}
                  <div className="form-group">
                    <input className="subscribe-email" type="email" name="email" placeholder="youremail@example.com" />
                  </div>
                  <button type="submit">
                    <span>Subscribe</span>
                  </button>
                </form>
              </section>

              <footer className="post-full-footer">
                <section className="author-card">
                  {/* TODO: default avatar */}
                  {/* TODO: author page url */}
                  <img className="author-profile-image" src={post.frontmatter.author.avatar.children[0].fixed.src} alt={name} />
                  <section className="author-card-content">
                    <h4 className="author-card-name">
                      <a href="{url}">{post.frontmatter.author.id}</a>
                    </h4>
                    {post.frontmatter.author.bio ? (
                      <p>{post.frontmatter.author.bio}</p>
                    ) : (
                      <p>
                        Read <a href="url">more posts</a> by this author.
                      </p>
                    )}
                  </section>
                  
                </section>
                <div className="post-full-footer-right">
                    <a className="author-card-button" href="{{url}}">Read More</a>
                  </div>
              </footer>
            </article>
          </div>
        </main>
        {/* <h1>{post.frontmatter.title}</h1> */}
      </Wrapper>
    </IndexLayout>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        logo
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        tags
        featureImage: feature_image
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
  }
`;
