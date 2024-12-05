'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Select from '@/components/ui/select'
import React, { useMemo, useState } from 'react'
import { saveSchema as sc } from './../services/saveSchema';
import { useRouter } from 'next/navigation'

const types = ['string', 'number', 'bigint', 'boolean', 'float', 'date', 'datetime', 'time', 'timestamp']
type props = {
    data: Record<string, string>[]
    fileId: string;
}
export const Step1 = ({ data, fileId }: props) => {
    const router = useRouter()
    const [schema, setSchema] = useState<Record<string, string>>({})
    const headers = useMemo(() => Object.keys(data[0]), [data]);
    const [schemaName, setSchemaName] = useState('')
    const [loading, setLoading] = useState(false);

    const saveSchema = async () => {
        if (fileId) {
            setLoading(true);
            await sc(fileId, schema, schemaName)
            setLoading(false);
            router.push(`/datasets`)
        }
    }

    return (
        <div className='container'>
            <h1>Step 1</h1>

            <div className='flex justify-between'>
                <div className='container w-1/2 '>
                    <table cellSpacing={0} className='table-with-scroll '>
                        <thead>
                            <tr>
                                {headers.map((h) => <th className={`w-1/${headers.length}`} key={`header-${h}`}>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={JSON.stringify(row)}>
                                    {headers.map((h) => (
                                        <td className={`w-1/${headers.length}`} key={JSON.stringify(row[h])}>{row[h]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='container w-1/2'>
                    <p className='mb-2'>Schema configuration</p>
                    <div style={{ marginBottom: '10px' }}>
                        <Label htmlFor="name" className='my-2 mt-4'>Schema name</Label>
                        <Input disabled={loading} value={schemaName} onChange={(e) => setSchemaName(e.target.value)} type="text" required name="name" placeholder='Schema name' />
                    </div>
                    <div style={{ height: '250px', overflowY: 'scroll' }}>
                        {
                            headers.map((h) =>
                                <div key={`item-${h}`} className='my-2'>
                                    <Label htmlFor={h} style={{ marginBottom: 10 }}>Type of {h}</Label>
                                    <Select
                                        disabled={loading}
                                        options={types.map(t => ({ label: t, value: t }))}
                                        value={schema[h] || types[0]}
                                        onChange={(e) => {
                                            setSchema({ ...schema, [h]: e })
                                        }}
                                        placeholder='Select an option'
                                    />
                                </div>
                            )
                        }
                    </div>
                    <Button disabled={loading} className={`w-full mt-1`} onClick={saveSchema}>
                        {loading ? 'Loading...' : 'Save schema'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
