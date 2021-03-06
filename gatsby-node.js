/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const result = await graphql(`
    query BlogPosts {
      allMdx(
        filter: { fileAbsolutePath: { glob: "**/weblog/**" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              legacyPath
              title
            }
          }
        }
      }
    }
  `);
  const edges = result.data.allMdx.edges;
  edges.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.tsx`),
      context: {
        slug: node.fields.slug,
        prev: index <= 0 ? null : edges[index - 1].node,
        next: index >= edges.length - 1 ? null : edges[index + 1].node,
      },
    });
    if (node.frontmatter.legacyPath != null) {
      createRedirect({
        fromPath: node.frontmatter.legacyPath,
        toPath: node.fields.slug,
        isPermanent: true,
      });
      createPage({
        path: node.frontmatter.legacyPath,
        component: path.resolve(`./src/templates/redirect.tsx`),
        context: {
          slug: node.fields.slug,
        },
      });
    }
  });
  const features = await graphql(`
    query Features {
      allMdx(
        filter: { fileAbsolutePath: { glob: "**/features/**" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              legacyPath
              title
            }
          }
        }
      }
    }
  `);
  features.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/feature.tsx`),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/backend/)) {
    page.matchPath = `/backend/*`;

    // Update the page.
    createPage(page);
  }
};
