'use client'
import { createContext, useState, useCallback, useEffect } from "react";

const BreakPointContext = createContext();


export const BreakPointProvider = (props) => {
//Viewport breakpoints
const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);
  
    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);
  
    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);
  
      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }
  
      return () => media.removeListener(updateTarget);
    }, []);
  
    return targetReached;
  };
  
  const message = 'hello'
  const isBreakpoint = useMediaQuery(1200)
  const isMobileBreakpoint = useMediaQuery(1024)

  return (
    <BreakPointContext.Provider value={{ useMediaQuery, isBreakpoint, isMobileBreakpoint }}>
      {props.children}
    </BreakPointContext.Provider>
  );
}
  export default BreakPointContext