# https://just.systems/man/en/chapter_36.html
set dotenv-load

list:
    just --list


install:
    npm install -g @ionic/cli @angular/cli
    brew install supabase/tap/supabase
    brew update
    brew install supabase poetry python@3.9

@init_shell:
    if ! grep -q 'Homebrew' ~/.zshrc; then \
        echo '\n# Set PATH, MANPATH, etc., for Homebrew.' >> ~/.zshrc; \
        echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.zshrc; \
        echo '\n# NVM \nexport NVM_DIR="$HOME/.nvm"' >> ~/.zshrc; \
        echo '[ -s "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh" ] && \. "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh"  # This laods nvm' >> ~/.zshrc; \
        echo '\n# Starship \neval "$(starship init zsh)"' >> ~/.zshrc; \
    fi

init_devcontainer:
    sudo chown -R $(whoami) /home/vscode/.nvm 
    sudo chown -R $(whoami) /home/linuxbrew/.linuxbrew
    mkdir -p /home/vscode/.cache
    sudo chown -R $(whoami) /home/vscode/.cache
    just init_shell

update:
    sudo apt update && sudo apt -y full-upgrade
    brew update && brew upgrade

### Docker Operations

docker-build:
    # https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages
    docker build . -f ./.devcontainer/Dockerfile -t devcontainer-core --squash --compress
    @op run --no-masking --env-file="./.env" -- printenv GITHUB_TOKEN | docker login ghcr.io -u gethub --password-stdin
    docker image tag devcontainer-core ghcr.io/getglad/devcontainer-core:latest
    docker push ghcr.io/getglad/devcontainer-core:latest

###
# OP
# eval $(op signin)
###

op_signin:
    eval $(op signin)

add_cred $title $username $credential:
    op item create --vault devTool --category apicredential --title $title username=$username credential=$credential

add_github:
    op run --no-masking --env-file="./.env" -- printenv DEPLOY_KEY | cat > ~/.ssh/id_rsa
    chmod 600  ~/.ssh/id_rsa
    eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_rsa

###
# supabase
#
###

update_config:
    op inject -i ./supabase/config.toml.tpl -o ./supabase/config.toml

refresh_supabase: update_config
    supabase stop
    supabase start

###
# web app
###

update_web_app:
    op inject -i ./app/tpl/environment.ts.tpl -o ./app/src/environments/environment.ts

serve: update_config
    cd app && npm run start

###
# mobile
###

mo-init:
    cd ./app && ionic cap add android

mo-build:
    cd ./app && ionic cap sync
