import { Link, StaticQuery, graphql } from 'gatsby';
import { setLightness } from 'polished';
import * as React from 'react';
import styled, { css } from 'react-emotion';

import { colors } from '../styles/colors';
import { outer, inner } from '../styles/shared';

const SiteFooter = css`
  position: relative;
  padding-top: 20px;
  padding-bottom: 60px;
  color: #fff;
  background: ${setLightness('0.0015', colors.darkgrey)};
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  a {
    color: rgba(255, 255, 255, 0.7);
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const SiteFooterNav = styled.nav`
  display: flex;

  a {
    position: relative;
    margin-left: 20px;
  }

  a:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type:before {
    display: none;
  }
  @media (max-width: 650px) {
    a:first-child {
      margin-left: 0;
    }
  }
`;

export interface FooterProps {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      facebook: string;
      twitter: string;
      logo?: string;
    };
  };
}

const Footer: React.SFC = () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          site {
            siteMetadata {
              title
              siteUrl
              facebook
              twitter
            }
          }
        }
      `}
      render={({ site }: FooterProps) => (
        <footer className={`${outer} ${SiteFooter}`}>
          <div className={`${inner} ${SiteFooterContent}`}>
            <section className="copyright">
              <Link to={site.siteMetadata.siteUrl}>{site.siteMetadata.title}</Link> &copy; swag
            </section>
            <SiteFooterNav>
              <Link to={site.siteMetadata.siteUrl}>Latest Posts</Link>
              {site.siteMetadata.facebook && (
                <a href={site.siteMetadata.facebook} target="_blank" rel="noopener">
                  Facebook
                </a>
              )}
              {site.siteMetadata.twitter && (
                <a href={site.siteMetadata.twitter} target="_blank" rel="noopener">
                  Twitter
                </a>
              )}

              <a href="https://ghost.org" target="_blank" rel="noopener">
                Ghost
              </a>
            </SiteFooterNav>
          </div>
        </footer>
      )}
    />
  );
};

export default Footer;
