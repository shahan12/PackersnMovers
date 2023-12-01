module.exports = {
    apps: [
        {
            name: 'nodejs-load-balancing',
            script: 'Index.js',
            instances: 8,
            exec_mode: 'cluster',
            watch: true,
            increment_var: 'PORT',
            env: {
                PORT: 5032,
                NODE_ENV: 'production',
            },
        },
    ],
};