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

export default function HomeScreen() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1, color: '#1d4ed8' }}>
          旅行プランナー
        </Typography>
        <Typography variant="h6" color="text.secondary">
          旅行の準備と日程管理を一つのアプリでまとめて管理できます
        </Typography>
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
      >
        <Card sx={{ width: { xs: '100%', md: 320 }, minHeight: 220, borderRadius: 3, boxShadow: 3 }}>
          <CardActionArea component={Link} to="/itinerary" sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
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

        <Card sx={{ width: { xs: '100%', md: 320 }, minHeight: 220, borderRadius: 3, boxShadow: 3 }}>
          <CardActionArea component={Link} to="/travel" sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
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
