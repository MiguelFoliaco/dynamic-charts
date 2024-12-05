import { Tables } from '@/utils/supabase/database.types'
import React from 'react'
import { create } from 'zustand'


type State = {
    file?: Record<string, string>[];
    selected?: Tables<'datasets'>;
    set: (data?: Tables<'datasets'>) => void;
    setFile: (file: Record<string, string>[]) => void;
    schema?: Tables<'schemas'> & { properties: Tables<'properties'>[] };
    setSchema: (schema: Tables<'schemas'> & { properties: Tables<'properties'>[] }) => void
}
export const useDataSet = create<State>((set) => ({
    set: (data) => set({ selected: data }),
    setFile: (file) => set({ file }),
    setSchema: (schema) => set({ schema }),
}))
