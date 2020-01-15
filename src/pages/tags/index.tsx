import { graphql, Link } from "gatsby";
import * as React from "react";


import SiteNav from '../../components/header/SiteNav';
import Wrapper from "../../components/Wrapper";
import IndexLayout from "../../layouts";
import { inner, outer, SiteDescription, SiteHeader, SiteHeaderContent, SiteMain, SiteTitle } from "../../styles/shared";
import { PageContext } from "../../templates/post";
import Footer from "../../components/Footer";
import {TagFeed, TagBlock, TagDiv} from './style';

import _ from "lodash";

interface TagPageProps {
  data: {
    countData: {
      totalCount: number;
    };
    tagsData: {
      edges: Array<{
        node: PageContext;
      }>;
    }
  };
}

const TagPage: React.FC<TagPageProps> = props => {
  const tags: string[] = _.uniq(
    _.flatten(
      props.data.tagsData.edges.map(edge => {
        return _.castArray(_.get(edge, 'node.frontmatter.tags', []));
      }),
    ),
  );
  tags.sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  var tagInfo = new Object();
  tags.forEach(function(tag) {
    var count = 0;
    // Find posts whose tag include argument.
    props.data.tagsData.edges.forEach(function(edge) {
      const arr = _.castArray(_.get(edge, 'node.frontmatter.tags', []));
      if (arr.indexOf(tag) != -1) {
        count++;
      }
    });
    (tagInfo as any)[tag] = count;
  });

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
            <TagDiv>
              <div css={TagFeed}>
                {tags.map((tag, index) => (
                  <Link css={TagBlock} to={`/tags/${_.kebabCase(tag)}/`} key={index}>
                    # {tag}({(tagInfo as any)[tag]})
                  </Link>
                ))}
              </div>
            </TagDiv>

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
    tagsData: allMarkdownRemark {
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
