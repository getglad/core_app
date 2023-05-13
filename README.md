# master_app

## Quick Start

1. Open using the `devcontainer` with VS Code
2. `cd app && npm install`
3. `supabase start`
4. `just serve`
5. Visit `localhost:4200`

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

### Setting up local env with 1Password

1. `eval $(op signin)`
2. `just add_github`
3. `just update_config`

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
