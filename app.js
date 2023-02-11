const express= require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();

app.set('view engine' , 'ejs');
app.use("/static" , express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));

const homeStart = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ut labore exercitationem eveniet accusantium temporibus harum. Tempore non quas officia? Obcaecati ipsam voluptatem eius, nostrum necessitatibus reiciendis ad corporis veritatis.";
const aboutStart = "About ipsum dolor sit amet consectetur adipisicing elit. Et ut labore exercitationem eveniet accusantium temporibus harum. Tempore non quas officia? Obcaecati ipsam voluptatem eius, nostrum necessitatibus reiciendis ad corporis veritatis.";
const contactStart = "Contact ipsum dolor sit amet consectetur adipisicing elit. Et ut labore exercitationem eveniet accusantium temporibus harum. Tempore non quas officia? Obcaecati ipsam voluptatem eius, nostrum necessitatibus reiciendis ad corporis veritatis.";

let posts = [];


app.get("/", function(req, res){
    res.render("home" , {title: "HOME" , startingContent: homeStart , posts: posts});
});

app.get("/about" , function(req,res){
    res.render("about" , {title: "ABOUT" , startingContent: aboutStart});
});

app.get("/contact" , function(req,res){
    res.render("contact" , {title: "CONTACT" ,startingContent: contactStart });
});
app.get("/compose" , function(req,res){
    res.render("compose" , {title: "COMPOSE" ,startingContent: "" });
});
app.get("/posts/:posName" , function(req,res){
    const requestedTitle =  _.lowerCase(req.params.posName);
    posts.forEach(function (post){
        const storedTitle = _.lowerCase(post.postTitle);
        if(storedTitle === requestedTitle){
            
            res.render("posts", {title: post.postTitle , startingContent: "" ,  content: post.content});
            // res.redirect("/posts");
        }
        
    });

});
app.post("/compose" , function(req,res){
    const post = {
        postTitle: req.body.postTitle ,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
});


app.listen(3000 , function(){
    console.log("Server running on port 3000");
});