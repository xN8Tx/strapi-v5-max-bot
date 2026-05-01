<h1 align="center">✨ Strapi  Max Bot ✨</h1>
<p align="center">Send messages to your telegram Max bot from strapi</p>

## 🚀 Installation

Install the plugin using your favorite package manager:

```sh
npm install strapi-v5-max-bot
```

or

```sh
yarn add strapi-v5-max-bot
```

## ⚡ Features

- Send messages to your max bot from admin panel and code
- Manage users and bot token in admin panel

## 🌟 Usage

### 1. Configure Bot Token

To get started, you first need to add your **Max bot token**, you can read more about that [here](https://dev.max.ru/docs/chatbots/bots-create).

Save the token in the **single-type collection** named `Token for max` in the admin panel.

### 2. Add User IDs

Next, add the **chat IDs** of the recipients you want the bot to message. You can took his from your bot with command `/start`.

Create entries in the **collection type** called `Users for max`.
If you're unsure how to find your user ID, [this guide might help](https://www.google.com/search?q=how+to+find+your+user+id+in+telegram).

### 3. Test the Plugin

You can test the plugin by sending a message directly from the plugin interface — click the **paper plane icon** in the sidebar.

### 4. Sending Messages Programmatically

If you need to send a message from your code, use the following pattern:

```js
const sender = strapi.plugin("strapi-v5-max-bot").service("sender");
const res = await sender.sendMessage("Hello world! It`s my message");
```

> ⚠️ **Important:**
> Do **not** destructure `sender`.
> Its methods rely on internal context to access the token and user list.
> If destructured, they will lose access to that context and stop working correctly.
