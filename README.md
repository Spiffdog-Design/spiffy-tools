# @spiffdog/spiffy-tools

A TypeScript/JavaScript utility library with tree-shakeable modules for arrays, dates, numbers, objects, process helpers, strings, and tree structures.

## Installation

```bash
npm install @spiffdog/spiffy-tools
```

## Usage

Import the full library or only the modules you need (recommended for smaller bundles):

```ts
// Full library
import { flattenArray, addDays, debounce, isNullOrEmpty, build, parseNumber } from '@spiffdog/spiffy-tools';

// Or by subpath (tree-shakeable)
import { flattenArray, hasEntries, sort, sorter } from '@spiffdog/spiffy-tools/array';
import { addDays, format, getMonthList, timeAgo } from '@spiffdog/spiffy-tools/date';
import { parseNumber } from '@spiffdog/spiffy-tools/number';
import { deepFreeze } from '@spiffdog/spiffy-tools/object';
import { debounce } from '@spiffdog/spiffy-tools/process';
import { contains, isNullOrEmpty, padStart, padEnd } from '@spiffdog/spiffy-tools/string';
import { build, find, findAncestors, has, findByPath, type TreeNode } from '@spiffdog/spiffy-tools/tree';
```

## API Overview

### Array (`/array`)

- **flattenArray** – Flatten nested arrays and deduplicate
- **flattenKeys** – Recursively collect all keys from an object
- **flattenValues** – Recursively collect all values from an object
- **hasEntries** – Whether a value is a non-empty array
- **sort** – Return a new array of objects sorted by key (does not mutate)
- **sorter** – Comparator for sorting objects by a property (numeric or string)

### Date (`/date`)

- **addDays** / **subtractDays** – Add or subtract days from a date
- **format** – Format a date with `Intl` (locale and options)
- **parse** – Parse a date string from a format (e.g. `YYYY/MM/DD`, `DD-MM-YYYY`)
- **getDateMidnight**, **getTodayMidnight**, **getTomorrowMidnight** – Dates at midnight
- **getMonthList** – Localized month names (long, short, narrow, etc.)
- **getLocale** – Browser locale (uses `navigator`; browser-only)
- **timeAgo** – Human-readable “time ago” string
- **buildDateFromValues** – Build a `Date` from `{ YYYY, MM, DD, HH, mm, ss }`
- **isDate** – Type guard for `Date`
- **daysToMs**, **hoursToMs**, **minutesToMs**, **secondsToMs** – Time → milliseconds
- **msToDays**, **msToHours**, **msToMinutes**, **msToSeconds** – Milliseconds → time
- **dateFormat**, **dateTimeFormat**, **dateFormatOption**, **dateTimeFormatOption** – Format constants and `Intl` options

### Number (`/number`)

- **parseNumber** – Parse en-US formatted number strings (e.g. `"1,234.56"`) to a number or `null`

### Object (`/object`)

- **deepFreeze** – Recursively freeze an object and its nested objects

### Process (`/process`)

- **debounce** – Debounce a function; returns a debounced function with a **cancel** method

### String (`/string`)

- **contains** – Whether a string contains a substring
- **padStart** / **padEnd** – Pad string to a target length
- **isNullOrEmpty** / **isNotNullOrEmpty** – Null/empty checks (trimmed)

### Tree (`/tree`)

- **TreeNode\<T, C\>** – Type for a tree node with children under key `C` (default `'children'`)
- **build** – Convert a flat list (with `id` / `parentId`) into a tree
- **find** – Find a node by field value
- **findAncestors** – Get path from root to a node
- **has** – Whether a node with the given field value exists
- **findByPath** – Find a node by dotted path (e.g. `'root.child.grandchild'`)

Custom keys are supported via options (`key`, `parentKey`, `childrenKey`, `separator` for paths).

## Development

### Scripts

| Command        | Description                                      |
|----------------|--------------------------------------------------|
| `npm run build`| Compile TypeScript and build ESM + CJS to `dist` |
| `npm run test` | Run tests (Vitest)                               |
| `npm run test:watch` | Run tests in watch mode                    |
| `npm run lint` | Lint with Biome                                  |
| `npm run lint:fix` | Lint and apply safe fixes                    |
| `npm run format`| Format code with Biome                           |
| `npm run check`| Lint, format, and organize imports (Biome)      |
| `npm run check:fix` | Run check and apply all fixes                |

### Requirements

- **Node.js 18+** — Required for `npm run test` (Vitest uses modern syntax). If tests fail with `Unexpected token '??='`, upgrade Node: [nodejs.org](https://nodejs.org/) or use `nvm install 18`.
- TypeScript 5.x

Linting and formatting use [Biome](https://biomejs.dev/). The project is type-checked with `strict` and emits ESM and CJS with declaration files.

## License

MIT
