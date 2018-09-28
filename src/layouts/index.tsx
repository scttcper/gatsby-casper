import * as React from 'react';

import '../assets/screen.min.css';

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
