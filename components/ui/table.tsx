import React, { useMemo } from 'react'

type props = {
    data: Record<string, string>[]
}
export const Table = ({ data }: props) => {
    const headers = useMemo(() => Object.keys(data[0] || {}), [data]);
    return (
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
    )
}
