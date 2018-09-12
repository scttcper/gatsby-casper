import * as React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import '../styles/global';
import '../styles/shared';
import '../styles/screen';

import Header from '../components/header/Header';
import LayoutMain from '../components/LayoutMain';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';

type StaticQueryProps = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      logo?: string;
    };
  };
};

const IndexLayout: React.SFC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <Wrapper>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            {
              name: 'keywords',
              content: 'gatsbyjs, gatsby, javascript, sample, something',
            },
          ]}
        />
        <header
          className="site-header outer"
          style={{
            backgroundImage:
              'url(https://demo.ghost.io/content/images/2017/07/blog-cover.jpg)',
          }}
        >
          <div className="inner">
            <div className="site-header-content">
              <h1 className="site-title">
                {data.site.siteMetadata.logo ? (
                  <img
                    className="site-logo"
                    src="https://demo.ghost.io/content/images/2014/09/Ghost-Transparent-for-DARK-BG.png"
                    alt={data.site.siteMetadata.title}
                  />
                ) : (
                  data.site.siteMetadata.title
                )}
              </h1>
              <h2 className="site-description">
                { data.site.siteMetadata.description }
              </h2>
            </div>
            <SiteNav
              title={data.site.siteMetadata.title}
              siteUrl={data.site.siteMetadata.siteUrl}
            />
          </div>
        </header>
        <Header
          title={data.site.siteMetadata.title}
          siteUrl={data.site.siteMetadata.siteUrl}
        />
        <LayoutMain>{children}</LayoutMain>
      </Wrapper>
    )}
  />
);

export default IndexLayout;
