import React, { useState, useCallback, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Stack,
  CssBaseline,
  Button,
  Paper,
  Card,
  CardContent,
  CardActionArea,
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
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DateDividerRow from './components/DateDividerRow';
import ItineraryItemRow from './components/ItineraryItemRow';
import TimelineFooter from './components/TimelineFooter';
import { createEmptyDateDivider, createEmptyItineraryItem, ItineraryItem, DateDivider } from './types/itinerary';

import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

const DEFAULT_ITEMS = [
  { key: 'shampoo', name: 'シャンプー', unit: '回分', type: 'daily' },
  { key: 'clothes', name: '着替え', unit: '着', type: 'daily' },
  { key: 'lotion', name: '化粧水', unit: '本', type: 'fixed' },
  { key: 'makeup', name: 'メイク道具', unit: '式', type: 'fixed' },
  { key: 'charger', name: '充電器', unit: '個', type: 'fixed' },
  { key: 'passport', name: 'パスポート', unit: '冊', type: 'overseas' },
];

type Timeline = Array<ItineraryItem | DateDivider>;

function ItineraryPlannerScreen() {
  const navigate = useNavigate();
  const [timelineList, setTimelineList] = useState<Timeline>([
    createEmptyDateDivider(),
    createEmptyItineraryItem(),
  ]);

  const handleItemChange = useCallback((id: string, field: string, value: any) => {
    setTimelineList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTimelineList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleAddItemUnderDivider = useCallback((dividerId: string) => {
    setTimelineList((prev) => {
      const index = prev.findIndex((item) => item.id === dividerId);
      if (index === -1) return [...prev, createEmptyItineraryItem() as any];
      const nextList = [...prev];
      nextList.splice(index + 1, 0, createEmptyItineraryItem() as any);
      return nextList;
    });
  }, []);

  const handleAddDivider = useCallback(() => {
    setTimelineList((prev) => [
      ...prev,
      createEmptyDateDivider(),
      createEmptyItineraryItem(),
    ]);
  }, []);

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

function TravelTodoScreen() {
  const navigate = useNavigate();
  const [isOverseas, setIsOverseas] = useState(false);
  const [nights, setNights] = useState(2);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState<any>(null);
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    setTodos((prevTodos) => {
      const customTodos = prevTodos.filter((todo) => !todo.isDefault);
      const completedMap = new Map();
      prevTodos
        .filter((todo) => todo.isDefault)
        .forEach((todo) => {
          completedMap.set(todo.itemKey, todo.completed);
        });

      const newDefaultTodos = DEFAULT_ITEMS.filter((item) => {
        if (item.type === 'overseas') return isOverseas;
        return true;
      }).map((item) => {
        const quantity = item.type === 'daily' ? Math.max(1, nights) : 1;
        return {
          id: `default-${item.key}`,
          itemKey: item.key,
          name: item.name,
          quantity,
          unit: item.unit,
          completed: (completedMap.get(item.key) as boolean) ?? false,
          isDefault: true,
        };
      });

      return [...newDefaultTodos, ...customTodos];
    });
  }, [isOverseas, nights]);

  const handleRequestOverseasChange = (nextValue: boolean) => {
    if (nextValue === isOverseas) return;
    setPendingChange({ type: 'overseas', value: nextValue });
    setDialogOpen(true);
  };

  const handleRequestNightsChange = (nextValue: any) => {
    const validNights = Math.max(1, parseInt(nextValue, 10) || 1);
    if (validNights === nights) return;
    setPendingChange({ type: 'nights', value: validNights });
    setDialogOpen(true);
  };

  const handleConfirmChange = () => {
    if (pendingChange) {
      if (pendingChange.type === 'overseas') {
        setIsOverseas(pendingChange.value);
      } else if (pendingChange.type === 'nights') {
        setNights(pendingChange.value);
      }
    }
    setPendingChange(null);
    setDialogOpen(false);
  };

  const handleCancelChange = () => {
    setPendingChange(null);
    setDialogOpen(false);
  };

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  const handleAdd = ({ name, quantity, unit }: any) => {
    const newTodo = {
      id: Date.now(),
      name,
      quantity,
      unit,
      completed: false,
      isDefault: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

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

function HomeScreen() {
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

export default function App() {
  return (
    <HashRouter>
      <Box sx={{ minHeight: '100vh', background: '#f5f7ff' }}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/itinerary" element={<ItineraryPlannerScreen />} />
          <Route path="/travel" element={<TravelTodoScreen />} />
        </Routes>
      </Box>
    </HashRouter>
  );
}
