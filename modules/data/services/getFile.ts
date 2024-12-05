'use server';
import { createClient } from "@/utils/supabase/server"

export const getFileData = async (id: string) => {
    const client = await createClient()
    const list = await client.storage.from('data_sets').list()
    console.log(list)
    const file = await client.storage.from('data_sets').download(id + '_cvs.json')
    if (file) {
        const json = await file.data?.text();
        return JSON.parse(json ?? '[{"error": "File not found"}]') as Record<string, string>[];
    }
    return null;
}