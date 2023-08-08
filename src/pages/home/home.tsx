import { withRenderLog } from '@manauser/react-render-log'

import { FC } from 'react'

import { Smt } from '@widgets/smt'

import './home.css'

const Home: FC = () => (
  <div className="home">
    <Smt renderLogId="1" title="first" /> <Smt renderLogId="2" title="second" />{' '}
    home
  </div>
)

export default withRenderLog(Home, 'HomePage')
