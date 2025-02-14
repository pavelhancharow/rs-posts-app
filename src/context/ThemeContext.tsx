import {
  ChangeEvent,
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ThemeTypes } from '../enums';
import { localStorageService } from '../services';

const ThemeContext = createContext<ThemeTypes>(ThemeTypes.Light);

type ThemeToggle = (event: ChangeEvent<HTMLInputElement>) => void;

const ThemeDispatchContext = createContext<ThemeToggle>(() => {});

interface ThemeContextProps {
  root: HTMLElement;
  children: ReactNode;
}

const ThemeContextProvider = ({ children, root }: ThemeContextProps) => {
  const ref = useRef<HTMLElement>(root);
  const [theme, setTheme] = useState<ThemeTypes>(
    localStorageService.usersTheme
  );

  useEffect(() => {
    if (
      !ref.current?.parentElement?.hasAttribute('data-theme') ||
      theme !== localStorageService.usersTheme
    ) {
      localStorageService.usersTheme = theme;
      ref.current?.parentElement?.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? ThemeTypes.Dark : ThemeTypes.Light);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={toggleTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

export { ThemeContext, ThemeDispatchContext };
