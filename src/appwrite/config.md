# Config

<a href = "https://appwrite.io/docs/references/cloud/client-web/databases">Link for appwrite Docs on Databases</a>

- We do the exact same things in config.js. The only difference being the methods being different.

- We will be transferring the bucket methods to a different file later later.

- Some key points to know here which might be different than what we did in auth are :
    
- In this we are take slug differently as we are going to use that as our unique ID for the document (blog)

    ```js
    async updatePost(slug, {title, content, featuredImage, status}){}
    ```
- We are passing only slug in deletePost and getPost as we will only need to post Id which is the slug.

- Later we are using Queries which can also be Appwrite docs. In that we are supposed to be passing query in an array like this

    ```js
    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status", "active")]
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }
    ```
    
    - But what we are doing is defining that in the parameter and preassigning the value to it so that will never go blank. And what this method does is it gets us all the queries then filters out only the active one.

- Lastly we are returning false in all console.logs so that we can handle the error later in the frontend. 




