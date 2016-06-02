var koa = require('koa');
var Router = require('koa-router');
var views=require("koa-views");
var app = koa();
var router = new Router();

//add views
app.use(views(__dirname+'/views',{
    extension: 'pug',
    map: {
        html: 'pug'
    }
}));

router.get('/', function *() {
    yield this.render('home', {test:1});
});

//add middleware 
app.use(router.middleware());

//connect
app.listen(process.env.PORT, function() {
    console.log("connected");
});


