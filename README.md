# Node.js Blog Site

## Description

A simple blog site built with Node.js, Express, and MongoDB. Users can create, edit, and delete blog posts with a user-friendly interface. The site includes authentication and basic styling using HTML and CSS.

## Features

- User authentication (Signup/Login)
- Create, edit, and delete blog posts
- Responsive design with HTML & CSS
- MongoDB database for storing blog posts
- Express.js for server-side logic

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/node-blog.git
   cd node-blog
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   ```

4. Start the application:

   ```sh
   npm start
   ```

   The app will be running on `http://localhost:3000`

## File Structure

```
node-blog/
│-- public/
│   │-- css/
│   │   ├── styles.css
│-- views/
│   ├── index.ejs
│   ├── post.ejs
│   ├── edit.ejs
│-- routes/
│   ├── index.js
│   ├── auth.js
│-- models/
│   ├── Post.js
│   ├── User.js
│-- server.js
│-- package.json
│-- .env
│-- README.md
```
