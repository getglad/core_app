# master_app

## Quick Start

1. Open using the `devcontainer` with VS Code
2. `cd app && npm install`
3. `supabase start`
4. `just serve`
5. Visit `localhost:4200`

### Note: At the moment this flow requires:

1. the 1Password CLI
2. a [set of values](https://github.com/getglad/core_app/blob/main/supabase/config.toml.tpl#L74-L77) configured in a vault.
3. An env var of `APP_ENV` that maps to the 1Password Vault

## Distributing

### Mobile

0. `just mo-init` on first run
1. `just mo-build`
2. Open [the Ionic build](./app/android/) in Android Studio
3. Update version in [build.gradle](./app/android/app/build.gradle)
   1. https://developer.android.com/studio/publish/versioning
4. `Generate Signed APK`
   1. The `jks` is saved at `op://core_app_android_jks`
   2. https://support.1password.com/files/#work-with-files-on-1passwordcom
5. Release
   1. Go to [Google Play Store Developer Console](https://play.google.com/apps/publish)
      1. Currently setup for personal email
   2. Select "Internal Testing"
   3. Select "Create new release"

#### Vendor Docs

- https://ionicframework.com/docs/deployment/play-store
- https://developer.android.com/studio/publish/app-signing

## Contributing

### Environmental Variables

Many of the commands assume a `.env` file. This file is generated using `update_env`, which updates `.env.tpl`. The best practice for this repo is to update the value of `.env.tpl` on a per project basis.

### Setting up dev container for Github SSH Access with 1Password

1. `eval $(op signin)`
2. `just add_github`

### Running locally

1. `just serve`

### Prereqs without the dev container

1. homebrew
2. npm
3. just
4. 1Password cli
5. `just install`

### Updating devcontainer

1. `just docker-build`

## Testing

### Mobile

#### Debugging

1. Setup Developer Mode on an Android Device
2. Use the "Pair Devices Using Wifi" option in Android Studio
   1. https://developer.android.com/tools/adb#connect-to-a-device-over-wi-fi
3. `chrome://inspect/#devices` should bring up the console

#### Mobile Deep Linking

1. Set "Redirect URLs" in supabase
   1. https://app.supabase.com/project/ssaoxpnmbdcjdpvrtdsq/auth/url-configuration
2. Configure [AndroidManifest.xml](./app/android/app/src/main/AndroidManifest.xml)
   1. https://ionicframework.com/docs/native/app#android
3. Configure Supabase to return to the app
   1. https://supabase.com/docs/guides/auth#mobile-deep-linking-uris
