import React from 'react'
import { create } from 'zustand'

interface PlayerProps {
  ids: string[],
  activeId?: string,
  setId: (id: string) => void
  setIds: (ids: string[]) => void
  reset: () => void
}

const usePlayer = create<PlayerProps>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ activeId: undefined, ids: [] })
}))

export default usePlayer;