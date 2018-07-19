const extraNodeModules = require('node-libs-react-native')
extraNodeModules.vm = require.resolve('vm-browserify')

module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  },
  extraNodeModules
};
