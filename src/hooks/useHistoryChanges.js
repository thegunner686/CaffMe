import { create } from 'zustand';

export const useHistoryChange = create((set) => ({
  historyChange: 0,
  triggerRefresh: () => set((state) => ({ historyChange: state.historyChange + 1 })),
}));
