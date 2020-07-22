import { graphql, Link } from "gatsby";
import React from "react";
import dateformat from "dateformat";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { makeBlogPath } from "../utils";

export default ({ data }) => {
  console.log({ data });
  return (
    <MDXProvider
      components={{
        p: (props) => (
          <p
            {...props}
            style={{
              color: "red",
            }}
          />
        ),
      }}
    >
      <h1>My Gatsby Blog</h1>
      <p>
        <a href="https://www.gatsbyjs.org/packages/gatsby-source-graphql/">
          Using gatsby-source-graphql
        </a>
      </p>
      {data.cms.blogPosts.map((blog, i) => (
        <Link key={i} to={makeBlogPath(blog)}>
          <h2>
            {dateformat(blog.createdAt, `fullDate`)} - {blog.title}
          </h2>
        </Link>
      ))}
      <hr />
      {data.allFile.edges.map(({ node: { childMdx } }) => (
        <MDXRenderer key={childMdx.id}>{childMdx.body}</MDXRenderer>
      ))}
    </MDXProvider>
  );
};

export const query = graphql`
  query {
    cms {
      blogPosts(where: { status: PUBLISHED }, orderBy: createdAt_DESC) {
        title
        createdAt
        slug
      }
    }
    allFile {
      edges {
        node {
          name
          childMdx {
            id
            type
            body
          }
        }
      }
    }
  }
`;
