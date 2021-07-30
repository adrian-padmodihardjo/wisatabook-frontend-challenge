# wisatabook Frontend Challenge

In response to Wisatabook's Senior Frontend Developer (Vue) role technical challenge.

## Demo
https://wisatabook-fe-challenge-adrian.netlify.app/

## Incremental Builds
App is built iteratively. Each build/release can be checked at [this link](https://github.com/adrian-padmodihardjo/wisatabook-frontend-challenge/releases).

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Components
This app doesn't use any library (or Vuetify, as used the source app). As for the components, most (if not all) are custom built.

Each component is separated into:
- index.js

  this serves as the entrypoint (default and named export)

- \<name>.vue

  this consists of template and script only

- `<name>.scss

  all style definitions goes here. and composed using [BEM](http://getbem.com/naming/).

Some directories might include additional files.

## Usage of Packages
Here are the packages that are used within this app.

#### `axios`, `axios-mock-adapter`
Instead of placing `Raw Data` as static asset and requiring it directly, this app simulate network request using `axios-mock-adapter`. In so, network request can replaced with actual network request, if ever required in the future. 

#### `jest`
Since network request is simulated, `jest` is used to build some test suites regarding network response mocking. 

#### `fibers`
Recommended for use with `sass` (or dart-sass). `sass` is chosen due to the deprecated `node-sass`, in which the latter doesn't support "@use" semantic (the recommended syntax for SASS import).

#### `svg-to-vue-component`
This is installed to demonstrate the use of Webpack Loader in transforming SVG files into Vue components.

#### `hammerjs`
This is used for pan gestures within images' caption filter (the horizontally scrolling chips above images grid).

#### `lodash`
Used mostly for event throttling, using Lodash#throttle. Since module is imported directly from each utility file, bundle size shouldn't be a concern.



