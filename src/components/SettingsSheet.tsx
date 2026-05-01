import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import usePreferencesStore from '@/stores/use-preferences-store'
import { LayoutGrid, Grid3X3, Minus, Type, Heading } from 'lucide-react'

export function SettingsSheet() {
  const {
    isSettingsOpen,
    setSettingsOpen,
    themeTint,
    setThemeTint,
    gridType,
    setGridType,
    typography,
    setTypography,
  } = usePreferencesStore()

  return (
    <Sheet open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <SheetContent className="w-[300px] sm:w-[350px] border-l border-slate-200 shadow-elevation z-[100]">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-xl font-medium tracking-tight text-slate-900">
            Configurações
          </SheetTitle>
          <SheetDescription className="text-slate-500 text-sm">
            Personalize sua experiência de tela branca.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8 animate-fade-scale">
          {/* Tonalidade da Tela */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tonalidade da Tela
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={themeTint === 'white' ? 'default' : 'outline'}
                className={`w-full ${themeTint === 'white' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}
                onClick={() => setThemeTint('white')}
              >
                Branco
              </Button>
              <Button
                variant={themeTint === 'paper' ? 'default' : 'outline'}
                className={`w-full ${themeTint === 'paper' ? 'bg-slate-900 text-white' : 'bg-[#F9F9F9] text-slate-700'}`}
                onClick={() => setThemeTint('paper')}
              >
                Papel
              </Button>
              <Button
                variant={themeTint === 'cream' ? 'default' : 'outline'}
                className={`w-full ${themeTint === 'cream' ? 'bg-slate-900 text-white' : 'bg-[#FFFDD0] text-slate-700'}`}
                onClick={() => setThemeTint('cream')}
              >
                Creme
              </Button>
            </div>
          </div>

          {/* Grade */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Padrão de Grade
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={gridType === 'blank' ? 'default' : 'outline'}
                className={`w-full flex flex-col gap-1 h-auto py-3 ${gridType === 'blank' ? 'bg-slate-900' : ''}`}
                onClick={() => setGridType('blank')}
              >
                <LayoutGrid className="h-4 w-4 opacity-50" />
                <span className="text-xs">Liso</span>
              </Button>
              <Button
                variant={gridType === 'dots' ? 'default' : 'outline'}
                className={`w-full flex flex-col gap-1 h-auto py-3 ${gridType === 'dots' ? 'bg-slate-900' : ''}`}
                onClick={() => setGridType('dots')}
              >
                <Grid3X3 className="h-4 w-4 opacity-50" />
                <span className="text-xs">Pontos</span>
              </Button>
              <Button
                variant={gridType === 'lines' ? 'default' : 'outline'}
                className={`w-full flex flex-col gap-1 h-auto py-3 ${gridType === 'lines' ? 'bg-slate-900' : ''}`}
                onClick={() => setGridType('lines')}
              >
                <Minus className="h-4 w-4 opacity-50" />
                <span className="text-xs">Linhas</span>
              </Button>
            </div>
          </div>

          {/* Tipografia */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tipografia Principal
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={typography === 'sans' ? 'default' : 'outline'}
                className={`w-full flex flex-col gap-1 h-auto py-3 font-sans-serif ${typography === 'sans' ? 'bg-slate-900' : ''}`}
                onClick={() => setTypography('sans')}
              >
                <Type className="h-4 w-4 opacity-50" />
                <span className="text-xs">Sans-Serif</span>
              </Button>
              <Button
                variant={typography === 'serif' ? 'default' : 'outline'}
                className={`w-full flex flex-col gap-1 h-auto py-3 font-serif-custom ${typography === 'serif' ? 'bg-slate-900' : ''}`}
                onClick={() => setTypography('serif')}
              >
                <Heading className="h-4 w-4 opacity-50" />
                <span className="text-xs">Serif</span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
