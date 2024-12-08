# Masonry polyfill

This package provides an absolutely tiny (0.6KB) polyfill for css `grid-template-rows: masonry`.

`registerMasonry` is a function that takes in an HTMLElement and adjusts the top margins of it's children to achieve masonry layout for browsers that don't support it yet.

Nothing happens in browsers that support masonry.

Just define the masonry in css with your preferred css framework/authoring method and run this function one for the grid element.

## install:

```shell
npm install masonry-pf
```

```shell
yarn add masonry-pf
```

```shell
bun add masonry-pf
```

## Usage

### React

Pass `registerMasonry` to the ref of your grid and set the css styles as if your browser supports masonry.

```jsx
import { registerMasonry } from 'masonry-pf';

function Masonry({ children }) {
  return (
    <div
      className="grid grid-rows-[masonry] grid-cols-1 md:grid-cols-3 gap-4"
      ref={registerMasonry}
    >
      {children}
    </div>
  );
}
```

> [!TIP]
> example uses tailwindcss but this also works with all other styling solutions

> [!WARNING]:
> react versions prior to v19 do not clean up refs. Therefore, this is recommended in v19 and above only.

### vanilla: HTML + CSS + JS

You can use this package without any build tooling. Paste this in an html file and you can see it in action.

```html
<head>
  <script type="importmap">
    {
      "imports": {
        "masonry-pf": "https://esm.run/masonry-pf@0.0.2"
      }
    }
  </script>
  <style>
    #gallery {
      display: grid;
      grid-template-columns: repeat(3, 200px);
      grid-template-rows: masonry;
      gap: 1rem;
      justify-content: center;
    }
  </style>
  <script type="module">
    import { registerMasonry } from 'masonry-pf';

    registerMasonry(gallery);
  </script>
</head>
<body>
  <div id="gallery">
    <img src="https://picsum.photos/200/300" height="300" />
    <img src="https://picsum.photos/200/225" height="225" />
    <img src="https://picsum.photos/200/150" height="150" />
    <img src="https://picsum.photos/200/150" height="150" />
    <img src="https://picsum.photos/200/225" height="225" />
    <img src="https://picsum.photos/200/300" height="300" />
    <img src="https://picsum.photos/200/300" height="300" />
    <img src="https://picsum.photos/200/225" height="225" />
    <img src="https://picsum.photos/200/150" height="150" />
    <img src="https://picsum.photos/200/150" height="150" />
    <img src="https://picsum.photos/200/225" height="225" />
    <img src="https://picsum.photos/200/300" height="300" />
  </div>
</body>
```
