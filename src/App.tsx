import React from 'react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { HashRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ItineraryPlannerPage from './pages/ItineraryPlannerPage';
import TravelTodoPage from './pages/TravelTodoPage';
import { appTheme } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <HashRouter>
        <Box
          sx={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at top, #edf5ff 0%, #f4f8ff 32%, #eef3ff 100%)',
            color: 'text.primary',
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/itinerary" element={<ItineraryPlannerPage />} />
            <Route path="/travel" element={<TravelTodoPage />} />
          </Routes>
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
}
