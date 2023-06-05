# How to generate SSH keys for public repo

Run command `ssh-keygen -t ed25519 -C dzmitry.klokau@gmail.com`, use file name `id-github-flash-cards` and passphrase leave empty. Then run `open .` and save 2 file inside `deploy-keys` project folder.

Add **public** to the dest repo: settings -> secrets and variables -> actions -> new repository secret -> paste + name: `SSH_DEPLOY_KEY`.

Add **private** key to the source repo: settings -> deploy-keys -> paste + enable “Allow write access”
