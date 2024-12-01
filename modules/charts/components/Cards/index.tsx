import { ChartData, ChartType } from 'chart.js'
import { Grip } from 'lucide-react';
import React from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

// ChartData<"doughnut", number[], unknown>
interface Props {
    config: ChartData;
    type: ChartType
    long?: 1 | 2 | 3 | 4;
    title: string;
}

export function Card({ config, type, title, long = 1 }: Props) {

    const props = {
        data: config,
        width: long <= 1 ? 200 : (long || 2) * 200,
        height: 200,
        style: {
            maxWidth: '99%',
        }
    }
    return (
        <div style={{ width: `${(long || 1) * 33}%`, }} className="relative max-w-sm align max-h-96 h-96 shadow-lg rounded overflow-hidden border">
            <Grip style={{
                cursor: 'move',
                position: 'absolute',
                right: 3,
                top: 3
            }} className="drag-move" />
            <div className="p-6 flex items-center justify-center flex-col">
                <div className="p-4 w-max">
                    {
                        type === 'doughnut' &&
                        //@ts-ignore
                        <Doughnut
                            {...props}

                        />
                    }
                    {
                        type === 'line' &&
                        //@ts-ignore
                        <Line
                            {...props}
                        />
                    }
                    {
                        type === 'bar' &&
                        //@ts-ignore
                        <Bar
                            {...props}
                        />
                    }
                </div>

                <h2 className="text-sl font-semibold text-gray-800">{title}</h2>

                <button className="mt-1 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                    Show
                </button>
            </div>
        </div>

    )
}
