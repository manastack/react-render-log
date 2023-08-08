import { RenderLogProvider } from '@manauser/react-render-log'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test } from 'vitest'

import { Home } from '.'

describe('<Home />', () => {
  const consoleOutput = Array<unknown[]>()
  const mockedConsoleLog = (...output: unknown[]) => consoleOutput.push(output)

  beforeEach(() => {
    console.log = mockedConsoleLog // eslint-disable-line no-console
  })

  const originalConsoleLog = console.log // eslint-disable-line no-console
  afterEach(() => {
    console.log = originalConsoleLog // eslint-disable-line no-console
  })

  test('Home: mounts properly and render-log gonna be called 1 time only', () => {
    const wrapper = render(
      <RenderLogProvider debugEnabled isStrictMode>
        <Home />
      </RenderLogProvider>,
    )

    expect(wrapper).toBeTruthy()
    expect(
      consoleOutput.flat().filter((p) => `${p}`.includes('Home')).length,
    ).toEqual(1)

    const linkElement = screen.getByText(/home/i)
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toBeTruthy()
  })
})
