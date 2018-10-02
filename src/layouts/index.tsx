import * as React from 'react';

import '../assets/global.css';

interface IndexProps {
  className?: string
}

const IndexLayout: React.SFC<IndexProps> = props => {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
};

export default IndexLayout;
