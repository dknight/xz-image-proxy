# XZ Image Proxy (xz-image-proxy)

[![License MIT](https://img.shields.io/npm/l/xz-image-proxy)](https://github.com/dknight/xz-image-proxy/blob/main/LICENSE)
[![Build](https://github.com/dknight/xz-image-proxy/actions/workflows/node.js.yml/badge.svg)](https://github.com/dknight/xz-image-proxy/actions/workflows/node.js.yml)
![Version](https://img.shields.io/npm/v/xz-image-proxy)

XZImageProxy is a framework-agnostic web component to show image helper for layout.

![XZ Image Proxy example](https://raw.githubusercontent.com/dknight/xz-image-proxy/main/demo/main.png)

[Check demo](https://www.whoop.ee/xz-image-proxy/demo)

## Install

[NPM Package](https://www.npmjs.com/package/xz-image-proxy)

```sh
npm install --save zx-image-proxy
```

Or just download the source and include it in your HTML.

## Usage

### script tag

```html
<script type="module" src="./xz-image-proxy.js"></script>
```
### CDN 
```html
<!-- preferably in <head> -->
<script src="https://unpkg.com/xz-image-proxy@latest/dist/xz-image-proxy.min.js" type="module"></script>
```

Just include link from CDN and you are ready to go.

```html
<!-- inside <body> -->
<xz-image-proxy width="320" height="240">Hello world!</xz-image-proxy>
```

## Contribution

Any help is appreciated. Found a bug, typo, inaccuracy, etc.?
Please do not hesitate to make a pull request or file an issue.

## License

MIT 2023