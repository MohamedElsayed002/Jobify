import { Landing , Register , Error , ProtectedPage} from './pages'
import {Routes, Route} from 'react-router-dom'
import  {AddJob,AllJob,Profile,SharedLayout,Stats} from './pages/dashboard'


const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={
          <ProtectedPage>
            <SharedLayout/>
          </ProtectedPage>
          }>
          <Route index element={<Stats/>}/>
          <Route path="all-jobs" element={<AllJob/>}/>
          <Route path="add-job" element={<AddJob/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
        <Route path="/landing" element={<Landing/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<Error/>} />

      </Routes>
    </div>
  )
}

export default App