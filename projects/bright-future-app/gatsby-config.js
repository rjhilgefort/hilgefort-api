module.exports = {
  siteMetadata: {
    title: 'Bright Future Preschool',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-reason',
      options: {
        derivePathFromComponentName: true,
      },
    },
  ],
}
