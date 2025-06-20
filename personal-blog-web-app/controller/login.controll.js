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
    console.log(typeof filePath);

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
            titleArr.push(articleData[articleLen - (i+1)].Title)
            dateArr.push(articleData[articleLen - (i+1)].date)
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
                    { title: titleArr[0] , Date: dateArr[0] , status: titleArr[0] ? "published" : null},
                    { title: titleArr[1] , Date: dateArr[1] , status: titleArr[1] ? "published" : null},
                    { title: titleArr[2] , Date: dateArr[2] , status: titleArr[2] ? "published" : null},
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
const myPosts = (req , res) => {
    const {userName} = req.user ;
    if(!fs.existsSync(blogSFolder)){
        return res
        .render('myposts' ,{
            posts: [
                {
                Title: 'No posts found',
                date: 'N/A',
                data: 'No posts available for this user.'
            }
         ]
        })
    }
    const filePath = path.join(blogSFolder, `${userName}_blogs.json`);
    const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8' , (err) => {
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
        posts: posts 
    })
}

module.exports = {
    loginUser,
    addPost,
    dashBoard ,
    myPosts
}