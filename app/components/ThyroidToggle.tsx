'use client'

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type ThyroidCondition = 'hypothyroidism' | 'hyperthyroidism'

interface ThyroidToggleProps {
  onChange: (condition: ThyroidCondition) => void
}

export function ThyroidToggle({ onChange }: ThyroidToggleProps) {
  const [isHyperthyroidism, setIsHyperthyroidism] = useState(false)

  const handleToggle = (checked: boolean) => {
    setIsHyperthyroidism(checked)
    onChange(checked ? 'hyperthyroidism' : 'hypothyroidism')
  }

  return (
    <div className="flex flex-col items-center space-y-4 bg-white rounded-xl p-6 shadow-lg border border-blue-100">
      <Label htmlFor="thyroid-toggle" className="text-xl font-bold text-blue-900 mb-2">
        Select Thyroid Condition
      </Label>
      <div className="flex items-center justify-center w-full space-x-4">
        <span className={`text-sm ${!isHyperthyroidism ? 'font-bold text-blue-900' : 'text-gray-600'} text-right w-1/3`}>
          Hypothyroidism<br />(under-active)
        </span>
        <Switch
          id="thyroid-toggle"
          checked={isHyperthyroidism}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200 h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 [&>span]:block [&>span]:h-5 [&>span]:w-5 [&>span]:rounded-full [&>span]:bg-white [&>span]:shadow-lg [&>span]:ring-0 [&>span]:transition-transform data-[state=checked]:[&>span]:translate-x-5 data-[state=unchecked]:[&>span]:translate-x-0"
        />
        <span className={`text-sm ${isHyperthyroidism ? 'font-bold text-blue-900' : 'text-gray-600'} text-left w-1/3`}>
          Hyperthyroidism<br />(over-active)
        </span>
      </div>
    </div>
  )
}

