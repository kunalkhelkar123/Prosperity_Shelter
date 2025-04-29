module.exports = {
    apps: [
      {
        name: 'Prosperity_Shelter', // Change to your preferred name
        script: './index.js', // Replace with your entry point file
        // args: 'start', // Optional: any CLI arguments
        log_file: 'logs/my_node_app.log', // Combined log file (stdout + stderr)
        out_file: 'logs/my_node_app_out.log', // Only stdout
        error_file: 'logs/my_node_app_error.log', // Only stderr
        log_date_format: 'DD-MM-YYYY HH:mm:ss',
        watch: false, // You can enable this for development
        env: {
          NODE_ENV: 'production',
          PORT: 8080, // Or whatever port your app runs on
        },
        exp_backoff_restart_delay: 2000 // Delay for restarts in case of crash
      }
    ]
  }
  