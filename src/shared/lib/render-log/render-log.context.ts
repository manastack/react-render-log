import { Context, createContext } from 'react'

import { RenderLogContextValue } from './render-log.model'

const initialRenderLogContextValue: RenderLogContextValue = () => () => {}

export const RenderLogContext = ((): Context<RenderLogContextValue> =>
  createContext<RenderLogContextValue>(
    initialRenderLogContextValue as RenderLogContextValue,
  ))()
