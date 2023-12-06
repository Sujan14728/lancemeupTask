
# MovieSansar

This is a simple movie website built using Next.js. The project showcases basic features of a movie website, including listing movies, displaying details, providing a checkout flow and generating invoice in pdf.


## Features

- Listing Movies, TV Series & Music Video
- Checkout flow for purchasing movie tickets.
- Responsive design for both mobile and desktop.



## Tech Stack

**Client:** React, Next JS, TailwindCSS

**Library:** Axios, MUI


## Demo

Link: https://moviesansar.vercel.app/                                         


## Installation

To get started with MovieSansar, follow these installation steps:

1. Clone the repository to your local machine:
```bash
  git clone https://github.com/Sujan14728/lancemeupTask.git
```
2. Install the necessary dependencies for the project:
```bash
  cd lancemeupTask
  npm install
```
3. Create .env.local file in the main directory of the app and generate token from here: https://rapidapi.com/SAdrian/api/moviesdatabase
Inside the .env.local file write the following code:
```bash    
NEXT_PUBLIC_XRapidAPIKey=your_api_key
```
For quick test, you can use this api key:
```bash    
NEXT_PUBLIC_XRapidAPIKey='bdb8f91cacmshb4adc5706985803p18211bjsnb2a5c6e46cb6'
```


4. Start the app:
```bash
  npm run dev
```

5.Access the application through your web browser.
    
## Challenges & How I tackled it.

1. Responsive Design:
- Challenge: Ensuring a consistent and appealing user experience across various devices was challenging. Different screen sizes required careful handling of layouts and styles.
- Solution: I utilized the responsive design features of Tailwind CSS to adjust the layout based on screen size.  Additionally, testing on multiple devices helped identify and address specific issues.

2. External API Integration:
- Challenge: Integrating data from an external API posed challenges, including handling asynchronous requests 
- Solution: I utilized the feature of NEXT JS i.e. getServerSideProps and used axios library to fetch the data from external api. The getServerSideProps ensured a faster api response which helped in higher performance.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License

