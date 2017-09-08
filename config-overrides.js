
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    // do stuff with the webpack config...
    //for all environment
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess(config, env, {
        modifyVars: { "@primary-color": "#1DA57A" },
    });


    //config for production
    if (env === "production") {
    }

    return config;
};