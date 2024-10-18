module.exports = {
  presets: ['module:@react-native/babel-preset'],
  
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env', // The path to your .env file
        safe: false,  // Whether to throw if .env is missing
        allowUndefined: true, // Allow undefined variables
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
