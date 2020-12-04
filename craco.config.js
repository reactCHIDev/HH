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
              '@input-height-base': '48px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
