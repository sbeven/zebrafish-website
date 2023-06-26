import SingleLookup from './pages/singleLookup';
import SingleWeighted from './pages/singleWeighted';
import Home from './pages/home';

import RootLayout from './layouts/RootLayout';
import "./App.css"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route path='/' element={<Home />} />
      <Route path="/singleLookup" element={<SingleLookup />} />
      <Route path="/singleWeighted" element={<SingleWeighted />} />
    </Route>
  )
);

function App() {
    return (
      <div className='content'>
      <RouterProvider router = {router}/>
      </div>
      
    )
}

export default App