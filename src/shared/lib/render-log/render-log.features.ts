import { RenderLog, RenderLogColors } from './render-log.model'

type LogCaseWithMessage = { color: string; message?: string }

type LogCaseWithMessageGetter = {
  color: string
  getMessage?: (p?: unknown) => string
}

type LogCase = LogCaseWithMessage | LogCaseWithMessageGetter

type GetLogCases = (p: {
  colors: RenderLogColors
  isStrictMode: boolean
}) => [LogCase, LogCase, LogCase]

const getLogCases: GetLogCases = ({ colors, isStrictMode }) => {
  const secondRenderCaseByStrictMode: LogCase = {
    color: colors.firstRender,
    message: ' - repeat by strict-mode',
  }

  const extraRenderCase: LogCase = {
    color: colors.extraRender,
    getMessage: (repeatsCount = '') => ` - extra repeats (${repeatsCount})!`,
  }

  return [
    { color: colors.firstRender },
    isStrictMode ? secondRenderCaseByStrictMode : extraRenderCase,
    extraRenderCase,
  ]
}

type CacheRecord = { repetitionsCount: number; timestamp: number }
const cache: Record<string, CacheRecord> = {}

const setCache = (key: string, repetitionsCount: number): void => {
  cache[key] = { repetitionsCount, timestamp: Date.now() }
}

const getCache = (key: string): CacheRecord | null => cache[key] || null

const getUpdatedRepetitionsCount = (props: {
  key: string
  timeToLive: number
}): number => {
  const { key, timeToLive } = props
  const updatedRepetitionsCount =
    getCache(key) && Date.now() - getCache(key)!.timestamp < timeToLive
      ? getCache(key)!.repetitionsCount + 1
      : 0

  setCache(key, updatedRepetitionsCount)
  return updatedRepetitionsCount
}

export const renderLogCreator = (props: {
  key: string
  colors: RenderLogColors
  isStrictMode: boolean
  timeToLive: number
}): RenderLog => {
  const { colors, isStrictMode, key, timeToLive } = props

  const repetitionsCount = getUpdatedRepetitionsCount({ key, timeToLive })

  const currentCase = getLogCases({ colors, isStrictMode })[
    repetitionsCount > 2 ? 2 : repetitionsCount
  ]

  return (...args) => {
    const argsAsString = args.length
      ? ` ⟶ ${args.map((p) => `${p}`).join(', ')}`
      : ''

    const { message } = currentCase as LogCaseWithMessage
    const { getMessage } = currentCase as LogCaseWithMessageGetter
    const currentCaseMessage =
      message || (getMessage && getMessage(repetitionsCount)) || ''

    const totalMessage: [string, string] = [
      `%c • ${key + currentCaseMessage + argsAsString}`,
      `color:${currentCase.color}`,
    ]

    console.log(...totalMessage) // eslint-disable-line no-console
  }
}
