import type { ComponentType } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ErrorStateProps = {
  icon?: ComponentType<{ className?: string }>
  title?: string
  description?: string
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

export function ErrorState({
  icon: Icon = AlertCircle,
  title = 'Não foi possível carregar os dados',
  description = 'Ocorreu uma falha na conexão com o servidor. Tente novamente.',
  onRetry,
  retryLabel = 'Tentar novamente',
  className,
}: Readonly<ErrorStateProps>) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-4 w-full max-w-md mx-auto my-6',
        className
      )}
      role="alert"
    >
      <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 shadow-xs">
        <Icon className="h-8 w-8 text-rose-500" />
      </div>

      <div className="space-y-1.5 max-w-xs">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>

      {onRetry && (
        <Button
          type="button"
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="mt-2 text-xs font-semibold border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          <span>{retryLabel}</span>
        </Button>
      )}
    </div>
  )
}

export default ErrorState
