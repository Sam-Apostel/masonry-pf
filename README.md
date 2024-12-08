# Masonry polyfill

This package provides a simple register function that takes in a HTMLElement and polyfills it's masonry layout for browsers who are holding us back.

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

### vanilla

```js
import { registerMasonry } from 'masonry-pf';

// after mounting
const cleanup = registerMasonry(document.querySelector('.masonry'));

// when unmounting
cleanup();
```

### React

```jsx
import { registerMasonry } from 'masonry-pf';

function Masonry({ children }) {
  return (
    <div
      className="grid grid-rows-[masonry] grid-cols-3 gap-4"
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
