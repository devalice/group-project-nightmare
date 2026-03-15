let stage = 1
let slideIndex = 0
let hasAnomaly = false

const baseSlides = [
{
title:"AI 기반 일정 관리 서비스",
team:"Team abc",
date:"2025.06.10",
bullets:[],
image:null
},
{
title:"문제 정의",
team:"",
date:"",
bullets:[
"일정 관리 앱 사용률 감소",
"협업 기능 부족",
"복잡한 UI"
],
image:"assets/graph.png"
},
{
title:"해결 방안",
team:"",
date:"",
bullets:[
"AI 일정 추천",
"팀 일정 공유",
"간단한 UI"
],
image:"assets/service.png"
}
]

let slides = JSON.parse(JSON.stringify(baseSlides))

function applyAnomaly(){

hasAnomaly = Math.random() < 0.6

if(!hasAnomaly) return

let type = Math.floor(Math.random()*3)

if(type===0){
slides[0].team="Team GOAT"
}

if(type===1){
slides[1].image="assets/cat.png"
}

if(type===2){
slides[1].image="assets/dog.png"
}

}

function loadStage(){

slideIndex=0
slides = JSON.parse(JSON.stringify(baseSlides))

if(stage!==1){
applyAnomaly()
}else{
hasAnomaly=false
}

render()

}

function render(){

let s = slides[slideIndex]

document.getElementById("title").innerText=s.title
document.getElementById("team").innerText=s.team
document.getElementById("date").innerText=s.date

let bullets=""
s.bullets.forEach(b=>bullets+=`<li>${b}</li>`)
document.getElementById("bullets").innerHTML=bullets

let img=document.getElementById("image")

if(s.image){
img.src=s.image
img.style.display="block"
}else{
img.style.display="none"
}

document.getElementById("slideIndex").innerText=`Slide ${slideIndex+1} / 3`
document.getElementById("stage").innerText=`Stage ${stage} / 16`

}

function prevSlide(){
if(slideIndex>0){
slideIndex--
render()
}
}

function nextSlide(){
if(slideIndex<2){
slideIndex++
render()
}
}

function detect(){

if(hasAnomaly){
nextStage("이상현상 발견 성공!")
}else{
gameOver("오탐지!")
}

}

function submit(){

if(hasAnomaly){
gameOver("이상현상 놓침!")
}else{
nextStage("정상 PPT!")
}

}

function nextStage(msg){

document.getElementById("message").innerText=msg

if(stage===16){
document.getElementById("message").innerText="발표 성공! A+"
return
}

stage++

setTimeout(loadStage,800)

}

function gameOver(msg){

document.getElementById("message").innerText=msg+" 처음부터!"

stage=1

setTimeout(loadStage,1200)

}

loadStage()