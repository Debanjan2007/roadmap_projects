const ApiError = require('../utils/apierror.js')
const ApiResponse = require('../utils/apiresponse.js')
const asyncHandler = require('../utils/asynchandler.js')
const UserObj = require('../utils/userclass.js')
const fs = require('fs')
const createToken = require('../utils/jwtGen.js')
const jwt = require('jsonwebtoken')
const { userInfo } = require('os')
// creates post 
// make files for each user posts with their username for simplicity 
const addPost = asyncHandler(async (req, res) => {
    const {userName , role} = req.user ;
    console.log(userName);
    return res
    .status(200)
    .json(
        new ApiResponse(200 , userName , "successfull")
    )
    const {blogTitle , blogData} = req.body ;
    
});

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
                status: 'nil',
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
                return res.render('blogDashboard', {
                    title: 'dashBoard',
                    userName: userName,
                    blog: [
                        {
                            title: 'nil',
                            Date: 'nil'
                        },
                        {
                            title: 'nil',
                            Date: 'nil'
                        },
                        {
                            title: 'nil',
                            Date: 'nil'
                        },
                    ],
                    status: 'nil',
                    posts: null,
                });
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
        return res.render('blogDashboard', {
            title: 'dashBoard',
            userName: userName,
            blog: [
                {
                    title: 'nil',
                    Date: 'nil'
                },
                {
                    title: 'nil',
                    Date: 'nil'
                },
                {
                    title: 'nil',
                    Date: 'nil'
                },
            ],
            status: 'nil',
            posts: null,
        });

    } catch (error) {
        return res.render('errorpage', {
            title: "Serverissue",
            statusCode: 500,
            error: error,
            data: "Something went wrong! Server crashed click the link provided to go the login page "
        });
    }
});


module.exports = {
    loginUser,
    addPost
}