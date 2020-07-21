# README

## eslint & eslint-hooks

```bash
npm run postinstall
```

## Q&A

### 1.Permission denied @rb_sysopen $/Users/xx/.fastlane/spaceship/xx/cookie

```bash
#please delete any existing fastlane cookies. The authentication endpoint has changed recently 
rm $HOME/.fastlane/spaceship/*/cookie
```