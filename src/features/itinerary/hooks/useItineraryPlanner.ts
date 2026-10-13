import { useCallback, useState } from 'react';

import { createEmptyDateDivider, createEmptyItineraryItem, ItineraryItem, DateDivider } from '../../../types/itinerary';

type Timeline = Array<ItineraryItem | DateDivider>;

export function useItineraryPlanner() {
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

  return {
    timelineList,
    handleItemChange,
    handleDelete,
    handleAddItemUnderDivider,
    handleAddDivider,
  };
}
