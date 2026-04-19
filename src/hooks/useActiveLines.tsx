import { useCallback, useState } from 'react';
import { lines, type LineType } from '../data';

export const useActiveLines = () => {
  const [activeLines, setActiveLines] = useState<LineType[][]>([]);

  const addNextLine = useCallback((count: number) => {
    setActiveLines((prevState) =>
      prevState.length >= count ? prevState : lines.slice(0, count)
    );
  }, []);

  return { activeLines, addNextLine };
};
