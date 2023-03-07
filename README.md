# Library Management App

A Library managment system built with ExpressJS, Bootstrap 5, and MongoDB.
Currently, there is no login needed to test out the features of the website.

![HTML]
![CSS]
![JavaScript]
[![Mongo][mongodb]][mongodb-url]
[![Express][express]][express-url]
[![Bootstrap][bootstrap]][bootstrap-url]

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

&nbsp;
&nbsp;

## Installation

&nbsp;
&nbsp;

Clone the repo:

```sh
git clone https://github.com/mdn/express-locallibrary-tutorial.git
cd express-locallibrary-tutorial
```

&nbsp;
&nbsp;

Install dependencies.
You'll need node version 16 or higher.

```sh
npm install
```

Run the develpment server

```sh
npm run dev
```

&nbsp;
&nbsp;

### Web Cont: Prepare MongoDB Connection File

Create a file in the root directory called .env and add the following:

```node
MONGO_URI
# Optional, default is 3000
PORT = YOUR_PORT_CHOICE;
```

Replace MONGO_URI with your MongoDB connection string.
Local or Atlas connections both work.
Replace YOUR_PORT_CHOICE with whatever port you want to use.
You can actually just remove this line and the default port of 3000 will be used.

If you're using Mongo Atlas, you should add 0.0.0.0/0 to the allowed IP list until development is done. REMEMBER TO CHANGE THIS TO YOUR SERVER IP UPON DEPLOYMENT.

[html]: https://img.shields.io/badge/HTML-20232A?style=for-the-badge&logo=html5&logoColor=#E34F26
[css]: https://img.shields.io/badge/CSS-20232A?style=for-the-badge&logo=css3&logoColor=#1572B6
[javascript]: https://img.shields.io/badge/Javascript-20232A?style=for-the-badge&logo=javascript&logoColor=#F7DF1E
[mongodb]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb&logoColor=#47A248
[mongodb-url]: https://mongodb.com/
[express]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=#000000
[express-url]: https://expressjs.com/
[bootstrap]: https://img.shields.io/badge/Bootstrap-20232A?style=for-the-badge&logo=bootstrap&logoColor=#34E27A
[bootstrap-url]: https://www.getbootstrap.com/
