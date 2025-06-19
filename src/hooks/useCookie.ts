import { useEffect, useState } from 'react';

type CookieOptions = {
  path?: string;
  domain?: string;
  expires?: Date;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  days?: number;
};

export function useCookie(
  name: string,
  value: string,
  options?: CookieOptions,
): [string, (value: string, options?: CookieOptions) => void, () => void] {
  const getCookie = (name: string): string => {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)'),
    );
    return match ? decodeURIComponent(match[2]) : value;
  };

  const [cookie, setCookieState] = useState(() => getCookie(name));

  const setCookie = (
    value: string,
    opts: { days?: number; path?: string } = {},
  ) => {
    const days = opts.days ?? options?.days ?? 7;
    const path = opts.path ?? options?.path ?? '/';

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${path}`;
    setCookieState(value);
  };

  const deleteCookie = () => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${options?.path ?? '/'};`;
    setCookieState('');
  };

  useEffect(() => {
    setCookieState(getCookie(name));
  }, [name]);

  return [cookie, setCookie, deleteCookie];
}
