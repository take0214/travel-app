import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import TodoInput from '../components/todo/TodoInput';
import TodoItem from '../components/todo/TodoItem';
import { useTravelTodo } from '../features/todo/hooks/useTravelTodo';
import { pageShellSx, pageHeaderSx } from '../theme';

export default function TravelTodoScreen() {
  const navigate = useNavigate();
  const {
    isOverseas,
    nights,
    dialogOpen,
    todos,
    remainingCount,
    handleRequestOverseasChange,
    handleRequestNightsChange,
    handleConfirmChange,
    handleCancelChange,
    handleAdd,
    handleToggle,
    handleDelete,
  } = useTravelTodo();

  return (
    <Container maxWidth="md" sx={pageShellSx}>
      <Box sx={pageHeaderSx}>
        <Box>
          <Typography variant="overline" color="secondary.main" sx={{ display: 'block', letterSpacing: '0.12em', fontWeight: 800 }}>
            Travel checklist
          </Typography>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 800, color: 'text.primary' }}>
            旅行準備TODO
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
          background: 'linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(248,245,255,0.97) 100%)',
          border: '1px solid rgba(124,92,255,0.12)',
          boxShadow: '0 18px 38px rgba(35, 56, 90, 0.08)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
            持ち物と準備項目を整理して、旅行前の確認を簡単に。
          </Typography>
          <Chip label={`残り ${remainingCount} 件`} color="secondary" variant="outlined" />
        </Box>

        <Paper variant="outlined" sx={{ p: 2.5, mb: 2.5, backgroundColor: 'rgba(255,255,255,0.7)' }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 'bold', color: 'text.primary' }}>
            旅行条件
          </Typography>
          <RadioGroup
            row
            value={isOverseas ? 'overseas' : 'domestic'}
            onChange={(e) => handleRequestOverseasChange(e.target.value === 'overseas')}
            sx={{ mb: 1.5 }}
          >
            <FormControlLabel value="domestic" control={<Radio size="small" />} label="国内" />
            <FormControlLabel value="overseas" control={<Radio size="small" />} label="海外" />
          </RadioGroup>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <TextField
              type="number"
              size="small"
              value={nights}
              onChange={(e) => handleRequestNightsChange(e.target.value)}
              inputProps={{ min: 1, style: { width: '60px', textAlign: 'center' } }}
            />
            <Typography variant="body2" color="text.secondary">
              泊 {nights + 1} 日
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ mb: 2 }}>
          <TodoInput onAdd={handleAdd} />
        </Box>

        <List disablePadding sx={{ display: 'grid', gap: 1.2 }}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </List>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCancelChange}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>条件を変更しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText>
            旅行先や宿泊数を変更すると、デフォルトの持ち物（必要数量や海外専用アイテム）が再計算・上書きされます。
            <br /><br />
            ※ご自身で手動追加した持ち物は消えずに残ります。
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
          <Button onClick={handleCancelChange} color="inherit">
            キャンセル
          </Button>
          <Button onClick={handleConfirmChange} variant="contained" color="primary" autoFocus>
            変更する
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
