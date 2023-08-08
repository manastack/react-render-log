import {
  OwnRenderLogProviderProps,
  withRenderLogProvider,
} from '@manauser/react-render-log'

import { FC } from 'react'

import { Home } from '@pages/home'

import './styles/global.css'

const App: FC = () => <Home />

export default withRenderLogProvider.apply(
  {
    debugEnabled: import.meta.env.MODE !== 'production',
    isStrictMode: import.meta.env.MODE === 'development',
  } satisfies OwnRenderLogProviderProps,
  [App],
)
