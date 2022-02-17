const { defaultMaxListeners } = require('events');
const express = require('express');
const { isLinux } = require('nodemon/lib/utils');
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

let detail = {};
detail.education_detail = [];
detail.project_detail=[];
detail.work_experience=[];
detail.achievement_detail=[];

app.get("/", (req, res) => {
    res.render('index', {
        detail: detail,
    });
});
app.get("/clear",(req,res)=>{
    detail = {};
    detail.education_detail = [];
    detail.project_detail=[];
    detail.work_experience=[];
    detail.achievement_detail=[];
    res.redirect('/');
});
app.get("/preview", (req, res) => {
    res.render('preview', {
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
});
app.get("/techincal-skills/:id",(req,res)=>{
    res.render("edit-technical-skills",{detail: detail.technical_skills});
});

app.get("/project-detail/:id",(req,res)=>{
    const {id}=req.params;
    let ind;
    for(let i=0;i<detail.project_detail.length;i++){
        const values=Object.values(detail.project_detail[i]);
        if(values.indexOf(id)!=-1){
            ind=i;
            break;
        }
    }
    res.render("edit-project",{detail:detail.project_detail[ind]});
});
app.get("/work-experience/:id",(req,res)=>{
    const {id}=req.params;
    let ind;
    for(let i=0;i<detail.work_experience.length;i++){
        const values=Object.values(detail.work_experience[i]);
        if(values.indexOf(id)!=-1){
            ind=i;
            break;
        }
    }
    res.render("edit-work-experience",{detail:detail.work_experience[ind]});
});
app.get("/achievement/:id",(req,res)=>{
    const {id}=req.params;
    let ind;
    for(let i=0;i<detail.achievement_detail.length;i++){
        const values=Object.values(detail.achievement_detail[i]);
        if(values.indexOf(id)!=-1){
            ind=i;
            break;
        }
    }
    res.render("edit-achievement",{detail:detail.achievement_detail[ind]});
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
app.post("/technical-Skills", (req, res) => {
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
    req.body.id=id;
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
app.post("/project-detail/:id",(req,res)=>{
    const {id}= req.params;
    req.body.id=id;
    for(let i=0;i<detail.project_detail.length;i++){
        const values=Object.values(detail.project_detail[i]);
        if(values.indexOf(id)!=-1){
            ind=i;
            break;
        }
    }
    detail.project_detail[ind]=req.body;
    res.redirect('/');
});
app.post("/work-experience/:id",(req,res)=>{
    const {id}= req.params;
    req.body.id=id;
    for(let i=0;i<detail.work_experience.length;i++){
        const values=Object.values(detail.work_experience[i]);
        if(values.indexOf(id)!=-1){
            ind=i;
            break;
        }
    }
    detail.work_experience[ind]=req.body;
    res.redirect('/');
});
app.post("/achievement/:id",(req,res)=>{
    const {id}= req.params;
    req.body.id=id;
    for(let i=0;i<detail.achievement_detail.length;i++){
        const values=Object.values(detail.achievement_detail[i]);
        if(values.indexOf(id)!=-1){
            ind=i;
            break;
        }
    }
    detail.achievement_detail[ind]=req.body;
    res.redirect('/');
});

app.get("/delete-personal-detail",(req,res)=>{
    delete detail['personal_detail'];
    res.redirect('/');
});
app.get("/delete-education-detail/:id",(req,res)=>{
    const {id}=req.params;
    let ind;
    for(let i=0;i<detail.education_detail.length;i++){
        if(detail.education_detail[i].id==id){
            ind=i;
            break;
        }
    }
    let w = detail['education_detail'];
    w.splice(ind, 1);
    detail['education_detail'] = w;
    res.redirect('/');
});
app.get("/delete-technical-skills/:id",(req,res)=>{
    delete detail['technical_skills'];
    res.redirect('/');
});
app.get("/delete-project-detail/:id",(req,res)=>{
    const {id}=req.params;
    let ind;
    for(let i=0;i<detail.project_detail.length;i++){
        if(detail.project_detail[i].id==id){
            ind=i;
            break;
        }
    }
    let w = detail['project_detail'];
    w.splice(ind, 1);
    detail['project_detail'] = w;
    res.redirect('/');
});
app.get("/delete-work-experience/:id",(req,res)=>{
    const {id}=req.params;
    let ind;
    for(let i=0;i<detail.work_experience.length;i++){
        if(detail.project_detail[i].id==id){
            ind=i;
            break;
        }
    }
    let w = detail['work_experience'];
    w.splice(ind, 1);
    detail['work_experience'] = w;
    res.redirect('/');
});
app.get("/delete-achievement/:id",(req,res)=>{
    const {id}=req.params;
    let ind;
    for(let i=0;i<detail.achievement_detail.length;i++){
        if(detail.achievement_detail[i].id==id){
            ind=i;
            break;
        }
    }
    let w = detail['achievement_detail'];
    w.splice(ind, 1);
    detail['achievement_detail'] = w;
    res.redirect('/');
});

app.listen(port, function() {
    console.log("Server is running on port", port);
})