const User=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');

module.exports.register= (request, response) => {
    const newUser= new User(request.body);
    console.log(newUser);

    newUser.save()
        .then(()=>{
            console.log("successful registration");
            response.json({
                message:"successfully registered",
                user: newUser,
            })
        })
        .catch((err)=>{
            console.log(err);
            response.status(400).json(err);
        })
        // User.save(request.body)
        // .then(user => {
        //     const userToken = jwt.sign({
        //         id: user._id
        //     }, process.env.SECRET_KEY);

        //     response
        //         .cookie("usertoken", userToken, {
        //             httpOnly: true
        //         })
        //         .json({ msg: "success!", user: user });
        // })
        // .catch(err => response.status(400).json(err));
    }

module.exports.login= (request, response) => {
    User.findOne({email:request.body.email})
        .then((user)=>{
            if(user===null){
                response.status(400).json({message:"Invalid Login Attempt - 1"})
            } else {
                bcrypt.compare(request.body.password, user.password)
                    .then((isPasswordValid)=>{
                        if(isPasswordValid===true){
                            console.log("password is valid");
                            response.cookie("usertoken",
                                jwt.sign({
                                    _id:user._id,
                                    username:user.firstName,
                                    email:user.email
                                },
                                process.env.JWT_SECRET),
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now()+30000000)
                                })
                                .json({
                                    message:"Successfully logged in",
                                    userLoggedIn:{
                                        username: user.firstName,
                                    }
                                })
                        } else {
                            response.status(400).json({message:"Invalid Login Attempt - 2"})
                        }
                    })
                    .catch((err)=>{
                        response.status(400).json({message:"Invalid Login Attempt - 3"})
                    })
            }
        })
        .catch((err)=>{
            response.status(400).json({message:"Invalid Login Attempt - 4"})
        })
        
}

// module.exports.login= async(request, response) => {
//         const user = await User.findOne({ email: request.body.email });

//         if(user === null) {
//             // email not found in users collection
//             return response.status(400).json({message:"error in login"});
//         }

//         // if we made it this far, we found a user with this email address
//         // let's compare the supplied password to the hashed password in the database
//         const correctPassword = await bcrypt.compare(request.body.password, user.password);

//         if(!correctPassword) {
//             // password wasn't a match!
//             return response.status(400).json({message:"error in login"});
//         }

//         // if we made it this far, the password was correct
//         const userToken = jwt.sign({
//             id: user._id
//         }, process.env.SECRET_KEY);

//         // note that the response object allows chained calls to cookie and json
//         response
//             .cookie("usertoken", userToken, {
//                 httpOnly: true
//             })
//             .json({ msg: "success!" });
//     }

module.exports.logout= (request, response) => {
    console.log("logging out");
    response.clearCookie('usertoken');
    response.json({message: "You have successfully logged out"});
}