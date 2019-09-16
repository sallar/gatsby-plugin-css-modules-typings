# gatsby-plugin-css-modules-typings

A Gatsby plugin that provides typings for css modules.

Based on [https://github.com/RobertMenke/gatsby-transformer-typescript-css-modules](https://github.com/RobertMenke/gatsby-transformer-typescript-css-modules)

## Install

```sh
npm i gatsby-plugin-css-modules-typings
```

Then add the plugin to your `gatsby-config.js` file:

```js
plugins: [
  // ...
  "gatsby-plugin-css-modules-typings",
]
```

Now you can import styles normally in TypeScript:

```ts
import * as styles from "./my.module.css"
```

:warning: This plugin **only** creates typings for CSS Modules, meaning files which names are ending with `.module.css`.
