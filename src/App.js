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
import BookElectrician from './Components/Pages-layout/Services/BookElectrician';
import BookPlumbing from './Components/Pages-layout/Services/BookPlumbing';
import BookCleaning from './Components/Pages-layout/Services/BookCleaning';
import BookBabySitting from './Components/Pages-layout/Services/BookBabySitting';
import BookPainter from './Components/Pages-layout/Services/BookPainter';
import 'font-awesome/css/font-awesome.min.css';
import ServiceBooking from './Components/Pages-layout/Services/ServiceBooking';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/service-provider', element: <ServiceProviderPage /> },
      { path: '/customer', element: <Customer /> },
      { path: '/customer/dashboard', element: <CustomerDashboard /> },
      { path: '/customer/book-service/electrician', element: <BookElectrician /> },
      { path: '/customer/book-service/plumbing', element: <BookPlumbing /> },
      { path: '/customer/book-service/cleaning', element: <BookCleaning /> },
      { path: '/customer/book-service/baby-sitting', element: <BookBabySitting /> },
      { path: '/customer/book-service/painter', element: <BookPainter /> },
      { path: '/customer/book-service/electrician/booking', element: <ServiceBooking /> },
    ],
    errorElement: <ErrorPage /> 
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
