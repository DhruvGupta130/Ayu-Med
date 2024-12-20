import { Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar';
import DashboardSummary from './DashboardSummary.jsx';
import Logout from '../Components/Logout.jsx';

const CustomRoutesManager = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
          <Route path='/profile' element={<DashboardSummary/>}/>
          <Route path='/appointments'/>
          <Route path='/documents'/>
          <Route path='/history'/>
          <Route path='lab-results'  />
          <Route path='/settings' />
          <Route path='/logout' element={<Logout/>} />
      </Routes>
    </div>
  )
}

export default CustomRoutesManager;