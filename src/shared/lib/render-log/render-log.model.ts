import { ComponentType, PropsWithChildren } from 'react'

export type RenderLog = (...args: unknown[]) => void

export type RenderLogContextValue = (displayName: string) => RenderLog

export type RenderLogColors = {
  firstRender: string
  extraRender: string
}

export type OwnRenderLogProviderProps = {
  colors?: RenderLogColors
  debugEnabled: boolean
  isStrictMode: boolean
  timeToLive?: number
}

export type RenderLogProviderProps =
  PropsWithChildren<OwnRenderLogProviderProps>

export type PropsWithRenderLog<Props extends {}> = Props & {
  getRenderLog: RenderLogContextValue
}

export type PropsWithRenderLogId<Props extends {}> = Props & {
  renderLogId?: string | number
}

export type WithRenderLog = <Props extends {}>(
  Component: ComponentType<PropsWithRenderLog<Props>>,
  customDisplayName?: string,
) => ComponentType<PropsWithRenderLogId<Props>>

export type WithRenderLogProvider = <Props extends {}>(
  this: OwnRenderLogProviderProps,
  Component: ComponentType<Props>,
) => ComponentType<Props>
