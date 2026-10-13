import { useEffect, useState } from 'react';

const DEFAULT_ITEMS = [
  { key: 'shampoo', name: 'シャンプー', unit: '回分', type: 'daily' },
  { key: 'clothes', name: '着替え', unit: '着', type: 'daily' },
  { key: 'lotion', name: '化粧水', unit: '本', type: 'fixed' },
  { key: 'makeup', name: 'メイク道具', unit: '式', type: 'fixed' },
  { key: 'charger', name: '充電器', unit: '個', type: 'fixed' },
  { key: 'passport', name: 'パスポート', unit: '冊', type: 'overseas' },
];

export function useTravelTodo() {
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

  return {
    isOverseas,
    nights,
    dialogOpen,
    pendingChange,
    todos,
    remainingCount,
    handleRequestOverseasChange,
    handleRequestNightsChange,
    handleConfirmChange,
    handleCancelChange,
    handleAdd,
    handleToggle,
    handleDelete,
  };
}
