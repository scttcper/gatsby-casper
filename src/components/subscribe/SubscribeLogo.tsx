/* eslint-disable react/no-unused-prop-types */
import { graphql, StaticQuery } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import React from 'react';

import { css } from '@emotion/react';

import config from '../../website-config';

type SiteNavLogoProps = {
  logo?: any;
};

const SubscribeLogo = () => (
  <StaticQuery
    query={graphql`
      query SubscribeOverlayLogo {
        logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 100, width: 500, layout: FIXED)
          }
        }
      }
    `}
    render={({ logo }: SiteNavLogoProps) => {
      if (!logo) {
        return;
      }

      return (
        <img
          css={SubscribeOverlayLogo}
          className="subscribe-overlay-logo"
          src={getSrc(logo)}
          alt={config.title}
        />
      );
    }}
  />
);

const SubscribeOverlayLogo = css`
  position: fixed;
  top: 23px;
  left: 30px;
  height: 30px;
`;

export default SubscribeLogo;
