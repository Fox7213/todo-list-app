import { useEffect, RefObject } from 'react';

/**
 * Хук, который срабатывает при клике вне элемента, на который указывает ref
 * @param ref - Ссылка на элемент, за пределами отслеживать клики
 * @param callback - Функция,вызвана при клике за пределами элемента
 * @param dependencies - Необязательный массив зависимостей, обработчик кликов при изменении
 */
function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  dependencies: any[] = []
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Установка обработчик событий
    document.addEventListener('mousedown', handleClickOutside);
    
    // Откл обработчик событий
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, ...dependencies]);
}

export default useOutsideClick; 