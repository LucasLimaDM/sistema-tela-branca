import { useRef, useEffect } from 'react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from '@/components/ui/context-menu'
import usePreferencesStore from '@/stores/use-preferences-store'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Trash2, Grid3X3, Download, Maximize, Settings2 } from 'lucide-react'

const Index = () => {
  const { content, setContent, clearContent, gridType, setGridType, typography, setSettingsOpen } =
    usePreferencesStore()

  const { toast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const hasInteracted = content.length > 0

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleExport = () => {
    toast({
      title: 'Exportação Concluída',
      description: 'A visualização atual foi salva (Simulado).',
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

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex-1 w-full h-full relative cursor-text">
        {/* Welcome Micro-interaction */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ease-apple',
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
            'w-full h-full resize-none outline-none bg-transparent text-slate-900 placeholder-transparent',
            'p-8 sm:p-16 md:p-24 lg:p-32 leading-relaxed transition-colors duration-300',
            typography === 'sans'
              ? 'font-sans-serif text-lg md:text-xl lg:text-2xl'
              : 'font-serif-custom text-xl md:text-2xl lg:text-3xl',
          )}
          spellCheck={false}
          autoFocus
        />
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56 animate-fade-scale shadow-elevation border-slate-100 rounded-xl p-1.5">
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
          <ContextMenuShortcut className="text-slate-400">F</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default Index
