import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Paste from './Components/Paste'
import Navbar from './Components/Navbar'
import Viewpaste from './Components/Viewpaste'
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navbar />
        <Paste />
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar />
        <Viewpaste />
      </div>
    },
  ]
)


function App() {

  return (
    <div className='container'>
      {/* <Toaster position='top-right' /> */}

      <RouterProvider router={router} />
    </div>
    
  )
}

export default App
