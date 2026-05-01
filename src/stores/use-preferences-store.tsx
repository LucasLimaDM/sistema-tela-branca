import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeTint = 'white' | 'paper' | 'cream'
export type GridType = 'blank' | 'dots' | 'lines'
export type TypographyStyle = 'sans' | 'serif'

interface PreferencesState {
  focusMode: boolean
  themeTint: ThemeTint
  gridType: GridType
  typography: TypographyStyle
  isSettingsOpen: boolean
  content: string
  setFocusMode: (mode: boolean) => void
  setThemeTint: (tint: ThemeTint) => void
  setGridType: (grid: GridType) => void
  setTypography: (type: TypographyStyle) => void
  setSettingsOpen: (open: boolean) => void
  setContent: (content: string) => void
  clearContent: () => void
}

const defaultState: Omit<
  PreferencesState,
  | 'setFocusMode'
  | 'setThemeTint'
  | 'setGridType'
  | 'setTypography'
  | 'setSettingsOpen'
  | 'setContent'
  | 'clearContent'
> = {
  focusMode: false,
  themeTint: 'white',
  gridType: 'blank',
  typography: 'sans',
  isSettingsOpen: false,
  content: '',
}

const PreferencesContext = createContext<PreferencesState | undefined>(undefined)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [focusMode, setFocusMode] = useState<boolean>(defaultState.focusMode)
  const [themeTint, setThemeTintState] = useState<ThemeTint>(defaultState.themeTint)
  const [gridType, setGridTypeState] = useState<GridType>(defaultState.gridType)
  const [typography, setTypographyState] = useState<TypographyStyle>(defaultState.typography)
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(defaultState.isSettingsOpen)
  const [content, setContent] = useState<string>(defaultState.content)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('white-screen-prefs')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.themeTint) setThemeTintState(parsed.themeTint)
        if (parsed.gridType) setGridTypeState(parsed.gridType)
        if (parsed.typography) setTypographyState(parsed.typography)
      }
      const storedContent = localStorage.getItem('white-screen-content')
      if (storedContent) {
        setContent(storedContent)
      }
    } catch (e) {
      console.error('Failed to load preferences', e)
    }
    setIsLoaded(true)
  }, [])

  // Save to local storage on change
  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem('white-screen-prefs', JSON.stringify({ themeTint, gridType, typography }))
  }, [themeTint, gridType, typography, isLoaded])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem('white-screen-content', content)
  }, [content, isLoaded])

  const setThemeTint = (tint: ThemeTint) => setThemeTintState(tint)
  const setGridType = (grid: GridType) => setGridTypeState(grid)
  const setTypography = (type: TypographyStyle) => setTypographyState(type)
  const clearContent = () => setContent('')

  const value = {
    focusMode,
    themeTint,
    gridType,
    typography,
    isSettingsOpen,
    content,
    setFocusMode,
    setThemeTint,
    setGridType,
    setTypography,
    setSettingsOpen,
    setContent,
    clearContent,
  }

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export default function usePreferencesStore() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error('usePreferencesStore must be used within a PreferencesProvider')
  }
  return context
}
