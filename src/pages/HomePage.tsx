import React from 'react';
import {
  Container,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  CardActionArea,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const cardSx = {
  width: { xs: '100%', md: 320 },
  minHeight: 220,
  mx: 'auto',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 18px 35px rgba(47, 111, 237, 0.12)',
  },
};

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Box
        sx={{
          textAlign: 'center',
          mb: 5,
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 900,
            mb: 1.5,
            color: '#1d4ed8',
            letterSpacing: '-0.04em',
          }}
        >
          旅行プランナー
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto' }}>
          旅行の準備と日程管理を一つのアプリでまとめて管理できます
        </Typography>
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ px: { xs: 1, md: 0 }, width: '100%' }}
      >
        <Card sx={cardSx}>
          <CardActionArea component={Link} to="/itinerary" sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                タイムスケジュール
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                日程ごとの旅行計画を作成して、複数日の流れを整理できます。
              </Typography>
              <Button variant="contained" sx={{ mt: 'auto' }}>
                開く
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={cardSx}>
          <CardActionArea component={Link} to="/travel" sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                旅行準備TODO
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                持ち物や準備項目を管理し、旅行前の確認を簡単にできます。
              </Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 'auto' }}>
                開く
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </Container>
  );
}
