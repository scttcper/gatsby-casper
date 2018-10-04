import { graphql } from 'gatsby';
import React from 'react';

import Footer from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import { inner, outer, PostFeed, PostFeedRaise, SiteDescription, SiteHeader, SiteHeaderContent, SiteTitle, SiteMain } from '../styles/shared';

interface TagTemplateProps {
  pageContext: {
    tag: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: {
        node: PageContext;
      }[];
    };
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image?: {
      childImageSharp: {
        sizes: any;
      };
    };
    title: string;
    date: string;
    tags: string[];
    author: {
      id: string;
      bio: string;
      avatar: {
        children: {
          fixed: {
            src: string;
          };
        }[];
      };
    };
  };
}

const Tags: React.SFC<TagTemplateProps> = props => {
  const tag = props.pageContext.tag;
  const { edges, totalCount } = props.data.allMarkdownRemark;

  return (
    <IndexLayout className={``}>
      <Wrapper>
        <header className={`${SiteHeader} ${outer} no-cover`}>
          <div className={`${inner}`}>
            <SiteNav isHome={false} />
            <SiteHeaderContent>
              <SiteTitle>{tag}</SiteTitle>
              {/* TODO: tag description */}
              <SiteDescription>
                A collection of {totalCount > 1 && `${totalCount} posts`}
                {totalCount === 1 && `1 post`}
                {totalCount === 0 && `No posts`}
              </SiteDescription>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" className={`${SiteMain} ${outer}`}>
          <div className={`${inner}`}>
            <div className={`${PostFeed} ${PostFeedRaise}`}>
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            image {
              childImageSharp {
                sizes(maxWidth: 1240) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(quality: 100) {
                      src
                    }
                  }
                }
              }
            }
          }
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
