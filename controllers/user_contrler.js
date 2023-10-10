const User = require('../model/user')

module.exports.profile = (req, res)=>{
    return res.render('profile', {
        title : "Codeial",
    })
}

module.exports.signin = (req, res)=>{

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signIn', {
        title: "Codeial | SignIn"
    })
};

module.exports.signup = (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_signUp', {
        title: "Codeial | SignUp"
    })
};


// get the sign up data
module.exports.newUser = (req, res)=>{
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('/')
    }

    // searching if the email is available or not
    User.findOne({email:req.body.email})
    .then((user)=>{
        if(!user){
            // creating the user if user is not present 
            User.create(req.body)
            .then((user)=>{
                console.log(user);
                res.redirect('/users/sign-in')
            })
        }else{
            res.redirect('back')
        }
    }).catch((err)=>{
        console.log('Error in finding the email id while signing up', err);
    })
};


// get the sign in Data
module.exports.session = (req, res)=>{
    console.log('res');
    return res.redirect('/')
};


module.exports.destroySession = (req, res)=>{
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
      });
}