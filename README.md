# Spawn Point
Spawn Point is a social hub tailored for gamers, offering a platform to showcase your gaming profile, highlights, and connect with like-minded players. Whether you're a casual gamer or a hardcore enthusiast, Spawn Point provides the community and tools you need to celebrate your gaming moments.

## Disclaimer
This project was part of a school assignment and is currently **unfinished** and **no longer being developed**. The only fully functional features at this time are signup, login, and logout. Other features mentioned below were planned but not completed.

## What is Spawn Point?
Spawn Point allows users to:
- Create a personalized profile with gaming interests and favorite titles.
- Share game highlights, screenshots, and in-game achievements.
- Find and connect with fellow gamers based on shared interests or games.
- PixelPals transcends platforms, allowing users to connect regardless of whether they play on PC, console, mobile, or handheld devices.

## Key Features
User Profiles: Showcase your favorite games, achievements, and highlights.
Community Interaction: Follow other gamers, like posts, and share experiences.
Game Highlights: Post screenshots and moments from your favorite games.
Cross-Platform Integration: Accessible for users across various gaming platforms.
Note: Only signup, login, and logout functionality is operational in the current build.

## Technology Stack
Spawn Point is built using modern web development technologies:

Node.js: Backend JavaScript runtime environment.
Express.js: Web framework for building the API.
MySQL2 & Sequelize ORM: For database management and querying.
Handlebars.js: Templating engine for server-side rendering.
Tailwind CSS: Utility-first CSS framework for styling.
Firebase: For initial deployment and user authentication.
Heroku: Hosting and deployment.

## APIs 
RAWG.io: API for accessing game data, metadata, and game libraries.

## Installation and Setup
- Clone the repository:
`git clone <repository-url>`
- Navigate to the project directory:
`cd spawn-point`
- Install the dependencies:
`npm install`
- Set up your environment variables in the .env file.
- Run database migrations:
`npm run migrate`
Start the application:
`npm start`
Access the application on your local server at http://localhost:3000.

## License
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) <br/>
This project is licensed under the MIT license. For more details, see [this link](https://opensource.org/licenses/MIT).
