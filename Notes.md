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
   };

   export default conf;
   ```

8. Vendor Locking :- This means to make sure your app can run on any other platform for backend like firebase instead of appwrite(which we are using). As we can never say when a given app will shutdown forever. So we make an adjustment called Services (it is a class) so that we can run our app on any platform required.

9. Now we create a Auth file, which can also be called as service file. It contains all the appwrite contents for creating a user, login, logout, getCurrentUser, etc. Notes for the same can be found in the appwrite folder in src.

10. Once the auth file is done we need some more methods which will be for databases which helps us with createPost, deletePost, getPost, etc. Also we are creating bucket in that file itslef, though a good practice is to create it in a different file.

11. After that we work on our redeux where we create a login and logout reducers, along with the shop.

12. Now we are working on our basic setup of App.jsx which has a small functionality to check if everything is working.

      ```js
        function App() {
      
            const [loading, setLoading] = useState(true)
            const dispatch = useDispatch()

            useEffect(()=>{
            authService.getCurrentUser()
            .then((userData) => {
                if (userData){
                    dispatch(login({userData}))
                }else{
                // console.log(userData); null
                    dispatch(logout())
                }
            })
            .finally(()=> setLoading(false))
            },[])

            return !loading ? (
                <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>Hello Blog
                    <div className='w-full block'>
                        <Header/>
                            <main>
                                TODO: {/_ <Outlet/> _/}
                            </main>
                        <Footer/>
                    </div>
                </div>
            ) : null
        }
     ```
     
     - This throws error as there is no user and the error is setup by us itslef, so you can ignore that.

     - One thing to notice here would be that we are doing conditional return for the app to render which will help us often.

- Now we are working on components. And rather than creating just a basic login form we will create the input box as a component and pass some props which will help us later when we have to reuse that.

-  Make sure you refer to the components folder to get an idea of how things are being displayed and used as an compeonent for later use.

    ```js
    const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = '',
    ...props
    }, ref){
    const id = useId()

    return (
        <div className='w-full'>
            {/* This will only be displayed if the label is given */}
            {label && <label className='' htmlFor={id}>{label}</label>}
            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            id={id}
            ref={ref}
            {...props}
            />
        </div>
    )
    })
    ```

    - In this we can see a couple things which might come handy to us.
    
    - This is a custom InputBox for out page which we are making as an component.

    - We have destructured the props and if you see we have values like label, type, className, ...props & lastly ref.

    - First let's see how we are doing contiditonal rendering on the label. So if someone has passed the value for the label then only we will be rendering that else we will skip the label.

    - Seconly we have given some pre-default values so that if we forget to give value to that it should still work.

    - Thirdly we have given some classNames inside backticks in a curly brackets so that we can add the passed class name as well.

    - The props we have used as a rest operator is for passing down the other required attributes like disabled, placeholder, etc.

    - The ForwardRef hook let us use this components value later somewhere in the file. As we are taking the input box as a components we will need to acces it's onChange prperty somewhere. And in each case we will need a different ref so we are using this hook for the same.

    - <b> Make sure to check rest of the components for more knowledge.</b>

- In Header we have used a useNavigate method given by React Router.

    ```js
    const navigate = useNavigate()

    const navItems = [
    {
        name: 'Home',
        slug: "/",
        active: true
    }, 
    {
        name: "Login",
        slug: "/login",
        active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
    ]

    <ul className='flex ml-auto'>
        {navItems.map((item)=> (
            item.active ? (
            <li key={item.name}>
                <button
                onClick={()=>navigate(item.slug)}
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
            </li>
            ) : null
        ))}
        {/* This below statement checks if authStatement is true then the code we write inside the parenthesis will be displayed else it won't be */}
        {authStatus && (
            <li><LogoutBtn/></li>
        )}
    </ul>
    ```

    - So here we are using the navigate to navigate through the items. This useNavigate accepts an array of all the navs.

    - The slug here is also a vairable name so we can keep whatever we like. This slug is the link to which it should take the user to.

    - We have used to same array to display the navbar using map function.

    - Later in the button which is the individual nav item like home, All post, add post, login, logout, signup. So in these button we have used to slug to pass it as a value in navigate. As navigate when called needs a '/link' to tell it where to navigate.

    - We have used the same array to display all of those nav items by using items.name in map.

    - And if you see we have given an active status to the navItems array, that's cause we don't want to display login and signUp to a already logged in user.

    - Lastly we are doing conditional rendering for the LogoutBtn.

    - Though later in the code we learn a easier way for ForwardRef which can be seen in the Select.jsx component

        ```js
        // This can be done while exporting which will work the same.
        export default React.forwardRef(Select)
        ```