import { graphql, Link } from 'gatsby';
import * as React from 'react';
import styled, { css } from 'react-emotion';

import SiteNavLogo from '../components/header/SiteNavLogo';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, PostFeed, SiteHeader } from '../styles/shared';
import { PageContext } from '../templates/post';

const SiteNavCenter = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .site-nav-logo {
    margin-right: 0;
  }
`;

const ErrorTemplate = css`
  padding: 7vw 4vw;
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

interface NotFoundTemplateProps {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      edges: {
        node: PageContext;
      }[];
    };
  };
}

const NotFoundPage: React.SFC<NotFoundTemplateProps> = props => {
  const { edges } = props.data.allMarkdownRemark;

  return (
    <IndexLayout>
      <Wrapper>
        <header className={`${SiteHeader} ${outer}`}>
          <div className="inner">
            <SiteNavCenter>
              <SiteNavLogo />
            </SiteNavCenter>
          </div>
        </header>
        <main id="site-main" className={`${ErrorTemplate} ${outer}`}>
          <div className={`${inner}`}>
            <section style={{ textAlign: 'center' }}>
              <ErrorCode>404</ErrorCode>
              <ErrorDescription>Page not found</ErrorDescription>
              <Link className={`${ErrorLink}`} to={''}>
                Go to the front page →
              </Link>
            </section>
          </div>
        </main>
        <aside className={`${outer}`}>
          <div className={`${inner}`}>
            <div className={`${PostFeed}`}>
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </aside>
      </Wrapper>
    </IndexLayout>
  );
};

export default NotFoundPage;

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
                    fixed(quality: 100) {
                      src
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
