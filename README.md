```sh
yarn install
yarn build

# with pm2
yarn pm2 start .pm2/env.config.js
yarn pm2 log 0
yarn pm2 kill
```