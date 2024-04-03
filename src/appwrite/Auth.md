# APPWRITE

### Vendor Locking

This means to make sure your app can run on any other platform for backend like firebase instead of appwrite(which we are using). As we can never say when a given app will shutdown forever. So we make an adjustment called Services (it is a class) so that we can run our app on any platform required.

<hr>

### This is the basic boilerplate code for Appwrite.

```js
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');               // Your project ID

const account = new Account(client);

const promise = account.create('[USER_ID]', 'email@example.com', '');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
```
<hr>

### Explaining Auth.js

<u><b>Important thing to know here would be that what we have made is not the actual boilerplate used by appWrite, but we have changed it on our own so that we can use this same code with some minor changes in any other backend services.</b></u>

- First we create the file named auth.js or we can even use service.js.

- We import all our env variables as we will need them here while connnecting to appwrite. Also we import the neccessary things we need while creating client & account.
    ```js
    import config from '../conf/config.js'
    import {Client, Account, ID} from 'appwrite'
    ```

- First we create a class named AuthService, we can name anything obviously as we have created this, not by an default Appwrite syntax.

- As we know in order for us to be able to use the methods in it we will need to make a new isntance of this class. However rather than having to create a new instance every now and then we will just create a new object here and export it.

    ```js
    const authService = new AuthService()
    export default authService
    ```
- We create a new client and an account in the class. we do that by using new Client()

- We have declared a property named account but we didn't give it it's value as new Account() should be called once the client has it's setEndPoint & setProject.

- However we should only give the endPoint to the client when the object is being called. As it would be wastage of resource if we just give it to the client rigth away.

- That's why we are creating a Constructor which will only run when the object is called.

- Then we are chaining the methods into the client which can also be read as 
    ```js
    this.client.setEndpoint(config.appwriteUrl);
    this.client.setProject(config.appwriteProjectId);
    this.account = new Account(this.client); 
    ```

- Now we have atlast declared a new Account as the client has got thier endPoints.

- Now all we have to do is delcare methods for createAccount, login, logout, getCurrentUser, etc.

- We could have simply created an account using this below statement. But we are creating a method of our own so that we have diversity in database. Vendor Locking.
    ```js
    const promise = account.create('[USER_ID]', 'email@example.com', '');
    ```
- Now we are using async function for creating account as we don't want to move ahead untill the account is created.

- Also we are passing values as object and then destructuring them here cause the other person might not know in what orders are we accepting the parameters, nor do we know about appwrite.

- Now the account creation might fail at times. Even if it doesn't we never know how it would act at times. So for being fail proof we are using try catch here.

- Then we are creating a new account using account.create. Now as we can see in Appwrite they are accepting mandatory parameters like UserID, email, password that too in the same order.

    ```js
    // As we don't have a User ID to provider right now we can do is use the ID method given by appwrite itself which we have imported as well.
    const userAccount = await this.account.create(ID.unique(), email, password, name);
    ```

- And then we are calling our later created method in this for logging in the user if the account has been successfully created.

- Now it's all just async functions along with try and catch for login, logout, getCurrentUser (check if the user is already logged in).

- Some key points to be noted here would be these
    
    - We can throw better errors by using this syntax as will know where exactly is the error 

        ```js
        console.log("Appwrite service :: logout :: error", error);
        ```
    
    - Also here we have returned userAccount in else statement we will handle it later in the part. As at times we might or can get null values.
        ```js
         if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
                return userAccount;
            }
        ```
    
    - getCurrentUser is the method for checking if you are logged in or not. Like if someone lands directly on the homepage we don't want to diplay him anything before checking if he is logged in or not.

    - Also we are just returning the this.account.get() in getCurrentUser but not checking the values as we will do actions based on that in frontend.

<br>
<hr>

## <u><b>This is the best boilerplate code for any backend app you are intregrating to as all you need to do is change some basic functionality and rest it will work like a charm. You can save this as a snippet and copy paste it whenever required.</b></u>