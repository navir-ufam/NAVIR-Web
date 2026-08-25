import { LoaderCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export type LoadingVariant = 'table' | 'cards' | 'spinner' | 'page'

type LoadingStateProps = {
  variant?: LoadingVariant
  count?: number
  text?: string
  className?: string
}

export function LoadingState({
  variant = 'spinner',
  count = 3,
  text = 'Carregando informações...',
  className,
}: Readonly<LoadingStateProps>) {
  if (variant === 'table') {
    return (
      <div className={cn('w-full space-y-3 p-4 bg-card border border-border rounded-xl shadow-xs', className)} role="status" aria-label={text}>
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        {Array.from({ length: count }).map((_, index) => (
          <div key={`table-skeleton-${index + 1}`} className="flex items-center justify-between py-2 space-x-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/5" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full', className)} role="status" aria-label={text}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={`card-skeleton-${index + 1}`} className="p-5 border border-border bg-card rounded-xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <div className="pt-2 flex justify-between items-center">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-24 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'page') {
    return (
      <div className={cn('space-y-6 w-full max-w-4xl p-6 bg-card border border-border rounded-xl shadow-xs', className)} role="status" aria-label={text}>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('flex flex-col items-center justify-center p-8 text-center space-y-3 w-full', className)}
      role="status"
      aria-label={text}
    >
      <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      <span className="text-xs font-medium text-muted-foreground">{text}</span>
    </div>
  )
}

export default LoadingState
