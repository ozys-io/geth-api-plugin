module.exports = {
  apps: [
    {
      name: 'geth-api-plugin',
      script: 'dist/main.js', // Nest.js 애플리케이션의 메인 파일 경로
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 8080,
        NODE_ENV: 'production',
        RPC_PORT: 8545,
        RPC_HOST: "localhost",
      },
    },
  ],
};
