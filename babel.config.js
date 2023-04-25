module.exports = function(api) {
  api.cache(true);
  return {
      presets: ['babel-preset-expo'],
      "plugins": [
        "nativewind/babel",
        ["module:react-native-dotenv",
        {
          "moduleName": "@env",
          "path": ".env",
          "whitelist": [
            "ANDROID_OAUTH_CLIENT_ID_FIREBASE",
            "IOS_OAUTH_CLIENT_ID_FIREBASE",
            "GOOGLE_OAUTH_CLIENT_ID",
            "EXPO_CLIENT_ID",
            "EXPO_SECRET",
            "APIKEY",
            "AUTHDOMAIN",
            "PROJECTID",
            "STORAGEBUCKET",
            "MESSAGINGSENDERID",
            "APPID",
            "WEB_CLIENT_ID"
          ],
          "safe": false,
          "allowUndefined": true
        }
      ]
    ]
  };
};
