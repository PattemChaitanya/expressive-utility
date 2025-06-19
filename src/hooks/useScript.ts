import { useEffect, useState } from 'react';

type ScriptState = 'idle' | 'loading' | 'loaded' | 'error';

export function useScript(url: string): ScriptState {
  const [state, setState] = useState<ScriptState>('idle');

  useEffect(() => {
    if (!url) {
      setState('idle');
      return;
    }
    if (state !== 'idle') return;

    setState('loading');

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${url}"]`,
    );

    if (!script) {
      script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.head.appendChild(script);
    } else {
      setState((script.getAttribute('data-status') as ScriptState) || 'ready');
    }

    const setFromEvent = (event: Event) => {
      const newStatus = event.type === 'load' ? 'ready' : 'error';
      script!.setAttribute('data-status', newStatus);
      setState(newStatus as ScriptState);
    };

    script.addEventListener('load', setFromEvent);
    script.addEventListener('error', setFromEvent);

    return () => {
      script?.removeEventListener('load', setFromEvent);
      script?.removeEventListener('error', setFromEvent);
    };
  }, [url]);

  return state;
}
