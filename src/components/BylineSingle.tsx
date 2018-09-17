import * as React from 'react';


interface BylineSingleProps {
  primary_author: any;
}

// TODO: mark nav item current

const BylineSingle: React.SFC<BylineSingleProps> = ({ primary_author }) => (
  <section className="post-full-authors">
  </section>
);

export default BylineSingle;
