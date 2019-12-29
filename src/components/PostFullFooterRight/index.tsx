import { Link } from 'gatsby';
import * as _ from 'lodash';
import * as React from 'react';

import {PostFullFooterRightDiv, AuthorCardButton} from './style';


export interface PostFullFooterRightProps {
  authorId: string;
}

const PostFullFooterRight: React.FC<PostFullFooterRightProps> = props => (
  <PostFullFooterRightDiv>
    <Link css={AuthorCardButton} to={`/author/${_.kebabCase(props.authorId)}/`}>
      Read More
    </Link>
  </PostFullFooterRightDiv>
);

export default PostFullFooterRight;
