# README

## eslint & eslint-hooks

```bash
npm run postinstall
```
## Track Crash

### Firebase

### Android
**1.On the Firebase console, add a new Android application and enter your projects details.**

**2.Download the google-services.json file**

**3.and place it inside of your project at the following location: /android/app/google-services.json.**

### iOS
**1.On the Firebase console, add a new iOS application and enter your projects details.**

**2.Download the GoogleService-Info.plist file.**

**3.and place it inside of your project at the following location: ios/GoogleService-Info.plist.**

[https://rnfirebase.io/](https://rnfirebase.io/)

[https://rnfirebase.io/crashlytics/usage](https://rnfirebase.io/crashlytics/usage)

## Q&A

### 1.Permission denied @rb_sysopen $/Users/xx/.fastlane/spaceship/xx/cookie

```bash
#please delete any existing fastlane cookies. The authentication endpoint has changed recently 
rm $HOME/.fastlane/spaceship/*/cookie
```