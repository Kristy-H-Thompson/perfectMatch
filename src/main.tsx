import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import CandidateSearch from './pages/CandidateSearch.tsx';
import SavedCandidates from './pages/SavedCandidates.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

// Create the router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,  // Default route, will render CandidateSearch component
        element: <CandidateSearch />,
      },
      {
        path: 'saved', // This will match /saved URL and render SavedCandidates
        element: <SavedCandidates />,
      },
    ],
  },
]);

// Wrap the application with RouterProvider to provide routing functionality
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
