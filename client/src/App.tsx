import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pages from './components/pages/Pages'
import AttackTypes from './components/pages/AttackTypes'
import CasualtyRegions from './components/pages/CasualtyRegions'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages />}>
          <Route path='attackTypes' element={<AttackTypes />} />
          <Route path='CasualtyRegions' element={<CasualtyRegions />} />
          {/* <Route path="orders" element={<OrdersList />} />
        <Route path="inventory" element={<InventoryList />} />
        <Route path="charts" element={<Deshboard />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
