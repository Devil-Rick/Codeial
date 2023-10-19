const Post = require('../model/post');

module.exports.create = (req, res)=>{
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(post => {
        console.log(post.content);
        res.redirect('/')
    }).catch(err => {
        console.log(err);
        return res.redirect('back')
    })
};