import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function TodoInput({ onAdd }: { onAdd: (v: any) => void }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState<number | string>(1);
    const [unit, setUnit] = useState('個');

    const handleAddClick = () => {
        if (!name.trim()) return;

        const validQuantity = parseInt(String(quantity), 10);
        onAdd({
            name: name.trim(),
            quantity: isNaN(validQuantity) || validQuantity < 1 ? 1 : validQuantity,
            unit: unit.trim() || '個',
        });

        setName('');
        setQuantity(1);
        setUnit('個');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            handleAddClick();
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, marginBottom: 2, alignItems: 'center' }}>
            <TextField
                fullWidth
                size="small"
                placeholder="持ち物を入力"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <TextField
                type="number"
                size="small"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onKeyDown={handleKeyDown}
                inputProps={{ min: 1, style: { width: '45px', textAlign: 'center' } }}
            />

            <TextField
                size="small"
                placeholder="単位"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                onKeyDown={handleKeyDown}
                inputProps={{ style: { width: '40px', textAlign: 'center' } }}
            />

            <Button
                variant="contained"
                onClick={handleAddClick}
                sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
                追加
            </Button>
        </Box>
    );
}
