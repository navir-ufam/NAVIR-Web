export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <span className="absolute text-[10px] font-extrabold text-primary tracking-tighter">
          NAVIR
        </span>
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Carregando módulo...
      </p>
    </div>
  )
}

export default PageLoader
