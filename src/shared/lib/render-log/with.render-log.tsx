import { ComponentType, ReactElement } from 'react'

import {
  PropsWithRenderLog,
  PropsWithRenderLogId,
  WithRenderLog,
} from './render-log.model' // - don't use here import from @app/providers
import { useRenderLog } from './use.render-log'

export const withRenderLog: WithRenderLog = <Props extends {}>(
  Component: ComponentType<PropsWithRenderLog<Props>>,
  customDisplayName?: string,
): ComponentType<PropsWithRenderLogId<Props>> => {
  const displayName =
    customDisplayName ||
    Component.displayName ||
    Component.name ||
    'Unknown Component'

  return (props: PropsWithRenderLogId<Props>): ReactElement<Props> => {
    const getRenderLog = useRenderLog()
    const { renderLogId: id = '' } = props
    getRenderLog(`${displayName}${id === '' ? '' : `.${id}`}`)()

    return <Component {...props} {...{ getRenderLog }} />
  }
}
