module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "node_modules/expo-font/.+\\.(j|t)sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-native)/"
  ]
};