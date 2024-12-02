import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export type AlertSeverity = 'error' | 'success' | 'info' | 'warning'

interface CustomAlertProps {
  readonly title: string
  readonly message: string
  readonly severity: AlertSeverity
}

const severityConfig = {
  error: { icon: AlertCircle, variant: "destructive" },
  success: { icon: CheckCircle, variant: "default" },
  info: { icon: Info, variant: "default" },
  warning: { icon: AlertTriangle, variant: "default" }
}

export function CustomAlert({ title, message, severity }: CustomAlertProps) {
  const { icon: Icon, variant } = severityConfig[severity]

  return (
    <Alert 
      variant={variant as "default" | "destructive"} 
      className={cn(
        severity === 'success' && "border-green-500 text-green-700 dark:border-green-400 dark:text-green-300",
        severity === 'info' && "border-blue-500 text-blue-700 dark:border-blue-400 dark:text-blue-300",
        severity === 'warning' && "border-yellow-500 text-yellow-700 dark:border-yellow-400 dark:text-yellow-300"
      )}
    >
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

