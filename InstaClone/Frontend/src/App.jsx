import { RouterProvider } from 'react-router'
import AppRoutes from './AppRoutes'
import "./style.scss"
import { AuthProvider } from './features/auth/auth.context'
import { PostContextProvider } from './features/post/post.context'


function App() {
  return (
  <AuthProvider>
    <PostContextProvider>
     <AppRoutes/>
    </PostContextProvider>
  </AuthProvider>
  )
}

export default App
