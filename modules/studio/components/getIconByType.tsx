import { CheckIcon, HashIcon, LucideProps, TextIcon, TimerIcon } from 'lucide-react'
import React from 'react'

type props = {
    readonly type: 'string' | 'number' | 'bigint' | 'boolean' | 'float' | 'date' | 'datetime' | 'time' | 'timestamp'
}
const Icon: Record<props['type'], React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>> = {
    string: TextIcon,
    number: HashIcon,
    bigint: HashIcon,
    boolean: CheckIcon,
    float: HashIcon,
    date: TimerIcon,
    datetime: TimerIcon,
    time: TimerIcon,
    timestamp: TimerIcon
}
export const GetIconByType = ({ type }: props) => {
    const I = Icon[type]
    return I ? <span title={type}><I className='size-1' /></span> : null
}
