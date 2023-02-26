# master_app

## Setting up local env with 1Password

1. `eval $(op signin)`
2. `just add_github`
3. `just update_config`

### Prereqs without the dev container

1. homebrew
2. npm
3. 1Password cli
4. `just install`

## Updating devcontainer

1. `just docker-build`
