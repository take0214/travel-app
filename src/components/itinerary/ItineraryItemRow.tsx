import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from '@mui/material';
import { Delete as DeleteOutlineIcon, WarningAmber as WarningAmberIcon } from '@mui/icons-material';

import MoveForm from './MoveForm';
import GeneralForm from './GeneralForm';
import { CATEGORY_OPTIONS, ItineraryItem } from '../../types/itinerary';

type Props = {
  item: ItineraryItem;
  onChange: (id: string, field: string, value: any) => void;
  onDelete: (id: string) => void;
};

const ItineraryItemRow: React.FC<Props> = ({ item, onChange, onDelete }) => {
  const isTimeOrderInvalid = Boolean(
    item.startTime && item.endTime && item.endTime < item.startTime
  );

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '32px',
        backgroundColor: '#ffffff',
        borderLeft: item.category === 'move' ? '4px solid #ed6c02' : '4px solid #1976d2',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} md={3}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}>
              時間設定
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                type="time"
                size="small"
                value={item.startTime || ''}
                onChange={(e) => onChange(item.id, 'startTime', e.target.value)}
                inputProps={{ step: 300 }}
                fullWidth
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>〜</Typography>
              <TextField
                type="time"
                size="small"
                value={item.endTime || ''}
                onChange={(e) => onChange(item.id, 'endTime', e.target.value)}
                inputProps={{ step: 300 }}
                fullWidth
              />
            </Box>

            {isTimeOrderInvalid && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.8, color: 'warning.main' }}>
                <WarningAmberIcon fontSize="small" />
                <Typography variant="caption">終了時刻が前になっています</Typography>
              </Box>
            )}
          </Grid>

          <Grid item xs={10} sm={10} md={2.5}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}>
              カテゴリ
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel id={`cat-label-${item.id}`}>活動種別</InputLabel>
              <Select
                labelId={`cat-label-${item.id}`}
                value={item.category || 'meal'}
                label="活動種別"
                onChange={(e) => onChange(item.id, 'category', e.target.value)}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={5.5}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}>
              詳細入力
            </Typography>
            {item.category === 'move' ? (
              <MoveForm item={item} onChange={onChange} />
            ) : (
              <GeneralForm item={item} onChange={onChange} />
            )}
          </Grid>

          <Grid item xs={2} sm={2} md={1} sx={{ display: 'flex', justifyContent: 'flex-end', pt: 3 }}>
            <Tooltip title="この予定を削除">
              <IconButton
                size="small"
                onClick={() => onDelete(item.id)}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main' },
                }}
              >
                <DeleteOutlineIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default React.memo(ItineraryItemRow);
