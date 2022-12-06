'use strict'


var gNextId = 1
var gQuests = []

var gCurrQuestIdx = 0
var gTimeoutId

function initGame() {
    createQuests(3)
    onPlayGame()
}
function onPlayGame() {
    const elbtn= document.querySelector('.restart')
    elbtn.style.display='none'
    gCurrQuestIdx = 0
    renderQuest(gQuests)
    // onAnswerClick()
    // onVictory()
    // OnRestartGame()
   

}


function onWrongAnswer() {
    const elmodal = document.querySelector('.modal')
    elmodal.innerText = 'try again'
    elmodal.style.display = 'block'
    if (gTimeoutId) clearTimeout(gTimeoutId)
    gTimeoutId = setTimeout(onCloseModal, 2000)
}

function onRightAnswer() {
    const elmodal = document.querySelector('.modal')
   if (gCurrQuestIdx<gQuests.length-1){
     elmodal.innerText = 'very good!'
    elmodal.style.display = 'block'
    gCurrQuestIdx++
    renderQuest(gQuests)
   }else {
    onVictory()
   }
    if (gTimeoutId) clearTimeout(gTimeoutId)
    gTimeoutId = setTimeout(onCloseModal, 2000)
}

function onCloseModal() {
    const elmodal = document.querySelector('.modal')
    elmodal.style.display = 'none'
}




// renderQuest(gQuests)

function checkAnswer(optIdx) {
    const ques = gQuests[gCurrQuestIdx]
    if (optIdx === ques.correctOptIndex) onRightAnswer()

    else onWrongAnswer()

}

// function OnRestartGame() { }

// function createOpts(optsCount) {
//     const opts = []
//     const rightOpt = prompt('write the right answer')
//     opts.push(rightOpt)
//     for (var i = 0; i < optsCount; i++){
//         const wrongOpt = prompt('write a wrong answer')
//         opts.push(wrongOpt)
// }
// return opts
// }


// const opts4= ['the ', 'a cat on the grass']
// const opts5= ['a dog on the grass', 'a cat on the grass']
// const opts6= ['a dog on the grass', 'a cat on the grass']
// const opts7= ['a dog on the grass', 'a cat on the grass']
// const opts8= ['a dog on the grass', 'a cat on the grass']
// const opts9= ['a dog on the grass', 'a cat on the grass']


function createQuest(opts) {
    // const opts= createOpts(2)
    const rightOpt = opts[0]
    const quest = {
        id: gNextId++,
        opts: shuffle(opts),
        correctOptIndex: opts.indexOf(rightOpt)
    }
    // console.log('quest:',quest)
    return quest
}


function createQuests(QuestsCount) {
    const opts1 = ['a dog on the grass', 'a cat on the grass']
    const quest1 = createQuest(opts1)
    gQuests.push(quest1)
    const opts2 = ['a nice bird called Maina', 'a raven']
    const quest2 = createQuest(opts2)
    gQuests.push(quest2)
    const opts3 = ['a ostridge', 'an emo']
    const quest3 = createQuest(opts3)
    gQuests.push(quest3)
    console.log('gqiest:', gQuests)
    // for (var i = 0; i <= QuestsCount; i++) {

    // }
}

function renderQuest(quests) {
    var strHTML = ``
    // const questsCopy = []
    // for (var i = 0; i < Quests.length; i++) {
    //     const quest = Quests[i]
    //     console.log('i:',i)
    //     questsCopy.push(quest)
    //      console.log('copy:',questsCopy)
    // }

    const elOpts = document.querySelector('.opts')
    for (var i = 0; i < quests[gCurrQuestIdx].opts.length; i++) {

        strHTML += `<div><button  style="bottom:${100 + i * 50}px;"  data-ques-idx="${gCurrQuestIdx} data-i-opts="${i}" onclick=" checkAnswer(${i})">${quests[gCurrQuestIdx].opts[i]} </button></div> `

        console.log('str:', strHTML)
    }
    elOpts.innerHTML = strHTML
    const elImage = document.querySelector('.image')
    elImage.innerHTML = `<img src="pic/${gCurrQuestIdx + 1}.jpg" >`

    // gCurrQuestIdx++
    // questsCopy.shift(questsCopy[0], 1)

}

function onVictory() {
    const elmodal = document.querySelector('.modal')
    elmodal.innerText = 'victory!!'
    elmodal.style.display = 'block'
    const elbtn= document.querySelector('.restart')
    elbtn.style.display='block'
    if (gTimeoutId) clearTimeout(gTimeoutId)
    gTimeoutId = setTimeout(onCloseModal, 2000)
}


function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

