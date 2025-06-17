const { title } = require('process')
const ApiError = require('../utils/apierror.js')
const ApiResponse = require('../utils/apiresponse.js')
const asyncHandler = require('../utils/asynchandler.js')
const UserObj = require('../utils/userclass.js')
const fs = require('fs')


const addPost = () => {

}

const loginUser = asyncHandler(async (req , res) => {
    const { userName, password } = req.body;

    if ([userName, password].some(field => field.trim() === "")) {
        return res.render('errorpage', {
            title: 'loginFailed',
            statusCode: 404,
            error: null,
            data: "⚠️ you didn't fill the login form properly ⚠️"
        });
    }

    try {
        let user = null;

        if (!fs.existsSync('users.json')) {
            // turnery method 
            user = (userName === "Deba_13" && password === "Deba#13_07")
                ? [new UserObj(userName, password, 'admin')]
                : [new UserObj(userName, password)];

            fs.writeFileSync('users.json', JSON.stringify(user, null, 2), { encoding: 'utf8' });

            return res.render('blogDashboard', {
                title: 'dashBoard',
                userName: userName , 
                blog: [
                    {
                        title: 'nil' ,
                        Date: 'nil' 
                    } , 
                    {
                        title: 'nil' ,
                        Date: 'nil' 
                    },
                    {
                        title: 'nil' ,
                        Date: 'nil' 
                    },
                ] ,
                status: 'nil' ,
                posts: null ,
            });
        }

        const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

        for (let existingUser of users) {
            if (existingUser.userName === userName && existingUser.password === password) {
                return res.render('blogDashboard', {
                    title: 'dashBoard',
                    userName: userName
                });
            }
        }

        // If user not found, add new
        user = (userName === "Deba_13" && password === "Deba#13_07")
            ? new UserObj(userName, password, 'admin')
            : new UserObj(userName, password);

        users.push(user);
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

        return res.render('blogDashboard', {
            title: 'dashBoard',
            userName: userName
        });

    } catch (error) {
        return res.render('errorpage', {
            title: "Serverissue",
            statusCode: 500,
            error: error,
            data: "Something went wrong! Server crashed"
        });
    }
});


module.exports = {
    loginUser ,
    addPost
}