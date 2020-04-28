import { graphql, Link } from 'gatsby';
import React from 'react';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import SiteNav from '../components/header/SiteNav';
import { PostCard } from '../components/PostCard';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, PostFeed, SiteHeader, SiteNavMain } from '../styles/shared';
import { PageContext } from '../templates/post';

interface NotFoundTemplateProps {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const NotFoundPage: React.FC<NotFoundTemplateProps> = props => {
  const { edges } = props.data.allMarkdownRemark;

  return (
    <IndexLayout>
      <Wrapper>
        <header css={[SiteHeader, outer]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
        </header>
        <main id="site-main" css={[outer, ErrorTemplate]}>
          <div css={inner}>
            <section style={{ textAlign: 'center', paddingBottom: '10vw' }}>
              <ErrorCode>404</ErrorCode>
              <ErrorDescription>Page not found</ErrorDescription>
              <Link css={ErrorLink} to="">
                Go to the front page →
              </Link>
            </section>
            <div css={PostFeed}>
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
      </Wrapper>
    </IndexLayout>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fluid(quality: 100 srcSetBreakpoints: [40, 80, 120]) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;

const ErrorTemplate = css`
  padding: 14vw 4vw 6vw;
`;

const ErrorCode = styled.h1`
  margin: 0;
  font-size: 12vw;
  line-height: 1em;
  letter-spacing: -5px;
  opacity: 0.3;
`;

const ErrorDescription = styled.p`
  margin: 0;
  color: ${colors.midgrey};
  font-size: 3rem;
  line-height: 1.3em;
  font-weight: 400;
`;

const ErrorLink = css`
  display: inline-block;
  margin-top: 5px;
`;

export default NotFoundPage;
