import * as React from 'react';
import styled from 'react-emotion';
import { transparentize } from 'polished';
import { Link } from 'gatsby';

import { heights, dimensions, colors } from '../../styles/variables';
import Container from '../Container';
import SiteNavLogo from './SiteNavLogo';

interface BylineMultiple {
  primary_author: any;
}

// TODO: mark nav item current

const BylineMultiple: React.SFC<BylineMultiple> = ({ primary_author }) => (
  <section className="author-card">
  </section>
);

export default BylineMultiple;
