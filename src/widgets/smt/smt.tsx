import { PropsWithRenderLog, withRenderLog } from '@manauser/react-render-log'

import { FC } from 'react'

import './smt.css'

type Props = {
  title: string
}

const Smt: FC<PropsWithRenderLog<Props>> = ({ title }) => (
  <div className="smt">{title}</div>
)

export default withRenderLog(Smt)
