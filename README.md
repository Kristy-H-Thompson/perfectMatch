# Perfect Match
![License](https://img.shields.io/badge/License-MIT-yellow.svg "License")

## Description
This is a candidate search application designed to help you explore GitHub profiles and identify top talent for potential hiring. It allows you to filter and search through a wide range of developer profiles. You can easily save profiles of candidates that interest you, so you can revisit and evaluate them later as part of your hiring process.

## Features
- Save candidate
- Reject candidate
- Filter candidates

## Technologies
- React
- Typescript
- Vite
- Github API


## Link to deployed website
coming soon

## Table of Contents (Optional)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [UserStories](#userStories)


## Installation
No extra installations are needed to use this web application. Simply access it via your web browser.
If you would like to edit the code, you can fork this repo. You must downloaded all the project dependencies including node.js, typescript, and vite. You will also have to get access to your own Github API key to set up an .env file.


## Usage
To get started with Perfect Match simply open the web application and search a city by name 


## Credits
### Contributors
- [Kristy Thompson](https://github.com/Kristy-H-Thompson)

### Reasources used
- Typescript: [LINK](https://www.typescriptlang.org/download/)
- Profesional readMe Guide: [Link](https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide)
- Vite documentation: [Link](https://vite.dev/)
- Genereate github api key: [Link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)
- Github documentation on rest API: [Link](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28#authenticating-with-a-personal-access-token)
- Deploying to render: [Link](https://coding-boot-camp.github.io/full-stack/render/render-deployment-guide)

## License
MIT License

## User Stories
- AS AN employer
- I WANT a candidate search application
- SO THAT I can hire the best candidates

## Acceptance Criteria
GIVEN a candidate search application
- WHEN the candidate search page loads, THEN the information for one candidate should be displayed, including the candidate's name, username, location, avatar, email, html_url, and company
- WHEN I click the "+" button, THEN the candidate should be saved to the list of potential candidates and the next candidate's information should be displayed
-WHEN I click the "-" button, THEN the next candidate's information should be displayed without saving the current candidate
- WHEN there are no candidates available to review, THEN an appropriate message should be shown indicating no more candidates are available
- WHEN the potential candidates page loads, THEN the user should see a list of previously saved potential candidates with their name, username, location, avatar, email, html_url, and company
- WHEN the page reloads, THEN the list of potential candidates should persist and be available for viewing
- WHEN there are no potential candidates, THEN an appropriate message should be displayed indicating no candidates have been accepted
- WHEN I click the "-" button, THEN the next candidate's information should be displayed without saving the current candidate