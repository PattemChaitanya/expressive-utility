# @chaitanya/react-utils

[![npm version](https://img.shields.io/npm/v/@chaitanya/react-utils.svg)](https://www.npmjs.com/package/@chaitanya/react-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A collection of production-ready React hooks for building modern web applications.

## Features

- 🎯 **Type Safety**: Written in TypeScript with comprehensive type definitions
- 🔥 **Tree Shakeable**: Import only what you need
- 📦 **Zero Dependencies**: Minimal footprint
- ✅ **Well Tested**: Comprehensive test coverage
- 📚 **Well Documented**: Clear and concise documentation

## Installation

```bash
npm install @chaitanya/react-utils
# or
yarn add @chaitanya/react-utils
# or
pnpm add @chaitanya/react-utils
```

## Available Hooks

### Network & Data Fetching
- `useNetwork` - Track online/offline status
- `useFetch` - Simplified data fetching
- `useMutation` - Handle data mutations

### UI & Interactions
- `useClickOutside` - Detect clicks outside an element
- `useFocusTrap` - Trap focus within a modal/dialog
- `useHover` - Track element hover state
- `useKeyPress` - Handle keyboard interactions
- `useMediaQuery` - Responsive design hooks
- `useResizeObserver` - Track element size changes
- `useWindowSize` - Track window dimensions

### Forms & Input
- `useDebounce` - Debounce input values
- `useThrottle` - Throttle function calls
- `useQueryParam` - Handle URL query parameters

### Storage & State
- `useStorage` - Local/Session storage abstraction
- `useSyncedStorage` - Synced storage across tabs
- `usePrevious` - Track previous values
- `useToggle` - Toggle boolean states

### Animation & Effects
- `useAnimationDelay` - Control animation timing
- `useIntersectionObserver` - Track element visibility

### Browser APIs
- `useFullScreen` - Handle fullscreen mode
- `useScript` - Load external scripts
- `useTitle` - Update document title

## Usage Examples

### useNetwork
```tsx
import { useNetwork } from '@chaitanya/react-utils';

function App() {
  const isOnline = useNetwork();
  
  return (
    <div>
      Network status: {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
```

### useClickOutside
```tsx
import { useClickOutside } from '@chaitanya/react-utils';

function Modal() {
  const modalRef = useRef(null);
  
  useClickOutside(modalRef, () => {
    console.log('Clicked outside modal!');
  });

  return (
    <div ref={modalRef}>
      Modal Content
    </div>
  );
}
```

### useStorage
```tsx
import { useStorage } from '@chaitanya/react-utils';

function ThemeToggle() {
  const [theme, setTheme] = useStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

## TypeScript Support

All hooks are written in TypeScript and include comprehensive type definitions:

```tsx
import { useFetch } from '@chaitanya/react-utils';

interface User {
  id: number;
  name: string;
}

function UserProfile() {
  const { data, loading, error } = useFetch<User>('/api/user');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>Welcome, {data?.name}!</div>;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Star this repo
- Create issues for bugs and feature requests
- Follow for future updates 