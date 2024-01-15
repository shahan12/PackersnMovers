module.exports = {
    apps: [
      {
        name: "FRONTEND",
        script: "npm",
        args: "start",
        exec_mode: "fork",
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          // Add your other environment variables here
        },
      },
    ],
  };