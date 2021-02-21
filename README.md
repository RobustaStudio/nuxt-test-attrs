# nuxt-test-attrs

> A simple nuxt module to remove test attributes from production build

## What

Sometimes it will be hard to target specific elements in e2e tests with tools like `cypress`, the solution for this is to add a `data-*` attribute to act as a constant selector to the element in question.

However for production you ideally don't want your markup riddled with these attributes as they serve no purpose there.

This module strips specific attributes that you can customize from the final output.

## Getting Started

Install this plugin

```sh
yarn add nuxt-test-attrs
# or
npm i nuxt-test-attrs
```

Add this module to the `buildModules` section in your `nuxt.config.js`:

```js
{
  //...
  buildModules: [
    // ...
    'nuxt-test-attrs',
  ],
}
```

Configure the module:

Add `testAttrs` config object to `nuxt.config.js`

```js
{
  // ...
  testAttrs: {
    attrs: ['test-id'], // required
    strip: process.env.NODE_ENV === 'production', // optional, this is the default
  },
}
```

**Note that all attributes will automatically have `data-` prefixed to the ones you provide, so you shouldn't prefix them.**

## Credits

- Code forked from [LinusBorg/vue-cli-plugin-test-attrs](https://github.com/LinusBorg/vue-cli-plugin-test-attrs)

## License

MIT
