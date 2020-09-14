module.exports = {
  siteMetadata: {
    title: `Altmeta.org`,
    description: `The riveting weblog entries of Zack Spencer`,
    author: `Zack Spencer`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `types/graphql-type.ts`,
        documentPaths: [
          './src/**/*.{ts,tsx}',
          './node_modules/gatsby-*/**/*.js',
          './gatsby-node.js',
        ],
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-gitinfo`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              enableCustomId: true,
              icon: false,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Solarized Light',
              extensions: [
                `${__dirname}/extensions/shanoor.vscode-nginx-0.6.0.vsix`,
                `${__dirname}/extensions/silvenon.mdx-0.1.0.vsix`,
                `${__dirname}/extensions/hogashi.crontab-syntax-highlight-0.0.1.vsix`,
              ],
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-nullish-coalescing-operator`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
