# Usage

In bash CLI:

`$    git clone https://github.com/rmolinamir/react-png-ts-component`

Afterwards, run the following commands in the root folder:

1. Change the `package.json` name, description, and other properties to the component's respective properties.
2. `npm install`
3. That's it!

**To link** the component to the example folder:

1. On the root folder, execute `npm link`.
2. After it's finished, execute `cd example`, then `npm link [name-of-the-package]`.

**If anything goes wrong, then delete the `node_modules` folders and the `package-lock.json` files then start over.**

**To run**, execute `npm start` on root and inside the example folder.

**To build**, index.js, execute `npm build` on root folder.

**To publish**, execute `npm publish` on root folder.

# React Plug-N'-Go TypeScript Component Template

> Component description

[![NPM](https://img.shields.io/npm/v/[name-of-the-package].svg)](https://www.npmjs.com/package/[name-of-the-package]) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save [name-of-the-package]
```

## Showcase

...

## Instructions

1. ...

## Features

1. ...

## Props

Props               |       Functionality
-------------       |       -------------
`prop`              |       ...

## Usage

[![Edit React Plug-N'-Go Component](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/)

```jsx
import React, { Component } from 'react'

import Component from '[name-of-the-package]'

const component = () => {
    return (
    <Component>
      React Plug-N'-Go Component.
    </Component>
  )
}
```

## Pending

- ...

## License

MIT © [author](https://github.com/author)
