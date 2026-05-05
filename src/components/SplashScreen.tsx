import { Loader2 } from 'lucide-react'

export function SplashScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background">
      <h1 className="text-4xl font-light tracking-tight text-foreground">ZapKore Closer</h1>
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
}
