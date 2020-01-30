import { Link, StaticQuery, graphql } from 'gatsby';
import * as React from 'react';
import styled from '@emotion/styled';
import * as _ from 'lodash';

import { colors } from '../styles/colors';

export interface ReadNextCardStylesProps {
  coverImage: string;
}

const ReadNextCardStyles = styled.article<ReadNextCardStylesProps>`
  position: relative;
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 40px;
  padding: 25px;
  color: #000;
  background: transparent;
  background-size: cover;
  border-radius: 5px;


  :before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    background: transparent;
    border-radius: 5px;
    backdrop-filter: blur(2px);
  }
`;

const ReadNextCardHeader = styled.header`
  position: relative;
  z-index: 50;
  padding-top: 20px;
`;

const ReadNextCardHeaderTitle = styled.h3`
  margin: 0 0 20px 0;
  padding: 0;
  color: #000;
  font-size: 3rem;
  line-height: 1.2em;
  letter-spacing: 1px;

  a {
    color: #000;
    font-weight: 600;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }
`;

const ReadNextCardContent = styled.div`
  position: relative;
  z-index: 50;
  flex-grow: 1;
  display: flex;
  font-size: 1.7rem;

  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    list-style: none;
    margin-bottom: 20px;
  }

  li {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    line-height: 1.25em;
    font-weight: 200;
    letter-spacing: -0.5px;
  }

  li a {
    display: block;
    padding: 15px 0;
    border-bottom: rgba(255, 255, 255, 0.3) 1px solid;
    color: #000;
    font-weight: 400;
    vertical-align: top;
    transition: opacity 0.3s ease, color .2s ease;
    position: relative;
  }

    li a:after {
      content: '';
      width: 80px;
      height: 1px;
      background-color: #dedede;
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
    }

  li:first-of-type a {
    padding-top: 10px;
  }

  li a:hover {
    opacity: 1;
    text-decoration: none;
    color: #319685;
  }
`;

const ReadNextCardFooter = styled.footer`
  position: relative;
  margin: 5px 0 5px 0;

  a {
    color: ${colors.flotiqGreen};
    font-weight: 600;
    transition: color .2s ease;
  }

  a:hover {
    color: black;
    text-decoration: none;
  }
`;

export interface ReadNextProps {
  tags: [{
      id: string;
      tag: string;
  }];
  relatedPosts: {
    totalCount: number;
    edges: Array<{
      node: {
          title: string;
          slug: string;
      };
    }>;
  };
}

export interface ReadNextQuery {
  header: {
    childImageSharp: {
      fluid: any;
    };
  };
}

const ReadNextCard: React.FC<ReadNextProps> = props => {
  return (
    <StaticQuery
      query={graphql`
        query ReadNextQuery {
          header: file(relativePath: { eq: "img/blog-cover.jpg" }) {
            childImageSharp {
              # Specify the image processing specifications right in the query.
              # Makes it trivial to update as your page's design changes.
              fluid(maxWidth: 2000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      // tslint:disable-next-line:react-this-binding-issue
      render={({ header }: ReadNextQuery) => (
        <ReadNextCardStyles coverImage={header.childImageSharp.fluid.src}>
          <ReadNextCardHeader>
            <ReadNextCardHeaderTitle>
              <Link to={`/tags/${_.kebabCase(props.tags[0].tag)}/`}>{props.tags[0].tag}</Link>
            </ReadNextCardHeaderTitle>
          </ReadNextCardHeader>
          <ReadNextCardContent>
            <ul>
              {props.relatedPosts.edges.map(n => {
                return (
                  <li key={n.node.title}>
                    <Link to={n.node.slug}>{n.node.title}</Link>
                  </li>
                );
              })}
            </ul>
          </ReadNextCardContent>
          <ReadNextCardFooter>
            <Link to={`/tags/${_.kebabCase(props.tags[0].tag)}/`}>
              {props.relatedPosts.totalCount > 1 &&
                `See all ${props.relatedPosts.totalCount} posts`}
              {props.relatedPosts.totalCount === 1 && '1 post'}
              {props.relatedPosts.totalCount === 0 && 'No posts'} →
            </Link>
          </ReadNextCardFooter>
        </ReadNextCardStyles>
      )}
    />
  );
};

export default ReadNextCard;
