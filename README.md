# Minecraft RCON WooCommerce Webhook
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


This project sets up a webhook to communicate with a Minecraft server via RCON (Remote Console) using a Node.js application. The application listens for webhook events from WooCommerce and sends corresponding commands to the Minecraft server to manage in-game actions such as adding coins or unbanning players.

## Features

- Receives webhook events from WooCommerce.
- Executes Minecraft RCON commands based on the webhook data.
- Runs inside a Docker container for easy deployment.

## Prerequisites

- Node.js
- Docker
- WooCommerce setup with webhook support
- Minecraft server with RCON enabled

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SvobodaGaming/minecraft-rcon-woocommerce-webhook.git
   cd minecraft-rcon-woocommerce-webhook
   ```

## Usage

### Running the application

**Locally:**
```sh
npm run start
```

### Docker

1. **From DockerHub:**
    **Run the Docker container:**
    ```sh
   docker run -d --name=minecraft-rcon-woocommerce-webhook \
        -p 3000:3000 \
        --network=host \
        -e WEB_PORT=3000 \
        -e MC_PORTS=25575,25576 \
        -e MC_HOST=localhost \
        -e MC_PASSWORDS=your_rcon_password1,your_rcon_password2 \
        -e MC_COINS_ADD="coins add" \
        -e MC_UNBAN=unban \
        --restart unless-stopped \
        svobodayt/minecraft-rcon-woocommerce-webhook
   ```

2. **From local copy:**
   **Build the Docker image:**
   ```sh
   docker build -t minecraft-rcon-webhook .
   ```
   **Run the Docker container:**
    ```sh
   docker run -d -p 3000:3000 --env-file .env --name minecraft-rcon-webhook minecraft-rcon-webhook
   ```

## Webhook Endpoint

- **URL:** `/webhook`
- **Method:** `POST`
- **Headers:** 
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "nickname": "player_name",
    "item_names": "item_name"
  }
  ```

## Project Structure

- **main.js:** Entry point of the application, sets up the Express server and handles webhook requests.
- **executor.js:** Contains the logic to execute RCON commands on the Minecraft server.
- **config.js:** Configuration for mapping values and RCON options.

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Create a new Pull Request.

## License

This project is licensed under the Apache-2.0 License [LICENSE](LICENSE).