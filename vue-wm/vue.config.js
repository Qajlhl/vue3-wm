// const { defineConfig } = require('@vue/cli-service')
// const { VantResolver } = require('unplugin-vue-components/resolvers');
// const ComponentsPlugin = require('unplugin-vue-components/webpack');
 
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     plugins: [
//       ComponentsPlugin({
//         resolvers: [VantResolver()],
//       }),
//     ],
//   },
// })

const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
 
module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  lintOnSave:false
};

// module.exports = 
// {
//     css:{
//         loaderOptions:{
//             postcss:{
//                 plugins:[
//                     require('postcss-pxtorem')({rootValue:16,propList:['*']})
//                 ]
//             }
//         }
//     }
//   }