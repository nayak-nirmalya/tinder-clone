module.exports = function(api) {
  api.cache(true);
  return {
      presets: ['babel-preset-expo'],
      plugins: ["nativewind/babel"],
      "plugins": [
        ["module:react-native-dotenv",
        {
          "moduleName": "@env",
          "path": ".env",
          "whitelist": [
            "GOOGLE_OAUTH_CLIENT_ID",
            "EXPO_CLIENT_ID",
            "EXPO_SECRET"
          ],
          "safe": false,
          "allowUndefined": true
        }
      ]
    ]
  };
};
