import React from 'react';
import {
  Container,
  Typography,
  Box,
  Stack,
  CssBaseline,
  Button,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DateDividerRow from '../components/itinerary/DateDividerRow';
import ItineraryItemRow from '../components/itinerary/ItineraryItemRow';
import TimelineFooter from '../components/itinerary/TimelineFooter';
import { useItineraryPlanner } from '../features/itinerary/hooks/useItineraryPlanner';
import { pageShellSx, pageHeaderSx } from '../theme';

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
      <Container maxWidth="lg" sx={pageShellSx}>
        <Box sx={pageHeaderSx}>
          <Box>
            <Typography variant="overline" color="primary.main" sx={{ display: 'block', letterSpacing: '0.12em', fontWeight: 800 }}>
              Travel plans
            </Typography>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 800, color: 'text.primary' }}>
              タイムスケジュール
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/')}
            sx={{ borderRadius: '32px', px: 2.5 }}
          >
            ホームへ戻る
          </Button>
        </Box>

        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: '32px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(247,250,255,0.96) 100%)',
            border: '1px solid rgba(47,111,237,0.08)',
            boxShadow: '0 18px 38px rgba(35, 56, 90, 0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
              複数日の旅行計画をタイムラインで整理・作成できます
            </Typography>
            <Chip label={`${timelineList.filter((i) => i.type === 'divider').length}日分`} color="primary" variant="outlined" />
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
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
