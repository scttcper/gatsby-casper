import * as React from 'react';
import { Link } from 'gatsby';

interface SiteNavLogoProps {
  logo?: string;
  title: string;
}

const SiteNavLogo: React.SFC<SiteNavLogoProps> = props =>
  props.logo ? (
    <Link className="site-nav-logo" to="/">
      <img src={props.logo} alt={props.title} />
    </Link>
  ) : (
    <Link className="site-nav-logo" to="/">
      {props.title}
    </Link>
  );
export default SiteNavLogo;
