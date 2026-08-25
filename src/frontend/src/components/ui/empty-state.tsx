import type { ComponentType } from 'react'
import { FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type EmptyStateAction = {
  label: string
  onClick: () => void
  icon?: ComponentType<{ className?: string }>
}

type EmptyStateProps = {
  icon?: ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: EmptyStateAction
  className?: string
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title,
  description,
  action,
  className,
}: Readonly<EmptyStateProps>) {
  const ActionIcon = action?.icon

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-border bg-card/50 space-y-4 w-full max-w-md mx-auto my-6',
        className
      )}
      role="region"
      aria-label={title}
    >
      <div className="p-3.5 rounded-2xl bg-muted/60 text-muted-foreground shadow-xs">
        <Icon className="h-8 w-8 text-muted-foreground/80" />
      </div>

      <div className="space-y-1.5 max-w-xs">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>

      {action && (
        <Button
          type="button"
          onClick={action.onClick}
          size="sm"
          className="mt-2 text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
        >
          {ActionIcon && <ActionIcon className="h-3.5 w-3.5 mr-1.5" />}
          <span>{action.label}</span>
        </Button>
      )}
    </div>
  )
}

export default EmptyState
