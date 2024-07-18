module.exports = {
    apps: [
        {
            name: 'vite-app',
            script: 'npm',
            args: 'run preview',
            watch: '.',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};