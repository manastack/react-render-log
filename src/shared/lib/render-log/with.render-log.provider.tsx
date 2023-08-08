import { ComponentType } from 'react'

import {
  OwnRenderLogProviderProps,
  WithRenderLogProvider,
} from './render-log.model'
import { RenderLogProvider } from './render-log.provider'

export const withRenderLogProvider: WithRenderLogProvider = function <
  Props extends {},
>(
  this: OwnRenderLogProviderProps,
  Component: ComponentType<Props>,
): ComponentType<Props> {
  const ownRenderLogProviderProps: OwnRenderLogProviderProps = this

  return (props: Props) => (
    <RenderLogProvider {...ownRenderLogProviderProps}>
      <Component {...props} />
    </RenderLogProvider>
  )
}
