import * as React from 'react';
import { graphql, Link } from 'gatsby';
import * as _ from 'lodash';

import Page from '../components/Page';
import Container from '../components/Container';
import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import BylineMultiple from '../components/BylineMultiple';

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
      };
    };
  };
}

const PageTemplate: React.SFC<PageTemplateProps> = props => {
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
                  <time className="post-full-meta-date" dateTime={props.data.markdownRemark.frontmatter.date}>
                    {props.data.markdownRemark.frontmatter.userDate}
                  </time>
                  <span className="date-divider">/</span>
                  <Link to={`/tags/${_.kebabCase(props.data.markdownRemark.frontmatter.tags[0])}/`}>
                    {props.data.markdownRemark.frontmatter.tags[0]}
                  </Link>
                </section>
                <h1 className="post-full-title">{props.data.markdownRemark.frontmatter.title}</h1>
              </header>

              {props.data.markdownRemark.frontmatter.featureImage && (
                <figure
                  className="post-full-image"
                  style={{ backgroundImage: `url(${props.data.markdownRemark.frontmatter.featureImage})` }}
                />
              )}
              <section className="post-full-content">
                <div className="post-content" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
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

              <footer class="post-full-footer">
                <BylineMultiple/>
              </footer>

            </article>
          </div>
        </main>
        {/* <h1>{props.data.markdownRemark.frontmatter.title}</h1> */}
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
      }
    }
  }
`;
