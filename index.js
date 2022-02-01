const { defaultMaxListeners } = require('events');
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view'));

app.use(express.static('assets'));
app.use(express.urlencoded({
    extended: true
}));

const detail = {};
detail.education_detail = [];
detail.project_detail=[];
detail.work_experience=[];
detail.achievement_detail=[];

app.get("/", (req, res) => {
    res.render('index', {
        detail: detail,
    });
});
app.get("/personal-detail", (req, res) => {
    res.render('personal-detail')
});

app.get("/education-detail", (req, res) => {
    res.render('education-detail');
});

app.get("/education-detail", (req, res) => {
    res.render('education-detail');
});

app.get("/Technical-Skills", (req, res) => {
    res.render('technical-skills');
});

app.get("/project-detail", (req, res) => {
    res.render('project');
});
app.get("/work-experience", (req, res) => {
    res.render('work-experience');
});
app.get("/achievement", (req, res) => {
    res.render('achievement');
});

app.get("/personal-detail/:id",(req,res)=>{
    const {id}=req.params;
    res.render("edit-personal-detail",{
        detail: detail.personal_detail,
    });
});
app.get("/education-detail/:id",(req,res)=>{
    const {id}=req.params;
    let ind;
    for(let i=0;i<detail.education_detail.length;i++){
        const values=Object.values(detail.education_detail[i]);
        if(values.indexOf(id)!=-1){
            ind=i;
            break;
        }
    }
    res.render("edit-education-detail",{detail:detail.education_detail[ind]});
    // res.render("edit-education-detail");
});
app.get("/techincal-skills/:id",(req,res)=>{
    res.send("hello3");
});
app.get("/project-detail/:id",(req,res)=>{
    res.send("hello4");
});
app.get("/work-experience/:id",(req,res)=>{
    res.send("hello5");
});
app.get("/achievement/:id",(req,res)=>{
    res.send("hello6");
});




app.post("/personal-detail", (req, res) => {
    req.body.id = uuidv4();
    detail.personal_detail = req.body;
    res.redirect('/');
});
app.post("/education-detail", (req, res) => {
    req.body.id = uuidv4();
    detail.education_detail.push(req.body);
    res.redirect('/');
});
app.post("/Technical-Skills", (req, res) => {
    req.body.id = uuidv4();
    detail.technical_skills=req.body;
    res.redirect('/');
});
app.post("/project-detail", (req, res) => {
    req.body.id = uuidv4();
    detail.project_detail.push(req.body);
    res.redirect('/');
});
app.post("/work-experience", (req, res) => {
    req.body.id = uuidv4();
    detail.work_experience.push(req.body);
    res.redirect('/');
});
app.post("/achievement", (req, res) => {
    req.body.id = uuidv4();
    detail.achievement_detail.push(req.body);
    res.redirect('/');
});

app.post("/education-detail/:id",(req,res)=>{
    const {id}= req.params;
    for(let i=0;i<detail.education_detail.length;i++){
        const values=Object.values(detail.education_detail[i]);
        if(values.indexOf(id)!=-1){
            ind=i;
            break;
        }
    }
    detail.education_detail[ind]=req.body;
    res.redirect('/');
});

app.listen(port, function() {
    console.log("Server is running on port", port);
})