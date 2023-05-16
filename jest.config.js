// module.exports = {
//   preset: "react-native",
//   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
//   globals: {
//     __DEV__: true
//   },
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
//     "node_modules/expo-font/.+\\.(j|t)sx?$": "babel-jest"
//   },
//   transformIgnorePatterns: [
//     "node_modules/(?!react-native)/",
//     "expo-splash-screen"
//   ],
//   moduleFileExtensions: [
//     "js",
//     "mjs",
//     "cjs",
//     "jsx",
//     "ts",
//     "tsx",
//     "json",
//     "node"
//   ],
//   testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
//   testMatch: [
//     '**/__tests__/**/*.[jt]s?(x)',
//     '**/?(*.)+(spec|test).[jt]s?(x)'
//   ],
//   setupFiles: ['<rootDir>/jest.setup.js'],
//   moduleNameMapper: { "expo-location": "react-native/Libraries/EventEmitter/NativeEventEmitter"},
//   verbose: true,
 
// };