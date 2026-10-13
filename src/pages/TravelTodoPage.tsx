import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import TodoInput from '../components/todo/TodoInput';
import TodoItem from '../components/todo/TodoItem';
import { useTravelTodo } from '../features/todo/hooks/useTravelTodo';

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
    <Container maxWidth="xs" sx={{ mt: 3, mb: 5 }}>
      <Box sx={{ px: 2, pt: 2 }}>
        <Button variant="text" onClick={() => navigate('/')}>
          ホームへ戻る
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        旅行準備TODOリスト
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            type="number"
            size="small"
            value={nights}
            onChange={(e) => handleRequestNightsChange(e.target.value)}
            inputProps={{ min: 1, style: { width: '50px', textAlign: 'center' } }}
          />
          <Typography variant="body2">泊 {nights + 1} 日</Typography>
        </Box>
      </Paper>

      <TodoInput onAdd={handleAdd} />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        残りタスク: {remainingCount} 件
      </Typography>

      <List disablePadding>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </List>

      <Dialog open={dialogOpen} onClose={handleCancelChange}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>条件を変更しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText>
            旅行先や宿泊数を変更すると、デフォルトの持ち物（必要数量や海外専用アイテム）が再計算・上書きされます。
            <br /><br />
            ※ご自身で手動追加した持ち物は消えずに残ります。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
