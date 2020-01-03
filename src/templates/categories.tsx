import { graphql } from "gatsby";
import React from "react";

import Footer from "../components/Footer";
import SiteNav from "../components/header/SiteNav";
import PostCard from "../components/PostCard";
import Wrapper from "../components/Wrapper";
import IndexLayout from "../layouts";
import {
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle
} from "../styles/shared";
import { PageContext } from "./post";
import Helmet from "react-helmet";
import config from "../website-config";

interface CategoryTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    category: string;
  };
  data: {
    allCategoryYaml: {
      edges: Array<{
        node: {
          id: string;
          description: string;
          image?: {
            childImageSharp: {
              fluid: any;
            };
          };
        };
      }>;
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const Categories: React.FC<CategoryTemplateProps> = props => {
  const category = props.pageContext.category ? props.pageContext.category : "";
  const { edges, totalCount } = props.data.allMarkdownRemark;
  const categoryData = props.data.allCategoryYaml.edges.find(
    n => n.node.id.toLowerCase() === category.toLowerCase()
  );

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {category} - {config.title}
        </title>
        <meta
          name="description"
          content={
            categoryData && categoryData.node
              ? categoryData.node.description
              : ""
          }
        />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${category} - ${config.title}`} />
        <meta
          property="og:url"
          content={config.siteUrl + props.pathContext.slug}
        />
        {config.facebook && (
          <meta property="article:publisher" content={config.facebook} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category} - ${config.title}`} />
        <meta
          name="twitter:url"
          content={config.siteUrl + props.pathContext.slug}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split("https://twitter.com/")[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <header
          className={`${
            categoryData && categoryData.node.image ? "" : "no-cover"
          }`}
          css={[outer, SiteHeader]}
          style={{
            backgroundImage:
              categoryData && categoryData.node.image
                ? `url('${categoryData.node.image.childImageSharp.fluid.src}')`
                : ""
          }}
        >
          <div css={inner}>
            <SiteNav isHome={false} />
            <SiteHeaderContent>
              <SiteTitle>{category}</SiteTitle>
              <SiteDescription>
                {categoryData && categoryData.node.description ? (
                  categoryData.node.description
                ) : (
                  <>
                    A collection of {totalCount > 1 && `${totalCount} posts`}
                    {totalCount === 1 && "1 post"}
                    {totalCount === 0 && "No posts"}
                  </>
                )}
              </SiteDescription>
            </SiteHeaderContent>
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed, PostFeedRaise]}>
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

export default Categories;

export const pageQuery = graphql`
  query($category: String) {
    allCategoryYaml {
      edges {
        node {
          id
          description
          image {
            childImageSharp {
              fluid(maxWidth: 3720) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { in: [$category] }, draft: { ne: true } }
      }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            description
            tags
            category
            date
            image {
              childImageSharp {
                fluid(maxWidth: 1240) {
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
                    fixed(quality: 90) {
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
