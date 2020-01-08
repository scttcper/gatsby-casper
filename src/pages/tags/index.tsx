import { graphql, Link } from "gatsby";
import * as React from "react";


import SiteNav from '../../components/header/SiteNav';
import Wrapper from "../../components/Wrapper";
import IndexLayout from "../../layouts";
import { inner, outer, SiteDescription, SiteHeader, SiteHeaderContent, SiteMain, SiteTitle } from "../../styles/shared";
import { PageContext } from "../../templates/post";
import Footer from "../../components/Footer";
import {TagFeed, TagBlock} from './style';

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
          <div css={inner}>
            <SiteNav isHome={false} />
            <SiteHeaderContent>
              <SiteTitle>All Tags</SiteTitle>
              <SiteDescription>
                  We have {tags.length} tags here!
              </SiteDescription>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={TagFeed}>
              {tags.map(tag => (
                <Link css={TagBlock} to={`/tags/${_.kebabCase(tag)}/`}>
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </main>
        <Footer />
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
