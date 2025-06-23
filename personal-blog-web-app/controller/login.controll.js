const ApiError = require('../utils/apierror.js')
const ApiResponse = require('../utils/apiresponse.js')
const asyncHandler = require('../utils/asynchandler.js')
const UserObj = require('../utils/userclass.js')
const fs = require('fs')
const createToken = require('../utils/jwtGen.js')
const jwt = require('jsonwebtoken')
const { userInfo, type } = require('os')
const path = require('path')
const Article = require('../utils/articleClass.js')
const { title } = require('process')
const { threadId } = require('worker_threads')


// creates post 
// make files for each user posts with their username for simplicity 

const blogSFolder = path.join(__dirname, 'blogs');

const addPost = asyncHandler(async (req, res) => {
    const { userName, role } = req.user;
    const { blogTitle, blogData } = req.body;
    try {
        let ArticleData = null; // declaring the article object 
        if (!fs.existsSync(blogSFolder)) {
            fs.mkdirSync(blogSFolder, { recursive: true }, (err) => {
                if (err) throw err;
            })
        }
        // date in the form of YYYY-MM-DD HH:MM:SS 
        const blogsPath = path.join(blogSFolder, `${userName}_blogs.json`)
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`
        if (!fs.existsSync(blogsPath)) {


            ArticleData = new Article(blogTitle, blogData, formattedDate, formattedTime)
            fs.writeFileSync(blogsPath, JSON.stringify([ArticleData], null, 2), 'utf-8')
            const formatedBlogData = blogData.slice(0, 10);
            console.log(formatedBlogData);

            return res
                .redirect('http://localhost:6800/api/v1/blog/login');
        } else {
            const articles = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'))
            ArticleData = new Article(blogTitle, blogData, formattedDate, formattedTime);
            articles.push(ArticleData);
            fs.writeFileSync(blogsPath, JSON.stringify(articles, null, 2), 'utf-8')
            return res
                .redirect('http://localhost:6800/api/v1/blog/login');

        }

    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiError(500, "Something went wrong")
            )
    }
});

// dashboard page redirect
const dashBoard = async (req, res) => {
    const { userName } = req.user;
    const filePath = path.join(blogSFolder, `${userName}_blogs.json`)

    if (!fs.existsSync(filePath)) {
        return res
            .render('blogDashboard', {
                title: 'dashBoard',
                userName: userName, // use the value you just set 
                blog: [
                    { title: 'nil', Date: 'nil', status: null },
                    { title: 'nil', Date: 'nil', status: null },
                    { title: 'nil', Date: 'nil', status: null },
                ],
                posts: 0,
            })
    }
    const articleData = await JSON.parse(fs.readFileSync(filePath, 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    }))

    const articleLen = articleData.length;

    const titleArr = [];
    const dateArr = [];

    for (let i = 0; i < 3; i++) {
        if (articleData && articleData[i] && articleData[i].Title) {
            titleArr.push(articleData[articleLen - (i + 1)].Title)
            dateArr.push(articleData[articleLen - (i + 1)].date)
        } else {
            titleArr.push(null);
            dateArr.push(null);
        }
    }

    return res
        .render('blogDashboard',
            {
                title: 'dashBoard',
                userName: userName, // use the value you just set
                blog: [
                    { title: titleArr[0], Date: dateArr[0], status: titleArr[0] ? "published" : null },
                    { title: titleArr[1], Date: dateArr[1], status: titleArr[1] ? "published" : null },
                    { title: titleArr[2], Date: dateArr[2], status: titleArr[2] ? "published" : null },
                ],
                posts: articleLen,
            })
}

// user log ini with username and password 
const loginUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;

    if ([userName, password].some(field => field.trim() === "")) {
        return res.render('errorpage', {
            title: 'loginFailed',
            statusCode: 404,
            error: null,
            data: "⚠️ you didn't fill the login form properly click the link provided to go the login page ⚠️"
        });
    }

    try {
        let user = null;

        if (!fs.existsSync('users.json')) {
            // turnery method 
            user = (userName === "Deba_13" && password === "Deba#13_07")
                ? new UserObj(userName, password, 'admin')
                : new UserObj(userName, password);

            fs.writeFileSync('users.json', JSON.stringify([user], null, 2), { encoding: 'utf8' });
            const userToken = createToken(user);
            if (userToken == null) {
                return res
                    .status(404)
                    .json(
                        new ApiError(404, "Cant't create the usertoken cause username was missing")
                    )
            }
            // setting up cookies 
            res.cookie(
                'auth_token',
                userToken,
                {
                    httpOnly: true,
                    secure: false,
                    maxAge: 60 * 60 * 1000 * 2
                }

            )

            return res.render('blogDashboard', {
                title: 'dashBoard',
                userName: user.userName, // use the value you just set
                blog: [
                    { title: 'nil', Date: 'nil' },
                    { title: 'nil', Date: 'nil' },
                    { title: 'nil', Date: 'nil' },
                ],
                posts: null,
            });
        }

        const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

        for (let existingUser of users) {
            if (existingUser.userName === userName && existingUser.password === password) {
                const userToken = createToken(user);
                if (userToken == null) {
                    return res
                        .status(404)
                        .json(
                            new ApiError(404, "Cant't create the usertoken cause username was missing")
                        )
                }
                // setting up cookies 
                res.cookie(
                    'auth_token',
                    userToken,
                    {
                        httpOnly: true,
                        secure: false,
                        maxAge: 60 * 60 * 1000 * 2
                    }

                )
                return res
                    .redirect('http://localhost:6800/api/v1/blog/login');
            }
        }

        // If user not found, add new
        user = (userName === "Deba_13" && password === "Deba#13_07")
            ? new UserObj(userName, password, 'admin')
            : new UserObj(userName, password);

        users.push(user);
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
        const userToken = createToken(user);
        if (userToken == null) {
            return res
                .status(404)
                .json(
                    new ApiError(404, "Cant't create the usertoken cause username was missing")
                )
        }
        // setting up cookies 
        res.cookie(
            'auth_token',
            userToken,
            {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60 * 1000 * 2
            }

        )
        return res
            .redirect('http://localhost:6800/api/v1/blog/login');

    } catch (error) {
        return res.render('errorpage', {
            title: "Serverissue",
            statusCode: 500,
            error: error,
            data: "Something went wrong! Server crashed click the link provided to go the login page "
        });
    }
});

// my posts 
const myPosts = (req, res) => {
    const { userName } = req.user;
    const filePath = path.join(blogSFolder, `${userName}_blogs.json`);
    if (!fs.existsSync(blogSFolder) || !fs.existsSync(filePath)) {
        return res
            .render('myposts', {

                posts: [
                    {
                        id: 'N/A',
                        Title: 'No posts found',
                        date: 'N/A',
                        data: 'No posts available for this user.'
                    }
                ]
            })
    }

    const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8', (err) => {
        if (err) {
            return res
                .status(500)
                .json(
                    new ApiError(500, "Something went wrong while reading the posts")
                )
        }
    }))
    return res
        .render('myposts', {
            posts: posts || [
                { title: null, Date: null, status: null },
                { title: null, Date: null, status: null },
                { title: null, Date: null, status: null },
            ]
        })
}

// delete post by role based checking 
const delPost = asyncHandler(async (req, res) => {
    const { userName} = req.user;
    const { id } = req.params;
    
        const filePath = path.join(blogSFolder, `${userName}_blogs.json`)
        
        if (!fs.existsSync(filePath)) {
            return res
                .status(401)
                .json(
                    new ApiError(401, "You are not authorized to delete this post or the post does not exist on your account")
                )
        }
        
        const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8', (err) => {
            throw new ApiError(500, "Something went wrong while reading the posts")
        }))
        
        for (let postMatched of posts) {
            
            if(postMatched.id === Number(id)){
            indexOfPost = posts.indexOf(postMatched);
            posts.splice(indexOfPost, 1);
            fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');
            
            return res
            .redirect('http://localhost:6800/api/v1/blog/login');
            }
        }
})
const gotoUpdatePage = asyncHandler(async (req , res) => {
    const { userName } = req.user ;
    const { id } = req.params ;
    try {
        const filePath = path.join(blogSFolder, `${userName}_blogs.json`) ;
        
        if(!fs.existsSync(filePath)){
            return res
                .status(404)
                .json(
                    new ApiError(404, "You are not authorized to update this post or the post does not exist on your account")
                )
        }
        console.log("file exists");
        
        const posts = JSON.parse(fs.readFileSync(filePath , 'utf-8', (e) => {
            if(e){
                return res
                    .status(500)
                    .json(
                        new ApiError(500, "Something went wrong while reading the posts")
                    )
            }
        }))
    
        
    
        for(let postMatched of posts){
            if(postMatched.id === Number(id)){
                console.log("post matched" , postMatched.Title);
                
                return res
                    .render('blogUpdate' , {
                        blog: {
                            id: postMatched.id,
                            userName: userName,
                            title: postMatched.Title ,
                            data: postMatched.data
                        }
                    })
            }
        }
    } catch (error) {
        console.error("Error occurred while navigating to update page:", error);
        return res
            .status(500)
            .json(
                new ApiError(500, "Something went wrong while navigating to the update page")
            )
    }
})

// update function 
const updatePost = asyncHandler(async (req , res) => {
    const { userName } = req.user ;
    const { id } = req.params ;
    const { Blogtitle , BlogData } = req.body ;
    const filePath = path.join(blogSFolder , `${userName}_blogs.json`) ;

    if(!fs.existsSync(filePath)){
        return res
            .status(404)
            .json(
                new ApiError(404, "You are not authorized to update this post or the post does not exist on your account")
            )
    }

    const posts = JSON.parse(fs.readFileSync(filePath , 'utf-8' , (e) => {
        if(e) {
            console.log("Error reading posts:", e);
            return res
                .status(500)
                .json(
                    new ApiError(500, "Something went wrong while reading the posts")
                )
        }
    }))
    for(let postMatched of posts) {
        if(postMatched.id === Number(id)){
            console.log(req.body.BlogData);
            
            const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`
            postMatched.Title = Blogtitle ;
            postMatched.data = req.body.BlogData ; 
            postMatched.data = formattedDate ;
            postMatched.time = formattedTime ;
            postMatched.status = 'updated' ;
            console.log("Post updated successfully:", postMatched);
        }
    }

    fs.writeFileSync(filePath , JSON.stringify(posts , null , 2) , 'utf-8' , (e) => {
        if(e){
            console.log("Error writing updated posts:", e);
            return res
                .status(500)
                .json(
                    new ApiError(500, "Something went wrong while updating the post")
                )
        }
    })
    return res
        .redirect('http://localhost:6800/api/v1/blog/login');

})
module.exports = {
    loginUser,
    addPost,
    dashBoard,
    myPosts, 
    delPost, 
    gotoUpdatePage ,
    updatePost 
}