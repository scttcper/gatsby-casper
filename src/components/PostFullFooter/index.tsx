import * as React from "react";

import { PostFullFoot } from "./style";

const PostFullFooter: React.FC = props => (
  <PostFullFoot>{props.children}</PostFullFoot>
);

export default PostFullFooter;
