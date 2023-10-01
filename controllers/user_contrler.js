const User = require('../model/user')

module.exports.profile = (req, res) => {
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then((user)=>{
            if(user){
                return res.render('user_profile', {
                    title : "Codeial | " + user.name,
                    user : user,
                })
            }
            res.redirect('/users/sign-in')
        })
    }else{
        res.redirect('/users/sign-in')
    }
}

module.exports.signin = (req, res) => {
    return res.render('user_signIn', {
        title: "Codeial | SignIn"
    })
};

module.exports.signup = (req, res) => {
    return res.render('user_signUp', {
        title: "Codeial | SignUp"
    })
};


// get the sign up data
module.exports.newUser = (req, res) => {
    console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('home')
    }

    // searching if the email is available or not
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                // creating the user if user is not present 
                User.create(req.body)
                    .then((user) => {
                        console.log(user);
                        res.redirect('/users/sign-in')
                    })
            } else {
                res.redirect('back')
            }
        }).catch((err) => {
            console.log('Error in finding the email id while signing up', err);
        })
};


// get the sign in Data
module.exports.session = (req, res) => {
    console.log(req.body);
    // Find the user in the database
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                if(user.password != req.body.password){
                    res.redirect('back')
                }

                res.cookie('user_id', user.id);
                res.redirect('/users/profile');
            } else {
                res.redirect('back')
            }
        })
        .catch((err) =>{
            console.log('Err in finding user', err);
        });
};

module.exports.logout = (req, res) => {
    console.log('Working');
    if(req.cookies.user_id){
        res.clearCookie(req.cookies.user_id);
        return res.redirect('/')
    }
    res.redirect('/users/sign-in')
}