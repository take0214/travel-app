import React from 'react';
import {
  Container,
  Typography,
  Box,
  Stack,
  CssBaseline,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DateDividerRow from '../components/itinerary/DateDividerRow';
import ItineraryItemRow from '../components/itinerary/ItineraryItemRow';
import TimelineFooter from '../components/itinerary/TimelineFooter';
import { useItineraryPlanner } from '../features/itinerary/hooks/useItineraryPlanner';

export default function ItineraryPlannerScreen() {
  const navigate = useNavigate();
  const {
    timelineList,
    handleItemChange,
    handleDelete,
    handleAddItemUnderDivider,
    handleAddDivider,
  } = useItineraryPlanner();

  let dayCounter = 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <Box sx={{ px: 2, pt: 2 }}>
        <Button variant="text" onClick={() => navigate('/')}>
          ホームへ戻る
        </Button>
      </Box>
      <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Box sx={{ mb: 4, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            タイムスケジュール
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            複数日の旅行計画をタイムラインで整理・作成できます
          </Typography>
        </Box>

        <Stack spacing={2}>
          {timelineList.map((item) => {
            if (item.type === 'divider') {
              dayCounter += 1;
              return (
                <DateDividerRow
                  key={item.id}
                  item={item}
                  dayIndex={dayCounter}
                  onChange={handleItemChange}
                  onDelete={handleDelete}
                  onAddItemHere={handleAddItemUnderDivider}
                  canDelete={timelineList.filter((i) => i.type === 'divider').length > 1}
                />
              );
            }

            return (
              <ItineraryItemRow
                key={item.id}
                item={item}
                onChange={handleItemChange}
                onDelete={handleDelete}
              />
            );
          })}
        </Stack>

        <TimelineFooter onAddDivider={handleAddDivider} />
      </Container>
    </LocalizationProvider>
  );
}
