import React from 'react'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface VercelSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean;
}

export default function Select({ disabled, options, value, onChange, placeholder = 'Select an option' }: Readonly<VercelSelectProps>) {
  return (
    <div className="relative">
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-[#0A0A0A] border border-[#333] text-white py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0070F3] focus:border-transparent"
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  )
}

