var koa = require('koa');
var Router = require('koa-router');
var bodyparser=require("koa-bodyparser");
var serve = require('koa-static');

var app = koa();
var router = new Router();

app.use(bodyparser());

//simple request
router.get('/', function *() {
    this.body = 'Hello World';
});

router.get('/test/:id/:type',function *(){
   console.log(this.params.id);
   console.log(this.params.type);
   this.body='HOME';
});

//request with bodyparser
router.get('/bodyparser', function * (){
   this.body = '<form action="/bodyparser" method="POST">' +
                '<input type="TEXT" name="id">' +
                '<input type="submit">' +
                '</form>';
});

router.post('/bodyparser', function * (){
    this.body = this.request.body.id;
});


//test file system
router.get('/package.json',function() {
    this.body ='HOME';
});



//notice the priority between middleware and static 
//add static file system 
app.use(serve('./'));

//add middleware 
app.use(router.middleware());



//connect
app.listen(process.env.PORT, function() {
    console.log("connected");
});


