import * as React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import IndexLayout from '../layouts';
import Footer from '../components/Footer';

type StaticQueryProps = {
  children?: any;
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        coverImage: string;
        logo?: string;
      };
    };
    allMarkdownRemark: {
      edges: {
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
            image?: string;
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

export default (props: StaticQueryProps) => {
  console.log(props);
  return (
    <IndexLayout>
      <Wrapper className="home-template">
        <header
          className="site-header outer"
          style={{
            backgroundImage: `url(${props.data.site.siteMetadata.coverImage})`,
          }}
        >
          <div className="inner">
            <div className="site-header-content">
              <h1 className="site-title">
                {props.data.site.siteMetadata.logo ? (
                  <img
                    className="site-logo"
                    src="https://demo.ghost.io/content/images/2014/09/Ghost-Transparent-for-DARK-BG.png"
                    alt={props.data.site.siteMetadata.title}
                  />
                ) : (
                  props.data.site.siteMetadata.title
                )}
              </h1>
              <h2 className="site-description">{props.data.site.siteMetadata.description}</h2>
            </div>
            <SiteNav isHome={true} title={props.data.site.siteMetadata.title} siteUrl={props.data.site.siteMetadata.siteUrl} logo={props.data.site.siteMetadata.logo} />
          </div>
        </header>
        <main id="site-main" className="site-main outer">
          <div className="inner">
            <div className="post-feed">
              {props.data.allMarkdownRemark.edges.map((post, idx) => {
                return (
                  <article key={idx} className="post-card">
                    {
                      <Link to={post.node.fields.slug} className="post-card-image-link">
                        <div
                          className="post-card-image"
                          style={{
                            backgroundImage: `url(${post.node.frontmatter.image})`,
                          }}
                        />
                      </Link>
                    }
                    <div className="post-card-content">
                      <Link className="post-card-content-link" to={post.node.fields.slug}>
                        <header className="post-card-header">
                          {post.node.frontmatter.tags && <span className="post-card-tags">{post.node.frontmatter.tags[0]}</span>}
                          <h2 className="post-card-title">{post.node.frontmatter.title}</h2>
                        </header>
                        <section className="post-card-excerpt">
                          <p>{post.node.excerpt}</p>
                        </section>
                      </Link>
                      <footer className="post-card-meta">
                        <ul className="author-list">
                          <li className="author-list-item">
                            <div className="author-name-tooltip">Ghost</div>

                            <a href="/author/ghost/" className="static-avatar">
                              <img
                                className="author-profile-image"
                                src="https://demo.ghost.io/content/images/2017/07/ghost-icon.png"
                                alt="Ghost"
                              />
                            </a>
                          </li>
                        </ul>

                        <span className="reading-time">{post.node.timeToRead} min read</span>
                      </footer>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </main>
        {props.children}

        <Footer site={props.data.site} />
      </Wrapper>
    </IndexLayout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        logo
        siteUrl
        coverImage
      }
    }
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            tags
            image
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
