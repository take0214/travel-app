import React from 'react';
import { Box } from '@mui/material';
import { HashRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ItineraryPlannerPage from './pages/ItineraryPlannerPage';
import TravelTodoPage from './pages/TravelTodoPage';

export default function App() {
  return (
    <HashRouter>
      <Box sx={{ minHeight: '100vh', background: '#f5f7ff' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/itinerary" element={<ItineraryPlannerPage />} />
          <Route path="/travel" element={<TravelTodoPage />} />
        </Routes>
      </Box>
    </HashRouter>
  );
}
