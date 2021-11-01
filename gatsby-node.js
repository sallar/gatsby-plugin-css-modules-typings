const webpack = require("webpack")

const CSS_PATTERN = /\.css$/
const MODULE_CSS_PATTERN = /\.module\.css$/

const isCssRules = rule =>
  rule.test &&
  (rule.test.toString() === CSS_PATTERN.toString() ||
    rule.test.toString() === MODULE_CSS_PATTERN.toString())

const findCssRules = config =>
  config.module.rules.find(
    rule => Array.isArray(rule.oneOf) && rule.oneOf.every(isCssRules)
  )

exports.onCreateWebpackConfig = ({
  getConfig,
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  if (process.env.NODE_ENV !== "development") {
    return
  }

  const config = getConfig()
  const cssRules = findCssRules(config)

  if (cssRules) {
    cssRules.oneOf.forEach(statement => {
      statement.use = statement.use.map(item => {
        if (
          item.loader.match(/\/css-loader\//) &&
          item.options.modules === true
        ) {
          item.loader = "typings-for-css-modules-loader"
          item.options = {
            ...item.options,
            namedExport: true,
          }
        }
        return item
      })
    })
  }

  config.plugins.push(new webpack.WatchIgnorePlugin({ paths: [/css\.d\.ts$/] }))

  actions.replaceWebpackConfig(config)
}
