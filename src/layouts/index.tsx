import { Global, css } from '@emotion/core';
import { darken, lighten } from 'polished';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import './global.css';
import { colors } from '../styles/colors';
// @ts-ignore
import favicon from '../../src/favicon.ico';

interface IndexProps {
  className?: string;
}

const IndexLayout: React.FC<IndexProps> = props => {
  return (
    <div className={props.className}>
      <Helmet>
        <link rel="icon" href={favicon} type="image/x-icon" />
      </Helmet>
      {props.children}
    </div>
  );
};

export default IndexLayout;
