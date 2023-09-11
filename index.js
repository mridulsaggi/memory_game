let counter=0;
let rotate=true;
let firstcard="";
let matches=0;
let secondcard="";
let correctselected=[];
let correct=0;
let gamestarted=false;
let gamepaused=false;
let moves=0;
let selectedelements=[];
const parent = document.getElementById("cards")
const gamebutton=document.getElementById("start")
const data = [
    {
        id: 1,
        url: "./img1.jpg"
    },
    {
        id: 2,
        url: "./img2.jpg"
    },
    {
        id: 3,
        url: "./img3.jpg"
    },
    {
        id: 4,
        url: "./img4.jpg"
    },
    {
        id: 5,
        url: "./img5.jpg"
    },
    {
        id: 6,
        url: "./img6.jpg"
    },
    {
        id: 7,
        url: "./img7.jpg"
    },
    {
        id: 8,
        url: "./img8.jpg"
    }
]
const gamedata = data.concat(data);
const shuffled = (gamedata) => {
    for (let i = (gamedata.length) - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        // console.log(i, j)
        let temp=gamedata[i];
        gamedata[i]=gamedata[j];
        gamedata[j]=temp;
        
    }
    return gamedata
}
const cardmatches=()=>{
    const matches=document.querySelectorAll(".toggle");
    matches.forEach((card)=>{
        card.classList.add("done")
    })
}

const reset=()=>{
    counter=0;
    firstcard=""
    secondcard=""
    const matches=document.querySelectorAll(".toggle");
    console.log(matches.length)
    matches.forEach((card)=>{
        if(!card.classList.contains("done"))
            card.style.backgroundImage=`url(./mark.jpg)`;
            card.classList.remove("toggle")
            // card.classList.remove("selected")
        })
}

//selector function
parent.addEventListener("click",(e)=>{
    let elem=e.target;
    if(!gamestarted) gamestart() ;
    if(elem.id==="cards" || elem.classList.contains("selected")|| elem.classList.contains("done") || elem.classList.contains("toggle")){
        return;
    }
    counter++;
    moves++;
    if(counter<3){
        if(counter==1){
            firstcard=elem.dataset.name;
            elem.classList.add("toggle")
            elem.style.backgroundImage=`url(./img${firstcard}.jpg)`;
        }
        else{
            secondcard=elem.dataset.name;
            console.log(secondcard)
            
            elem.classList.add("toggle")
            elem.style.backgroundImage=`url(./img${secondcard}.jpg)`;

        }
        if(firstcard!=="" && secondcard!==""){
            if(firstcard===secondcard){
                cardmatches();
                matches++;
                setTimeout(() => {
                    reset();
                }, 1000);
            }
            else{
                setTimeout(() => {
                    
                    reset();
                }, 1000);
            }
        }
        if(matches==8){
            setTimeout(() => {
                
                alert("game completed")
                reshuffle();
            }, 1000);
        }
    }
})

const shuffleddata=shuffled(gamedata);
for (let i = 0; i < shuffleddata.length; i++) {
    const child = document.createElement("div");
    // child.style.backgroundImage=`url(${gamedata[i].url})`;
    child.classList.add("card");
    child.dataset.name = `${shuffleddata[i].id}`
    parent.appendChild(child)
}

const reshuffle=()=>{
    moves=0;
    shuffleddata=shuffled(data);
    // window.location.reload();
}
function gamestart(){
    let countDownDate=new Date(Date.now()).getTime();
    gamestarted=true;
    const a=document.getElementById("timer")
    // gamebutton.style.display="none"
    var timer=setInterval(() => {
        var now = new Date().getTime();
        var difference =now-countDownDate;
        var minutes=Math.floor((difference / 1000 / 60) % 60);
        var seconds= Math.floor((difference / 1000) % 60);
        a.innerHTML=minutes+" : "+seconds;
        document.getElementById("moves").innerHTML=`${moves}`;
    }, 1000);
    // gamebutton.addEventListener("click",gamepause);
    // gamebutton.removeEventListener("click",gamestart);
}
// const gamepause=()=>{
//     console.log("hfg")
//     gamepaused=true;
//     gamebutton.innerHTML="RESUME"
//    clearInterval(timer)
// }
// setInterval(() => {
//     difference=new Date(Date.now());
//     const parts = {
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       };
// }, 1000);