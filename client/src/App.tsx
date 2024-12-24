import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pages from './components/pages/Pages'
import AttackTypes from './components/pages/AttackTypes'
import CasualtyRegions from './components/pages/CasualtyRegions'
import AttackYears from './components/pages/AttackYears'
import TopGroups from './components/pages/TopGroups'
import CreateAttack from './components/pages/CreateAttack'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages />}>
          <Route path='attackTypes' element={<AttackTypes />} />
          <Route path='CasualtyRegions' element={<CasualtyRegions />} />
          <Route path='IncidentTrends' element={<AttackYears />} />
          <Route path='TopGroups' element={<TopGroups />} />
          <Route path="CreateAttack" element={<CreateAttack />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
