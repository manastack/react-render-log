# react-render-log

[![Testing](https://github.com/manastack/react-render-log/actions/workflows/test.yml/badge.svg)](https://github.com/manastack/react-render-log/actions/workflows/test.yml)

This package logs the rendering of components in console by debug and highlights the extra renderings.

## Installation

```bash
npm i @manauser/react-render-log
```

or

```bash
yarn add @manauser/react-render-log
```

or

```bash
pnpm add @manauser/react-render-log
```

## Usage

**app.tsx** (with provider as a wrapper):

```typescript jsx
import { FC } from 'react'
import { RenderLogProvider } from '@manauser/react-render-log'

import { Home } from '@pages/home'

const App: FC = () => (
  <RenderLogProvider
    debugEnabled={import.meta.env.MODE !== 'production'}
    isStrictMode={import.meta.env.MODE === 'development'}
  >
    <Home />
  </RenderLogProvider>
)

export default App
```

or
**app.tsx** (with provider as a HOC `withRenderLogProvider`):

```typescript jsx
import { FC } from 'react'
import {
  OwnRenderLogProviderProps,
  withRenderLogProvider,
} from '@manauser/react-render-log'

import { Home } from '@pages/home'

const App: FC = () => <Home />

export default withRenderLogProvider.apply(
  {
    debugEnabled: import.meta.env.MODE !== 'production',
    isStrictMode: import.meta.env.MODE === 'development',
  } satisfies OwnRenderLogProviderProps,
  [App],
)
```

**home.tsx** (as example of using `withRenderLog` HOC):

```typescript jsx
import { FC } from 'react'
import { withRenderLog } from '@manauser/react-render-log'

import { Smt } from '@widgets/smt'

const Home: FC = () => (
  <div>
    <Smt renderLogId="1" title="first" /> <Smt renderLogId="2" title="second" />{' '}
    home
  </div>
)

export default withRenderLog(Home) // or withRenderLog(Home, 'SomeCustomName')
```

By render list of the same components, you should use `renderLogId` prop (like a `key`).
In this case, the props of this component should be wrapped in `PropsWithRenderLog` type.

**smt.tsx** (as example of using `withRenderLog` HOC and `PropsWithRenderLog`):

```typescript jsx
import { FC } from 'react'
import { PropsWithRenderLog, withRenderLog } from '@manauser/react-render-log'

type Props = {
  title: string
}

const Smt: FC<PropsWithRenderLog<Props>> = ({ title }) => <div>{title}</div>

export default withRenderLog(Smt)
```

## Options for `RenderLogProvider`

- ### debugEnabled

  Type: `boolean`

  Enable debug mode.

- ### isStrictMode

  Type: `boolean`

  Enable strict mode.

- ### colors (optional)

  Type:

  ```typescript
  {
    firstRender: string
    extraRender: string
  }
  ```

  Customize colors. By default, they are:

  ```
  {
    firstRender: 'lightgreen',
    extraRender: 'orange',
  }
  ```

- ### timeToLive (optional)

Type: `number`

Time to live for the extra renderings. By default, it is `500` ms.

## License

[MIT](https://choosealicense.com/licenses/mit/)
