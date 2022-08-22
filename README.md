# image-upload-API
This is a simple JSON-based image upload API that you can use to jumpstart an image-upload-based project! In a nutshell, this API allows you to communicate with a Supabase database and storage bucket to upload images, retrieve paginated results of images, and toggle whether an image is favourited or not. The API also includes an authentication system that may be configured to suit your needs. Feel free to set it up if you'd like to!  

## Getting started
1. Download all the dependencies by running the following in your working directory: `npm i`
2. Setup a [Supabase](https://supabase.com) database and public bucket to be used with the project.
3. Create a .env file with your database and storage credentials obtained from supabase.  
4. Start a local server in development mode by running the following: `npm run start:dev`
5. Use [Postman](https://www.postman.com) to test the API by sending requests to the server.
6. Deploy using your favourite hosting platform—I suggest using [Heroku](https://www.heroku.com).
7. Done! Connect up a frontend (using React/Angular/Vue etc.) and you're good to go!

## Built With:
* Typescript
* Node.js
* Express
* Prisma
* Supabase

Tested with Postman

## Author

Chetan Nair - chetan.r.nair@gmail.com

## License

This project is licensed under the MIT License - see the LICENSE.md file for details





