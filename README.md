
# Superhero Hunter JS

## Problem Statement

Create a superhero hunter app using vanilla JavaScript. The app should allow users to search for superheroes, view detailed information about them, and add them to their favorites list. The app should be built using only JavaScript, without the use of any libraries or frameworks for JavaScript. However, CSS frameworks like Bootstrap can be used for styling.

## Features

### Home page

- Fetch and display a list of superheroes (characters) on the home page.
- Implement a search bar that filters the characters based on the search query.
- Clicking on the favorite button for a superhero adds them to the \"My favorite superheroes\" list.
- Clicking on a search result opens a new page with more information about that superhero.

### Superhero Page

- Display detailed information about the superhero, including their name, photo, bio, and other information provided by the API (comics, events, series, stories, etc).

### My Favorite Superheroes Page

- Display a list of all the favorite superheroes.
- Ensure that the list of favorite superheroes is persistent, even after closing the browser.
- Each superhero in the list should have a \"Remove from favorites\" button, which removes them from the list when clicked.

## API

Use the following API to fetch superhero data:

API Endpoint: `https://gateway.marvel.com:443/v1/public/characters?ts=<time-stamp>&apikey=<public-key>&hash=<md5(ts+privateKey+publicKey)>`

## Instructions

- Use vanilla JavaScript to build the app.
- Do not use any libraries or frameworks for JavaScript.
- You can use CSS frameworks like Bootstrap for styling.
- Implement the features mentioned above.
- Ensure that the list of favorite superheroes is persistent.
- Implement the remove from favorites functionality.
- Test the app thoroughly to ensure all features are working correctly.

Good luck with your superhero hunter app!

## Demo
A live demo of Super Hero Hunter app can be found [here](https://dheerajap1999.github.io/SuperHeroHunter/)
