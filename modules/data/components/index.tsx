'use client';
import { Table } from '@/components/ui/table'
import { Tables } from '@/utils/supabase/database.types'
import React, { useState } from 'react'
import { getFileData } from '../services/getFile';

type props = {
    readonly data: Tables<'datasets'>[]
}
export const DataSet = ({ data }: props) => {

    const [tableData, setTableData] = useState<Record<string, string>[]>([])
    const [loading, setLoading] = useState(false)
    const getData = async (path: string) => {
        setLoading(true)
        const item = await getFileData(path);
        if (item) {
            setTableData(item)
        }
        setLoading(false)
    }
    return (
        <div className="flex p-3 flex-col container">
            <p className="font-bold block my-2">Dataset List</p>

            <div className='container flex'>
                <div className='flex flex-wrap container w-1/2'>
                    {
                        data.map(e => (
                            <div
                                role='button'
                                onClick={() => getData(e.name_file)}
                                style={{ width: '250px', height: '100px' }}
                                key={e.id}
                                className='border-b-slate-500 border cursor-pointer max-sm p-3 flex flex-col'
                            >
                                <p>{e.name_file}</p>
                                <p className='my-2 text-xs'>Created at: {new Date(e.created_at).toLocaleString()}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='container w-1/2'>
                    
                    {
                        loading ?
                            <p>Loading...</p>
                            :
                            (

                                tableData?.length > 0 &&
                                <Table
                                    data={tableData}
                                />
                            )
                    }
                    
                </div>
            </div>

        </div>
    )
}
