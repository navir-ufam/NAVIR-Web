import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context'
import { router } from '@/routes'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AuthProvider>
  )
}

export default App
