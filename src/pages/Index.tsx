import { useRef, useEffect } from 'react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from '@/components/ui/context-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import usePreferencesStore from '@/stores/use-preferences-store'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Trash2, Grid3X3, Download, Maximize, Settings2, Eye, EyeOff } from 'lucide-react'

const Index = () => {
  const {
    content,
    setContent,
    clearContent,
    gridType,
    setGridType,
    themeTint,
    setThemeTint,
    typography,
    setTypography,
    isSettingsOpen,
    setSettingsOpen,
    focusMode,
    setFocusMode,
  } = usePreferencesStore()

  const { toast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hasInteracted = content.length > 0

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Fullscreen (Ctrl+F)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        handleFullscreen()
      }
      // Toggle Focus Mode (Ctrl+H)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault()
        setFocusMode(!focusMode)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusMode, setFocusMode])

  const handleExport = () => {
    toast({
      title: 'Exportação Concluída',
      description: 'A visualização atual foi salva.',
    })
  }

  const toggleGrid = () => {
    const nextGrid = gridType === 'blank' ? 'dots' : gridType === 'dots' ? 'lines' : 'blank'
    setGridType(nextGrid)
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  const bgClass =
    themeTint === 'paper'
      ? 'bg-tint-paper'
      : themeTint === 'cream'
        ? 'bg-tint-cream'
        : 'bg-tint-white'
  const gridClass = gridType === 'dots' ? 'bg-dots' : gridType === 'lines' ? 'bg-lines' : ''

  return (
    <div
      className={cn(
        'flex-1 w-full min-h-screen transition-colors duration-500',
        bgClass,
        gridClass,
      )}
    >
      <ContextMenu>
        <ContextMenuTrigger className="w-full min-h-screen relative cursor-text block flex flex-col">
          {/* Welcome Micro-interaction */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ease-in-out',
              hasInteracted ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
            )}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-400/40 select-none animate-fade-in-up">
              Comece aqui...
            </span>
          </div>

          {/* The Digital Canvas */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={cn(
              'flex-1 w-full h-full resize-none outline-none bg-transparent text-slate-900 placeholder-transparent',
              'p-8 sm:p-16 md:p-24 lg:p-32 leading-relaxed transition-colors duration-300',
              typography === 'sans'
                ? 'font-sans-serif text-lg md:text-xl lg:text-2xl'
                : 'font-serif-custom text-xl md:text-2xl lg:text-3xl',
            )}
            spellCheck={false}
            autoFocus
          />
        </ContextMenuTrigger>

        <ContextMenuContent className="w-64 animate-fade-scale shadow-elevation border-slate-100 rounded-xl p-1.5 bg-background">
          <ContextMenuItem
            onClick={clearContent}
            className="text-red-600 focus:text-red-700 focus:bg-red-50 gap-2 rounded-lg cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>Limpar Tela</span>
          </ContextMenuItem>

          <ContextMenuSeparator className="my-1.5 opacity-50" />

          <ContextMenuItem
            onClick={toggleGrid}
            className="gap-2 rounded-lg cursor-pointer text-slate-700"
          >
            <Grid3X3 className="h-4 w-4 text-slate-400" />
            <span>Alternar Grade</span>
            <ContextMenuShortcut className="text-slate-400">
              {gridType === 'blank' ? 'Desligado' : 'Ligado'}
            </ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem
            onClick={() => setFocusMode(!focusMode)}
            className="gap-2 rounded-lg cursor-pointer text-slate-700"
          >
            {focusMode ? (
              <EyeOff className="h-4 w-4 text-slate-400" />
            ) : (
              <Eye className="h-4 w-4 text-slate-400" />
            )}
            <span>{focusMode ? 'Sair do Foco' : 'Modo Foco'}</span>
            <ContextMenuShortcut className="text-slate-400">Ctrl+H</ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem
            onClick={handleExport}
            className="gap-2 rounded-lg cursor-pointer text-slate-700"
          >
            <Download className="h-4 w-4 text-slate-400" />
            <span>Exportar Visualização</span>
          </ContextMenuItem>

          <ContextMenuSeparator className="my-1.5 opacity-50" />

          <ContextMenuItem
            onClick={() => setSettingsOpen(true)}
            className="gap-2 rounded-lg cursor-pointer text-slate-700"
          >
            <Settings2 className="h-4 w-4 text-slate-400" />
            <span>Configurações</span>
          </ContextMenuItem>

          <ContextMenuItem
            onClick={handleFullscreen}
            className="gap-2 rounded-lg cursor-pointer text-slate-700"
          >
            <Maximize className="h-4 w-4 text-slate-400" />
            <span>Tela Cheia</span>
            <ContextMenuShortcut className="text-slate-400">Ctrl+F</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={isSettingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">Configurações do Workspace</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-500">Tema de Fundo</h4>
              <div className="flex gap-4">
                <button
                  onClick={() => setThemeTint('white')}
                  className={cn(
                    'w-12 h-12 rounded-full border-2 transition-all bg-white',
                    themeTint === 'white'
                      ? 'border-slate-900 scale-110 shadow-md'
                      : 'border-slate-200 shadow-sm hover:scale-105',
                  )}
                  aria-label="Branco"
                />
                <button
                  onClick={() => setThemeTint('paper')}
                  className={cn(
                    'w-12 h-12 rounded-full border-2 transition-all bg-[#f9f9f9]',
                    themeTint === 'paper'
                      ? 'border-slate-900 scale-110 shadow-md'
                      : 'border-slate-200 shadow-sm hover:scale-105',
                  )}
                  aria-label="Papel"
                />
                <button
                  onClick={() => setThemeTint('cream')}
                  className={cn(
                    'w-12 h-12 rounded-full border-2 transition-all bg-[#fffdd0]',
                    themeTint === 'cream'
                      ? 'border-slate-900 scale-110 shadow-md'
                      : 'border-slate-200 shadow-sm hover:scale-105',
                  )}
                  aria-label="Creme"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-500">Tipografia</h4>
              <div className="flex gap-3">
                <button
                  onClick={() => setTypography('sans')}
                  className={cn(
                    'px-4 py-2 rounded-lg border font-sans-serif text-sm transition-all',
                    typography === 'sans'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-900 hover:bg-slate-50',
                  )}
                >
                  Sem Serifa
                </button>
                <button
                  onClick={() => setTypography('serif')}
                  className={cn(
                    'px-4 py-2 rounded-lg border font-serif-custom text-sm transition-all',
                    typography === 'serif'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-900 hover:bg-slate-50',
                  )}
                >
                  Serifada
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Index
