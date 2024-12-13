'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cloud, Lightbulb, Dumbbell, Utensils } from 'lucide-react'
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", icon: Cloud, label: "Home" },
    { href: "/learn", icon: Lightbulb, label: "Learn" },
    { href: "/workouts", icon: Dumbbell, label: "Workouts" },
    { href: "/nourish", icon: Utensils, label: "Nourish" }
  ]

  return (
    <div className={cn(
      "w-full",
      pathname.startsWith('/nourish') ? 'bg-green-800' : 'bg-transparent'
    )}>
      <nav className={cn(
        "flex justify-center gap-9 p-4 w-full",
        pathname.startsWith('/nourish') ? 'bg-green-800' : 'bg-transparent'
      )}>
        {links.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className="flex flex-col items-center"
              scroll="false"
            >
              <div className="relative flex flex-col items-center">
                <div className={cn(
                  "w-[72px] h-[72px] rounded-full border-2 flex items-center justify-center mb-1",
                  isActive 
                    ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.7)]" 
                    : pathname.startsWith('/nourish')
                      ? "border-white/50"
                      : "border-[#D4B6E2]"
                )}>
                  <div className={cn(
                    "flex flex-col items-center justify-center",
                    isActive 
                      ? "text-white" 
                      : pathname.startsWith('/nourish')
                        ? "text-white/70"
                        : "text-[#D4B6E2]"
                  )}>
                    <item.icon 
                      className={cn(
                        "h-7 w-7 transition-all duration-300",
                        isActive 
                          ? "filter drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]" 
                          : "filter drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]"
                      )} 
                    />
                    <span 
                      className={cn(
                        "text-xs font-medium mt-0.5 transition-all duration-300",
                        isActive 
                          ? "filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" 
                          : "filter drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

