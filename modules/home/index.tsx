'use client';

import { Button } from '@/components/ui/button';
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
    ChartData,
    ChartType,
} from 'chart.js';
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { Card } from '../charts/components/Cards';
import { animations } from '@formkit/drag-and-drop';
import SearchBar from './components/Search';
import Link from 'next/link';
// Registro de todos los elementos, controladores, escalas y plugins
ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

type config = (ChartData & {
    type: ChartType
    title: string;
    long?: 1 | 2 | 3 | 4
})


export const Home = () => {

    const data: config[] = [
        {
            title: 'Graph type Doughnut',
            type: 'doughnut',
            labels: ['Label1', 'Label2', 'Label3'],
            datasets: [
                {
                    data: [10, 20, 30],
                    backgroundColor: ['#ff1f4f', '#0199ff', '#ff9e16'],
                    hoverBackgroundColor: ['#ff1f4f', '#0199ff', '#ff9e16'],
                },
            ],
        },
        {
            title: 'Graph type Doughnut',
            type: 'doughnut',
            labels: ['Clients', 'No Clients'],
            datasets: [
                {
                    data: [1029, 3902],
                    backgroundColor: ['#fff', '#000'],
                    hoverBackgroundColor: ['#dedede', '#303030']
                },
            ]
        },
        {
            title: 'Graph type Line',
            type: 'line',
            labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7'],
            datasets: [
                {
                    data: [0, 1, 3, 2, 5, 6, 7],
                    label: 'My first dataset line',
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                }
            ],
            long: 2
        },
        {
            title: 'Graph type Bar',
            type: 'bar',
            long: 4,
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        }
    ];

    const [ref, tape] = useDragAndDrop<HTMLDivElement, config>(data, {
        plugins: [animations()],
        dragHandle: '.drag-move'
    })

    return <div className='container align-left'>
        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <p className='text-1xl font-bold mb-2'>Your Reports</p>
                <Button
                    className='py-1.5 px-3 size-2.5 hover:bg-blue-500'
                >
                    <Link href={'/studio'}>Add report</Link>
                </Button>
            </div>
            <div>
                <SearchBar />
            </div>
        </div>
        <div style={{ margin: '10px 0px' }} className='container  my-1 border-t border-gray-300 border-opacity-25' />
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '95vw',
                margin: 'auto',
                gap: '10px',
            }}
            ref={ref}
        >
            {
                tape.map((e, i) =>
                    <Card
                        title={e.title}
                        long={e.long}
                        data-label={e}
                        type={e.type}
                        key={new Date().getTime() + 'i' + i}
                        config={{
                            datasets: e.datasets,
                            labels: e.labels,
                        }}
                    />
                )
            }
        </div>
    </div>
}