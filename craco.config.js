const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#31394D',
              '@border-radius-base': '6px',
              '@font-family': 'DM Sans',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
