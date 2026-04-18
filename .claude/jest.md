```markdown
# Jest Skill - Latest Version ^30.3.0 (2026)

**Framework**: Jest  
**Versi Terbaru**: 30.3.0  
**Tujuan**: Unit Testing, Integration Testing, Snapshot Testing (JavaScript & TypeScript)

## 1. Installation

```bash
npm install --save-dev jest
# atau
yarn add --dev jest
```

Tambahkan script di `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## 2. Basic Example (CommonJS)

**sum.js**
```js
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```

**sum.test.js**
```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

## 3. Configuration (jest.config.js)

```js
/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',           // atau 'jsdom' untuk frontend
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js', '**/*.spec.js'],
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {},                      // kosong untuk pure JS/CJS
  clearMocks: true,
  resetMocks: false,
  restoreMocks: true,
};

module.exports = config;
```

**Menggunakan defineConfig (baru di v30)**

```js
const { defineConfig } = require('jest');

module.exports = defineConfig({
  verbose: true,
  // ...
});
```

## 4. Struktur Test yang Direkomendasikan

- `describe` → grouping
- `test` / `it` → individual test
- `beforeEach`, `afterEach`, `beforeAll`, `afterAll`

Contoh:

```js
const { add, fetchUser } = require('./utils');

describe('Utils Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('add function', () => {
    test('should add two numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(-1, 1)).toBe(0);
    });
  });

  test('fetchUser should return user data', async () => {
    const user = await fetchUser(1);
    expect(user).toHaveProperty('id');
    expect(user.name).toBeDefined();
  });
});
```

## 5. Matchers Paling Sering Dipakai (v30)

### Primitive & Equality
- `toBe(value)` — strict equality (`Object.is`)
- `toEqual(value)` — deep equality
- `toStrictEqual(value)` — strict deep equality
- `toBeNull()`, `toBeUndefined()`, `toBeDefined()`
- `toBeTruthy()`, `toBeFalsy()`

### Numbers & Strings
- `toBeGreaterThan()`, `toBeLessThan()`, `toBeCloseTo()`
- `toMatch(regex atau string)`

### Arrays & Objects
- `toHaveLength(number)`
- `toContain(item)`
- `toHaveProperty(keyPath, value?)`
- `toMatchObject(object)`

### Functions & Mocks
- `toHaveBeenCalled()`
- `toHaveBeenCalledTimes(n)`
- `toHaveBeenCalledWith(arg1, arg2, ...)`
- `toHaveBeenLastCalledWith(...)`
- `toHaveReturned()`, `toHaveReturnedWith(value)`

### Async
- `toResolve()`
- `toReject()`

## 6. Mocking

```js
// Mock module
jest.mock('./api');

const api = require('./api');

// Mock function
const mockFn = jest.fn();
const mockFn2 = jest.fn().mockReturnValue(42);
const mockFn3 = jest.fn().mockResolvedValue({ id: 1 });

// Spy
const spy = jest.spyOn(console, 'log');
```

**New in Jest 30**: `using` keyword support untuk auto-cleanup spies.

## 7. Important Globals

- `test` / `it`
- `describe`
- `expect`
- `beforeEach`, `afterEach`, `beforeAll`, `afterAll`
- `jest` (object untuk mocking & timers)

## 8. Command Line Useful

```bash
jest --watch
jest --coverage
jest --onlyFailures
jest path/to/test.js
jest -t "nama test"
jest --updateSnapshot
```

## 9. Breaking Changes dari v29 → v30 (Penting!)

- Minimum Node.js **18.x**
- Beberapa matcher alias dihapus (`toBeTruthy` tetap ada, tapi beberapa asymmetric matcher berubah)
- `jest-environment-jsdom` pakai JSDOM v26
- Beberapa CLI flag berubah (`--testPathPattern` → `--testPathPatterns`)
- Matcher `objectContaining` dengan array lebih strict

## 10. Best Practices 2026

1. Gunakan `defineConfig` untuk type safety.
2. Selalu pakai `clearMocks: true` di config.
3. Prefer `toStrictEqual` untuk object/array.
4. Gunakan `test.each` untuk table-driven tests.
5. Gunakan `jest.spyOn` daripada `jest.fn()` bila memungkinkan.
6. Pisahkan config besar ke `jest.config.js`.

---

**Referensi Resmi**:
- https://jestjs.io/docs
- https://jestjs.io/docs/upgrading-to-jest30
- https://jestjs.io/docs/expect