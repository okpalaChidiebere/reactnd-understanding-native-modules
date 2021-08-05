# Understanding Native Modules

Sometimes a React Native app needs to access a native platform API, or some features, for example the native APIs to access Apple or Google Pay, access certain apps(Calendar, whatsapp) ContentProvider, or even putting a users phone on silent, etc that is not available by default in JavaScript or Expo SDK. Maybe you want to reuse some existing Objective-C, Swift, Java or C++ libraries without having to reimplement it in JavaScript, or write some high performance, multi-threaded code for things like image processing. Here are list of [Google Play APIs](https://developers.google.com/android/guides/setup) that you can use if they dont exist in JS already. They already have a Java and Objective-c code sample for you

# MLKit Text recognition
- This was the one we implemented. We added Native Side code for [Android](https://developers.google.com/ml-kit/vision/text-recognition/android) and [iOS](https://developers.google.com/ml-kit/vision/text-recognition/ios#swift)
- All the steps to create a React Native modules are outlined here for [Android](https://reactnative.dev/docs/native-modules-android) and [iOS](https://reactnative.dev/docs/native-modules-ios). We basically followed the doc. Follow them step by step and you should be good to go!

# Few Takaways
- For iOS and Android, it is important to have separate directory for each module code you add. it helps in scaling your app and better documentation
- For iOS, it is similar to C++ where you create your headerFile(.h) than the implementation(objectiveCFIle.m) file afterwords
- For iOS, it is also recommended to start your file names the some prefix because of the shared namespace for your app. We use `RCT<whateverModuleName>`
- It important you open your Android side code with AndroidStudio and iOS side code with Xcode.
- When coding be sure to use `control(^) return` on Xcode and AndroidStudio to see sugestions how how to fix Erros and quick overrides and imports
- For iOS, If the project uses CocoaPods of which [`npx create-react-native-app`](https://s-pace.github.io/react-native/docs/getting-started.html) does, be aware to always open the .xcworkspace file instead of the .xcodeproj file. This opens your project in full with all the third-party library and configurations needed
- Things to have in mind hile buiding the native Module to use in JS, Callbacks, Promises, Arguments, etc
- Feel free to debug your Native code with the appropriate simulators
- Sometimes [permissions] are needed. Eg
```xml
<key>NSCalendarsUsageDescription</key>
      <string>$(PRODUCT_NAME) calendar events</string>
    <key>NSRemindersUsageDescription</key>
      <string>$(PRODUCT_NAME) reminder use</string>
    <key>NSCameraUsageDescription</key>
      <string>This app requires to access your photo library to show image on profile and send via chat</string>
    <key>NSMicrophoneUsageDescription</key>
      <string>This app requires to access your microphone to record video with your voice send via chat</string>
    <key>NSPhotoLibraryUsageDescription</key>
      <string>This app requires to access your photo library to show image on profile and send via chat</string>
    <key>NSContactsUsageDescription</key>
       <string>$(PRODUCT_NAME) contact use</string>
    <key>NSLocationAlwaysUsageDescription</key>
      <string>$(PRODUCT_NAME) location use</string>
    <key>NSLocationWhenInUseUsageDescription</key>
      <string>$(PRODUCT_NAME) location use</string>
```
- Feel free to google stuff you dont know in those languages! StackOverflow :)
- [https://www.youtube.com/watch?v=-cB1nXlN2PU&list=PL97fL9DAn9QzKd4-exwa-vd1rNDov8wXZ](https://www.youtube.com/watch?v=-cB1nXlN2PU&list=PL97fL9DAn9QzKd4-exwa-vd1rNDov8wXZ)