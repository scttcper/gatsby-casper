import * as React from 'react';
import { Link } from 'gatsby';
import { css } from 'react-emotion';

const SiteNavLogoStyles = css`
  flex-shrink: 0;
  display: block;
  margin-right: 24px;
  padding: 11px 0;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1em;
  font-weight: bold;
  letter-spacing: -0.5px;

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    width: auto;
    height: 21px;
  }
`;

interface SiteNavLogoProps {
  logo?: string;
  title: string;
}

const SiteNavLogo: React.SFC<SiteNavLogoProps> = props =>
  props.logo ? (
    <Link className={`${SiteNavLogoStyles}`} to="/">
      <img src={props.logo} alt={props.title} />
    </Link>
  ) : (
    <Link className={`${SiteNavLogoStyles}`} to="/">
      {props.title}
    </Link>
  );
export default SiteNavLogo;
