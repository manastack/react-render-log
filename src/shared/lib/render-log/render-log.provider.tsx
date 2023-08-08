import { FC, useMemo } from 'react'

import { RenderLogContext } from './render-log.context'
import { renderLogCreator } from './render-log.features'
import {
  RenderLogColors,
  RenderLogContextValue,
  RenderLogProviderProps,
} from './render-log.model'

const defaultColors: RenderLogColors = {
  extraRender: 'orange',
  firstRender: 'lightgreen',
}

const defaultTimeToLive = 500

export const RenderLogProvider: FC<RenderLogProviderProps> = ({
  children,
  colors = defaultColors,
  debugEnabled,
  isStrictMode,
  timeToLive = defaultTimeToLive,
}) => {
  const value: RenderLogContextValue = useMemo<RenderLogContextValue>(() => {
    if (!debugEnabled) {
      return () => () => {}
    }

    return (displayName: string) =>
      renderLogCreator({ colors, isStrictMode, key: displayName, timeToLive })
  }, [colors, debugEnabled, isStrictMode, timeToLive])

  return (
    <RenderLogContext.Provider {...{ value }}>
      {children}
    </RenderLogContext.Provider>
  )
}
