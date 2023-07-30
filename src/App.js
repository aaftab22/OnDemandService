import './App.css';

// Importing all the folders of Components in App
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Components/Pages-layout/Root';
import ErrorPage from './Components/Pages-layout/ErrorPage';
import LandingPage from './Components/Pages-layout/LandingPage';
import ServiceProviderPage from './Components/Pages-layout/ServiceProviderPage';
import Customer from './Components/Pages-layout/Customer';
import CustomerDashboard from './Components/Pages-layout/CustomerDashboard';

import handleSubmit from './handlesubmit';
import { useRef } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/service-provider', element: <ServiceProviderPage /> },
      { path: '/customer', element: <Customer /> },
      { path: '/customer/dashboard', element: <CustomerDashboard /> },
    ],
    errorElement: <ErrorPage /> 
  }
]);

function App() {

  const dataRef = useRef()

  const submithandler = (e) => {
    e.preventDefault()
    handleSubmit(dataRef.current.value)
    dataRef.current.value = ""
  }

//   <div className="App">
//
// </div>
  return (
    <RouterProvider router={router} />
  );
}

export default App;
//   <form onSubmit={submithandler}>
//     <input type= "text" ref={dataRef} />
//     <button type = "submit">Save</button>
//   </form>