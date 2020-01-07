import { graphql, Link } from "gatsby";
import * as React from "react";


import SiteNavLogo from "../../components/header/SiteNavLogo";
import Wrapper from "../../components/Wrapper";
import IndexLayout from "../../layouts";
import { inner, outer, PostFeed, SiteHeader } from "../../styles/shared";
import { PageContext } from "../../templates/post";

import {SiteNavCenter, ErrorTemplate, ErrorCode, ErrorDescription, ErrorLink} from './style';
import _ from "lodash";

interface TagPageProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const TagPage: React.FC<TagPageProps> = props => {
  const tags = _.uniq(
    _.flatten(
      props.data.allMarkdownRemark.edges.map(edge => {
        return _.castArray(_.get(edge, 'node.frontmatter.tags', []));
      }),
    ),
  );

  return (
    <IndexLayout>
      <Wrapper>
        <header css={[SiteHeader, outer]}>
          <div className="inner">
            <SiteNavCenter>
              <SiteNavLogo />
            </SiteNavCenter>
          </div>
        </header>
        <main id="site-main" css={[ErrorTemplate, outer]}>
          <div css={inner}>
            <section style={{ textAlign: "center" }}>
              <ErrorCode>404</ErrorCode>
              <ErrorDescription>Page not found</ErrorDescription>
              <Link css={ErrorLink} to="">
                Go to the front page →
              </Link>
            </section>
          </div>
        </main>
        <aside css={outer}>
          <div css={inner}>
            <div css={PostFeed}>
              {tags.map(tag => (
                <div>{tag}</div>
              ))}
            </div>
          </div>
        </aside>
      </Wrapper>
    </IndexLayout>
  );
};

export default TagPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;
