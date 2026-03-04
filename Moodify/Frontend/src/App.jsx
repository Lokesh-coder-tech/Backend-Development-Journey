import {RouterProvider} from 'react-router'
import AppRoutes from "./AppRoutes"
import "./features/shared/styles/global.scss"
import {AuthProvider} from "./features/auth/auth.context"
import { SongContextProvider } from './features/home/song.context'


function App() {

  return (
    <AuthProvider>
      <SongContextProvider>
         <AppRoutes />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
