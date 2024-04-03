# How to start a project in sequence

1. Know what you are going to make.

2. Fully understand what you need for it, like learn about the different webpages that already exists on that.

3. Start your project by creating vite react app.

4. Install all the neccessary dependency you might need, rest you can add on the go so that won't be a issue.

    - These are some important ones you might just need always. Redux & React Router.
    ```
    npm i @reduxjs/toolkit react-redux react-router-dom
    ```

5. Initialize a .env file to save all your data and make sure to put that in git ignore. However you can create another file called .env.sample and in this you can keep the same data as your .env file but make sure not to put in the values for them. So that you get a better readability. Also make sure to ship this to git and not put this sample file in gitignore.

6. Then you can start working on your backend for a while where you will be creating all the required Database, Storage for your app. 

7. While you are creating each database and buckets make sure to copy those ID and paste it in your .env file. Once you are done with all the ID's required for the .env file create a folder called config or conf in your src folder and in that create a file called config.js or conf.js. in that import all the variables as an object like done here below. This will help you to keep the errors away as at times env throws errors. We are converting it to string so that the env won't see it as a number when you have only numbers in your ID, which is rare but we can't avoid it in a production grade application. Also don't forget to export this file.

    ```js
    const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    }

    export default conf
    ```

8. 