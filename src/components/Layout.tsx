import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Settings, Maximize, EyeOff, Eye, Info, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import usePreferencesStore from '@/stores/use-preferences-store'
import { SettingsSheet } from './SettingsSheet'
import { useToast } from '@/hooks/use-toast'

export default function Layout() {
  const [mouseY, setMouseY] = useState(0)
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const { focusMode, setFocusMode, setSettingsOpen, themeTint, gridType, clearContent } =
    usePreferencesStore()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMouseY(e.clientY)
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isTyping =
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'INPUT'

      if (e.key === 'Escape') {
        if (isTyping) (document.activeElement as HTMLElement).blur()
        setSettingsOpen(false)
      }

      if (!isTyping) {
        if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          toggleFullscreen()
        }
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          setFocusMode(!focusMode)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusMode, setFocusMode, setSettingsOpen])

  const showUI = isMobile ? !focusMode : !focusMode || mouseY < 80
  const isFullscreen = document.fullscreenElement !== null

  const bgClass = cn('min-h-screen w-full transition-colors duration-700 ease-in-out relative', {
    'bg-tint-white': themeTint === 'white',
    'bg-tint-paper': themeTint === 'paper',
    'bg-tint-cream': themeTint === 'cream',
  })

  const gridClass = cn(
    'absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply transition-opacity duration-700',
    {
      'bg-dots': gridType === 'dots',
      'bg-lines': gridType === 'lines',
      'opacity-0': gridType === 'blank',
    },
  )

  return (
    <div className={bgClass}>
      <div className={gridClass} />

      {/* Invisible Header */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-4 transition-all duration-500 ease-apple',
          showUI ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none',
          'bg-gradient-to-b from-white/80 to-transparent backdrop-blur-[2px]',
        )}
      >
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-sm bg-slate-900 flex items-center justify-center shadow-subtle">
            <div className="h-2 w-2 bg-white rounded-full" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-slate-800 hidden sm:inline-block">
            Tela Branca
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  toast({
                    title: 'Sistema Tela Branca',
                    description: 'Um ambiente minimalista para foco profundo.',
                  })
                }
                className="text-slate-500 hover:text-slate-900"
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Informações</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFocusMode(!focusMode)}
                className="text-slate-500 hover:text-slate-900"
              >
                {focusMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Modo Foco (H)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                className="text-slate-500 hover:text-slate-900"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Configurações</TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full h-screen flex flex-col">
        <Outlet />
      </main>

      {/* Floating Controls (Bottom) */}
      <div
        className={cn(
          'fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-elevation rounded-full px-3 py-2 transition-all duration-500 ease-apple',
          showUI && !isMobile
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0 pointer-events-none scale-95',
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100"
              onClick={clearContent}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Limpar Tela</TooltipContent>
        </Tooltip>

        <div className="w-px h-4 bg-slate-200 mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Tela Cheia (F)</TooltipContent>
        </Tooltip>
      </div>

      <SettingsSheet />
    </div>
  )
}
