    //second attempt
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM Content Loaded!')
    const baseURL = "http://localhost:3000/monsters"
    const previousMonsterURL = "http://localhost:3000/monsters/?_limit=20&_page=2"
    const firstMonsterURL = "http://localhost:3000/monsters/?_limit=20&_page=3"
    const secondMonsterURL = "http://localhost:3000/monsters/?_limit=20&_page=4"
    const container = document.querySelector("#monster-container")

    function init(){
        fetchMonsters();
        createMonsterForm();
        nextPage();
        previousMonsterPage();

    }
    function fetchMonsters(){
        return fetch(firstMonsterURL)
        .then(function(resp){
            return resp.json()
        })
        .then(function(monsters){
            for(let i = 0; i < monsters.length; i++)
            renderMonster(monsters[i])
        })
    }

    function renderMonster(monster){
        // console.log(monster)
        const showMonster = document.createElement('div')
        showMonster.innerHTML = `
        <h2> Name: ${monster.name}</h2>
        <h3> Age: ${monster.age}</h3>
        <h4> Description: </h4>
        <h4>${monster.description}</h4>
        <br>
        `
        container.append(showMonster)
    }

    function createMonsterForm(){
        const createMonster = document.querySelector("#create-monster")
        const monsterForm = document.createElement('form')
        monsterForm.innerHTML = `
        Name: <input id="name" placeholder="Monster Name"> </input>
        Age: <input id="age" placeholder="Monster Age"> </input>
        Description: <input id="description" placeholder="Monster Description"> </input>
        <br><br>
        `
        const submitButton = document.createElement('input')
        submitButton.type = "submit"
        // submitButton.innerText = "Submit!"
        // submitButton.addEventListener('click', newMonster)
        createMonster.addEventListener('submit', newMonster)

        createMonster.append(monsterForm)
        monsterForm.append(submitButton)       
    }

    function newMonster(e){
        e.preventDefault()
        // let newName = document.querySelector('input[placeholder="Monster Name"]').value
        // let newAge = document.querySelector('input[placeholder="Monster Age"]').value
        // let newDescription = document.querySelector('input[placeholder="Monster Description"]').value
        let newName = e.target.name.value
        let newAge = e.target.age.value
        let newDescription = e.target.description.value

        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: newName,
                age: newAge,
                description: newDescription
            })
        })
        .then(function(resp){
            return resp.json()
        })
        .then(function(monster){
            renderMonster(monster)
        })
    }

    //not finished - need to sort out the back and forward buttons!
    //buttons go to page 2 and page 4 - need to remove the page 3 monsters so the user only see one page at a time
    function nextPage(){
        const forwardBtn = document.querySelector('#forward')
        forwardBtn.addEventListener('click', next20Monsters)
    }
    function next20Monsters(){
        return fetch(secondMonsterURL)
        .then( resp => resp.json())
        .then(function(monsters){
            for(let i = 0; i < monsters.length; i++)
            renderMonster(monsters[i])
            console.log(monsters)
        })
    }

    function previousMonsterPage(){
        const backBtn = document.querySelector('#back')
        backBtn.addEventListener('click', last20Monsters)
    }
    function last20Monsters(){
        return fetch(previousMonsterURL)
        .then(resp => resp.json())
        .then(monsters => {
            for(let i = 0; i < monsters.length; i++)
            renderMonster(monsters[i])            
            console.log(monsters)
        })
    }

    init();
})




        //first attempt
// document.addEventListener("DOMContentLoaded", () => {
//     console.log('DOM Content Loaded!')
//     const baseURL = "http://localhost:3000/monsters"
//     const monsterURL = "http://localhost:3000/monsters/?_limit=20&_page=3"
//     const container = document.querySelector("#monster-container")

//     function init(){
//         fetchMonsters();
//         createMonsterForm();
//     }
//     function fetchMonsters(){
//         return fetch(monsterURL)
//         .then(resp => resp.json())
//         .then( monsters => {
//             for(let i = 0; i < monsters.length; i++)
//             displayMonsters(monsters[i])
//         })
//     }
//     function displayMonsters(monster){
//         // console.log(monster)
//         const showMonster = document.createElement('div')
//         let h2 = document.createElement('h2')
//         h2.innerText = `Name: ${monster.name}`
//         h2.style.color = 'skyblue'
//         let h3 = document.createElement('h3')
//         h3.innerText = `Age: ${monster.age}`
//         let h4 = document.createElement('h4')
//         h4.innerText = `Description: ${monster.description}`
//         let br = document.createElement('br')

//         container.append(showMonster)
//         showMonster.append(h2, h3, h4, br)
//     }
//     function createMonsterForm(){
//         const createMonster = document.querySelector('#create-monster')
//         const form = document.createElement('form')
//         form.innerText = 'CREATE A NEW MONSTER: '
//         let nameInput = document.createElement('input')
//         nameInput.setAttribute("id", "name");
//         nameInput.setAttribute("placeholder", "Monster Name")
//         // const br = document.createElement('br')
//         let ageInput = document.createElement('input')
//         ageInput.setAttribute('id', 'age')
//         ageInput.setAttribute('placeholder', 'Monster Age')
//         let descriptionInput = document.createElement('input')
//         descriptionInput.setAttribute('id', 'description')
//         descriptionInput.setAttribute('placeholder', 'Monster Description')

//         let submitButton = document.createElement('button')
//         submitButton.innerText = 'Submit!'
//         submitButton.addEventListener('submit', newMonster)

//         createMonster.append(form)
//         form.append(nameInput, ageInput, descriptionInput, submitButton)
//     }
//     function newMonster(event){
//         event.preventDefault()
//         let newName = event.target.name.value
//         let newAge = event.target.age.value
//         let newDescription = event.target.description.value

//         fetch(baseURL, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: newName,
//                 age: newAge,
//                 description: newDescription
//             })
//         })
//         .then(resp => resp.json())
//         // .then(monster => displayMonsters(monster))
//         .then(function(monster){
//              displayMonsters(monster)
//         })
//     }

//     init();
// })
