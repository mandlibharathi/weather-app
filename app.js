const express=require('express');
const bodyParser=require('body-parser')
const request=require('request')
const app=express()
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')

const apiKey="4341c06526fc85e93aa9436527f947dd";
//to get ejs file
app.get('/',(rq,res)=>{
    res.render('index',{weather:null, error:null});
})

//create post request

app.post('/',(req,res)=>{

const city=req.body.city;

const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url,function(err,responce,body){
    if(err){
        res.render('index',{ weather:null,error:'getting error please try agsin.!'})
    }
    
    else{
        let weather=JSON.parse(body)   
        if(weather.main == undefined){
res.render('index',{weather:null,error:'please try agin'})
        }
        else{
            let F=5/9*(weather.main.temp-32)
            let C=F.toFixed(2)
let weatherTest=`It's ${C} degrees in ${weather.name}!`
            
res.render('index',{weather:weatherTest,err:null})
        }
    }
});
});



//conncet to port.
app.listen(port=8080,()=>{
    console.log(`your server is running ${port}`)
})