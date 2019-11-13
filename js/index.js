document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/monsters"
    const monsterURL = "http://localhost:3000/monsters/?_limit=20&_page=3"
    const container = document.querySelector("#monster-container")

    function init(){
        fetchMonsters()
        createMonsterForm()

    }
    function fetchMonsters(){
        return fetch(monsterURL)
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

    //not finished - haven't done the last step!

    init();
})