import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

const THEME_STORAGE_KEY = 'navir_theme'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): ThemeMode {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved
    }
  }
  return 'light'
}

function resolveIsDark(mode: ThemeMode): boolean {
  if (mode === 'dark') return true
  if (mode === 'light') return false
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return false
}

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    const isDark = resolveIsDark(currentTheme)

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    if (currentTheme === 'system' && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      if (mediaQuery && typeof mediaQuery.addEventListener === 'function') {
        const handleChange = (e: MediaQueryListEvent) => {
          if (e.matches) {
            root.classList.add('dark')
          } else {
            root.classList.remove('dark')
          }
        }
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [currentTheme])

  const setTheme = useCallback((newTheme: ThemeMode) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    setCurrentTheme(newTheme)
  }, [])

  const contextValue = useMemo(() => ({ theme: currentTheme, setTheme }), [currentTheme, setTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser utilizado dentro de um ThemeProvider')
  }
  return context
}
