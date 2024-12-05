'use client';
import { Tables } from '@/utils/supabase/database.types'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { getFileData, getSchema } from '../services/getFile';
import { useDataSet } from '../hooks/useDataSet';
import { useRouter } from 'next/navigation';
import { CustomAlert } from '@/components/alert';

type props = {
    readonly data: Tables<'datasets'>[]
}
export const DataSet = ({ data }: props) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { set, setFile, setSchema } = useDataSet()
    const route = useRouter()
    const getDataFile = async (d: Tables<'datasets'>) => {
        setError(false)
        setLoading(true)
        const data = await getFileData(d.name_file);

        if (data) {
            set(d);
            setFile(data);
            if (d.schema_id) {
                const schema = await getSchema(d.schema_id);
                if (schema) {
                    setSchema(schema)
                }
            }
            route.push('/diagrams?id=' + d.id)
        } else {
            setError(true)
            setLoading(false)
        }
    }

    return (
        <div className="flex p-3 flex-col container">
            <p className="font-bold block my-2">Dataset List</p>
            <div className='container flex'>
                <div className="container mt-3">
                    {
                        error &&
                        <div className='my-2'>
                            <CustomAlert
                                message='No data found'
                                severity='warning'
                                title='Error when read file'
                            />
                        </div>
                    }
                    {
                        data.map(e => (
                            <div
                                key={e.id}
                                style={{cursor: 'pointer!important'}}
                                className='border-b-slate-500 border cursor-pointer max-sm p-3 flex justify-between items-center'
                            >
                                <p className='text-lg'>{e.name_file}</p>
                                <Button disabled={loading} className='size-3' onClick={() => getDataFile(e)}>
                                    {
                                        loading ? 'Loading...' : 'Open'
                                    }
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
