import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from 'lucide-react'
import { Toaster as Sonner } from 'sonner'
import { useTheme } from '@/context'

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: Readonly<ToasterProps>) {
  const { theme } = useTheme()
  const themeMode = (theme as ToasterProps['theme']) || 'system'

  return (
    <Sonner
      theme={themeMode}
      className="toaster group"
      richColors
      icons={{
        success: <CircleCheck className="h-4 w-4 text-emerald-500" />,
        info: <Info className="h-4 w-4 text-sky-500" />,
        warning: <TriangleAlert className="h-4 w-4 text-amber-500" />,
        error: <OctagonX className="h-4 w-4 text-rose-500" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin text-sky-500" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl font-body text-xs rounded-xl',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-semibold',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
