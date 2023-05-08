module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  globals: {
    __DEV__: true
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "node_modules/expo-font/.+\\.(j|t)sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-native)/"
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^@react-native-community/(.*)$': '@react-native-community/$1',
    '^@expo/(.*)$': '<rootDir>/node_modules/expo/build/$1',
    '^expo$': '<rootDir>/node_modules/expo/build/Expo.fx.js',
    '^(.*)\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js',
    '^./Libraries/Utilities/Platform$': '<rootDir>/node_modules/react-native/Libraries/Utilities/Platform.android.js',
    '^./Libraries/Utilities/Platform\\.android$': '<rootDir>/node_modules/react-native/Libraries/Utilities/Platform.android.js',
    '^./Libraries/Utilities/Platform\\.ios$': '<rootDir>/node_modules/react-native/Libraries/Utilities/Platform.ios.js',
    '^@react-navigation/native-stack$': '<rootDir>/node_modules/@react-navigation/native/lib/module/index.js',
  },
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ]
};