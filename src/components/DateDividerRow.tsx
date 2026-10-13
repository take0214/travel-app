import React from 'react';
import {
  Box,
  Chip,
  IconButton,
  Button,
  Tooltip,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { CalendarMonth as CalendarMonthIcon, Add as AddIcon, Delete as DeleteOutlineIcon } from '@mui/icons-material';

const DateDividerRow: React.FC<any> = ({
  item,
  dayIndex = 1,
  onChange,
  onDelete,
  onAddItemHere,
  canDelete = true,
}) => {
  const dateValue = item?.date ? dayjs(item.date) : null;

  return (
    <Paper
      elevation={0}
      sx={{
        my: 2,
        p: 1.5,
        backgroundColor: '#e8f0fe',
        borderRadius: 2,
        border: '1px solid #cce0ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip
          icon={<CalendarMonthIcon fontSize="small" />}
          label={`${dayIndex}日目`}
          color="primary"
          sx={{ fontWeight: 'bold', fontSize: '0.9rem', px: 0.5 }}
        />
        <DatePicker
          value={dateValue}
          format="YYYY/MM/DD"
          onChange={(newValue: any) => {
            if (onChange && item?.id) {
              const formatted = newValue && newValue.isValid() ? newValue.format('YYYY-MM-DD') : '';
              onChange(item.id, 'date', formatted);
            }
          }}
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 1,
            width: 170,
          }}
          slotProps={{
            textField: { size: 'small' },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => onAddItemHere && onAddItemHere(item.id)}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          予定を追加
        </Button>
        {canDelete && (
          <Tooltip title="この日付区切りを削除">
            <IconButton
              size="small"
              onClick={() => onDelete && item?.id && onDelete(item.id)}
              sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
};

export default React.memo(DateDividerRow);
