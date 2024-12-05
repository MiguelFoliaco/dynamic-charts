'use client';
import { useDataSet } from '@/modules/data/hooks/useDataSet';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'
import { GetIconByType } from './getIconByType';

export const Diagram = () => {
    const selected = useDataSet(state => state.selected!)
    const schema = useDataSet(state => state.schema!)
    const file = useDataSet(state => state.file!);
    const headers = useMemo(() => Object.keys(file ? file[0] : {}), [file]);
    const route = useRouter()

    useEffect(() => {
        if (!selected) {
            route.push('/datasets')
        }
    }, []);

    return (
        <div className='container w-full flex justify-between p-1'>
            <div style={{ width: '60%', height: '86vh' }} className="border-gray-100 border pt-0 ">
                <div style={{ backgroundColor: '#FFFFFF' }} className=' border-b px-3 py-1 block shadow-sm'>
                    <p style={{ color: '#1f1f1f' }}>{selected?.name_file}</p>
                </div>
            </div>
            <div style={{ width: '20%', height: '86vh' }} className="border-gray-100 border border-l">
                <div style={{ backgroundColor: '#FFFFFF' }} className=' border-b px-3 py-1 block shadow-sm'>
                    <p style={{ color: '#1f1f1f' }}>Charts</p>
                </div>
            </div>
            <div style={{ width: '20%', height: '86vh' }} className="border-gray-100 border border-l">
                <div style={{ backgroundColor: '#FFFFFF' }} className=' border-b px-3 py-1 block shadow-sm'>
                    <p style={{ color: '#1f1f1f' }}>Datos</p>
                </div>
                <div className='p-3'>
                    {
                        headers.map((h, i) => (
                            <div key={`${h}-${i}`} className='flex justify-between border px-2 py-2 hover:pl-3 hover:bg-gray-100 hover:cursor-pointer'>
                                <p className='text-sm '>{h}</p>
                                <GetIconByType
                                    //@ts-ignore
                                    type={schema.properties.find(e => e.column_name.toLowerCase() === h.toLowerCase())?.column_type ?? 'string'}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
