import { useAuth } from '@/hooks/use-auth'
import { useIntegration } from '@/hooks/use-integration'
import { useLanguage } from '@/hooks/use-language'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import usePreferencesStore from '@/stores/use-preferences-store'

export function Header() {
  const { user, signOut } = useAuth()
  const { integration } = useIntegration()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const { focusMode } = usePreferencesStore()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const getStatusColor = (status?: string) => {
    if (status === 'CONNECTED') return 'bg-primary'
    if (status === 'WAITING_QR') return 'bg-blue-500 animate-pulse'
    return 'bg-muted-foreground'
  }

  return (
    <div
      className={cn(
        'fixed top-0 inset-x-0 z-50 group transition-all duration-700',
        focusMode ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100',
      )}
    >
      {/* Invisible hit area to trigger header visibility on hover */}
      <div className="absolute top-0 inset-x-0 h-4 bg-transparent z-50" />

      <header className="relative flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur-2xl px-6 md:px-10 transition-all duration-500 -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="flex items-center">
            <span className="text-xl font-light tracking-tight text-foreground select-none">
              ZapKore Closer
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-bold text-foreground bg-muted/50 px-4 py-2 rounded-full border border-border shadow-subtle hidden sm:flex">
            <div className={cn('h-2.5 w-2.5 rounded-full', getStatusColor(integration?.status))} />
            <span className="tracking-tight uppercase">
              {integration?.status === 'CONNECTED'
                ? t('connected')
                : integration?.status === 'WAITING_QR'
                  ? t('waiting_qr')
                  : t('disconnected')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="h-10 w-10 border-2 border-border shadow-subtle cursor-pointer hover:scale-105 transition-transform duration-300">
                <AvatarFallback className="bg-muted text-foreground font-bold text-sm">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-60 rounded-2xl shadow-elevation border border-border p-2"
            >
              <div className="px-4 py-3 mb-1 text-[13px] font-semibold text-muted-foreground truncate border-b border-border">
                {user?.email}
              </div>
              <DropdownMenuItem
                asChild
                className="rounded-xl cursor-pointer my-1 focus:bg-muted py-2.5"
              >
                <Link to="/settings" className="flex items-center gap-3 font-semibold">
                  <Settings className="h-4 w-4 text-muted-foreground" /> {t('settings_nav')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 rounded-xl flex items-center gap-3 font-semibold py-2.5"
              >
                <LogOut className="h-4 w-4" /> {t('logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
}
