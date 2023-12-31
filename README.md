<h1 align="center">Welcome to SEA Cinema - Movie Ticket Booking Web Application 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

![SEA Cinema Logo](./public/logo.png)

<p>The logo was generated by free AI</p>

SEA Cinema is a cutting-edge web application designed to revolutionize the way moviegoers book cinema tickets online. Developed as part of the Software Engineering Academy at the 2023 compfest event, this platform offers a seamless and convenient experience for users to explore movies, access detailed movie information, make secure transactions, manage orders efficiently, update profiles, add balances, withdraw funds, and even share balances with friends. With its user-friendly interface and comprehensive feature set, SEA Cinema aims to redefine the ticket booking experience for movie enthusiasts.

# Tools Used
- NextJS 13 App Router(Frontend & Backend)
- TailwindCSS
- Typescript
- Nextauth
- MongoDB for database (hosted in MongoDB Atlas)
- etc

# Key Features
## Frontend Description

### 1. Movies Page 

The Movies page showcases a wide selection of movies currently showing. Users can browse through the list, view movie posters, and read brief descriptions to get an overview of each film. Clicking on a movie will redirect users to the Movie Details page for more information.

### 2. Movie Details

The Movie Details page provides comprehensive information about a specific movie, including the title, age ratings, synopsis, price, and release date. Users can also view the available showtimes and choose their preferred date, time, location, and seats for booking.

### 3. Transactions 

The Transactions page in SEA Cinema serves as a comprehensive record of all financial activities related to the user's account. It captures and displays a detailed history of transactions, including top-ups, balance sharing, and withdrawals. This feature provides users with a transparent overview of their financial interactions within the platform.

### 4. Bookings 

The Bookings page allows users to keep track of their upcoming movie bookings. It provides a detailed overview of each booking, including the movie title, date, time, cinema location, and seat numbers. Users can modify or cancel their bookings based on their preferences.

### 5. Profile Management 

The Profile page enables users to personalize their SEA Cinema experience. They can update their perion personal information, such as name, username, age.

### 6. Top-Up Balance

To facilitate seamless transactions, SEA Cinema offers a Top-Up Balance feature. Users can add funds to their account balance through various payment methods, ensuring they have sufficient funds for hassle-free ticket purchases.

### 7. Withdrawal

The Withdrawal feature allows users to transfer their available account balance back to their bank accounts. This option provides flexibility for users to manage their finances and use the funds as needed.

### 8. Share Balance

Sharing the SEA Cinema experience with friends is made easy through the Share Balance feature. Users can transfer a portion of their account balance to their friends' accounts, allowing them to enjoy movies together without the hassle of separate transactions.

## Backend Description

### 1.User Authentication and Authorization:
  Processes user authentication, token verification. Implements features like login validation, password reset, and session management using NextAuth.js with JWT tokens handles secure user authentication and authorization

### 2. Routing:
Handles API endpoint configuration for various features like movie browsing, ticket purchasing, user profile management, and financial transactions such as top-up, share balance, and withdrawal.

### 3. Data Storage and Database:
Manages data storage and integration with application utilizes the Prisma ORM and MongoDB as database. Performs CRUD operations on data, including fetching movie information, storing transaction details, and managing user profiles.

### 4. Error Handling: 
Manages error handling and provides appropriate error responses with clear error messages. Logs and tracks errors for troubleshooting purposes.

### 5. Data Validation: 
Validates user-submitted data to ensure its compliance with expected formats and rules. Checks data existence, data types, data length, and other validation criteria to ensure correct and secure data input.

# Installation and Usage

To use the SEA Cinema web application, follow these steps:

1. Clone the repository: `git clone https://github.com/fairuzald/SEA-Cinema.git`
2. Install the necessary dependencies:

```bash
npm install
# or
yarn install
```

3. Start the application run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Access the application through your web browser at `http://localhost:3000`
   You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


Please ensure you have Node.js and npm installed on your system before proceeding with the installation.

# Run App & Deploment on Vercel
To use Just Do List, go to
[https://sea-cinema.fairuzald.com/](https://sea-cinema.fairuzald.com/).

# Figma Design
https://www.figma.com/file/SCBEjBCM9Tb6cexzFKXFub/SEA-CINEMA?type=design&node-id=0%3A1&mode=design&t=xvEFG2BpPAx8MFIC-1

# Environment Variables
https://gist.github.com/fairuzald/1d1d9cea22fd867673f2716a66e46e38

# Feedback and Contributions

We welcome feedback and contributions from the community to make SEA Cinema even better. If you encounter any issues or have suggestions for improvement, please open an issue on our GitHub repository. Feel free to fork the project and submit pull requests with new features or bug fixes as well.

# License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Thank you for choosing SEA Cinema! We hope you enjoy the seamless movie ticket booking experience we have created for you. Happy movie watching!

# Author

👤 **Moh Fairuz Alauddin Yahya**

- Website: fairuzald.com
- Github: [@fairuzald](https://github.com/fairuzald)
- LinkedIn: [@in.com\/in\/moh-fairuz-alauddin-yahya-b793b5232\/](https://linkedin.com/in/in.com/in/moh-fairuz-alauddin-yahya-b793b5232/)

# Show your support

Give a ⭐️ if this project helped you!
