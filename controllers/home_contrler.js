const Post = require('../model/post');

 
module.exports.home = function(req, res){
    
    Post.find({}).populate('user').exec()
    .then(posts => {
        return res.render('home', {
            title : "Codeial||Home",
            posts: posts
        })
    })
    .catch(err => {
        console.log(err);
    });
}


