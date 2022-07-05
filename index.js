const classSelector = document.getElementById('class-select')
const charImg = document.getElementById('char-img')
const profHeader = document.getElementById('proficiencies-header')
const profList = document.getElementById('proficiencies-list')
const spellHeader = document.getElementById('spell-header')
const spellList = document.getElementById('spell-list')
const baseImgUrl = 'https://www.dndbeyond.com/attachments/thumbnails/0/'
const portraitMap = {
    'barbarian': '679/400/417/c3barbarianintro.png',
    'bard': '684/400/406/c3bardintro.png',
    'cleric': '687/380/437/c3clericintro.png',
    'druid': '693/400/399/c3druidintro.png',
    'fighter': '697/400/475/c3fighterintro.png',
    'paladin': '701/400/473/c3paladinintro.png',
    'monk': '700/400/490/c3monkintro.png',
    'ranger': '707/400/444/c3rangerintro.png',
    'rogue': '709/375/480/c3rogueintro.png',
    'sorcerer': '712/400/517/c3sorcererintro.png',
    'wizard': '717/400/484/c3wizardintro.png',
    'warlock': '716/400/512/c3warlockintro.png'
}

let defaultOption = document.createElement('option')
defaultOption.setAttribute('value', 'default')
defaultOption.innerText = 'Select a Class'
defaultOption.setAttribute('selected', 'true')
classSelector.append(defaultOption)

let request = async () => {
    // initiate request to dnd server
    let req = await fetch('https://www.dnd5eapi.co/api/classes')
    // get response from server and convert it to JSON
    let res = await req.json()
    res.results.forEach((char) => {
        let option = document.createElement('option')
        option.setAttribute('value', char.name)
        option.innerText = char.name
        classSelector.append(option)
    })
    
    
    classSelector.addEventListener('change', async (e) => {
        if (e.target.value == 'default') return
        document.getElementById('selected-class').innerText = e.target.value
        let src = `${baseImgUrl}${portraitMap[e.target.value.toLowerCase()]}`
        charImg.src = src
        charImg.classList.remove('hidden')
        req = await fetch(`https://www.dnd5eapi.co/api/classes/${e.target.value.toLowerCase()}`)
        res = await req.json()
        
        // Proficiencies
        profList.innerHTML = ''
        res.proficiencies.forEach((prof) => {
            let li = document.createElement('li')
            li.innerText = prof.name
            profList.append(li)
        })
        profList.classList.remove('hidden')
        console.log(e.target.value)

        
        // Spells
        req = await fetch(`https://www.dnd5eapi.co/api/classes/${e.target.value.toLowerCase()}/spells`)
        res = await req.json()
        if (res.count !== 0) {
            spellList.innerHTML = ''
            spellList.classList.remove('hidden')
            spellHeader.classList.remove('hidden')
            
            
            res.results.forEach((spell) => {
                let li = document.createElement('li')
                li.classList.add('spell')
                li.innerText = spell.name
                spellList.append(li)
                
            })
        } else {
            spellList.classList.add('hidden')
            spellHeader.classList.add('hidden')
    }
    })
    
    // Task 1. 
    // 1.1 Need to query the JSON database for spells
    // 1.2 Need to limit which spells show based on class (need to see
    // how this is organized in the JSON)
    // 1.3 Need to append the spells to a UI element
    
    // Begin with the most basic form: show all the spells all the time
    
    // example: https://www.dnd5eapi.co/api/classes/bard/spells


}

// the request function will now automatically run when the page loads


// 1. List out the spells available to each class in DnD according to 
// the class the user has currently selected
// 2. Allow the user to name their character in DnD project
// 3. Allow the user to create multiple characters in DnD project

// Task 1. 
// 1.1 Need to query the JSON database for spells
// 1.2 Need to limit which spells show based on class (need to see
// how this is organized in the JSON)
// 1.3 Need to append the spells to a UI element

// Task 2.
// 2.1 Need a field to input a name
    // 2.1.1 "Name Your Character", form with input
// 2.2 Need the name to display as a UI element
// Input value should be stored into an object
// Option should be available to rename character

// Task 3.
// 3.1 Need a UI object to save character
// 3.2 Need to change what displays on the page based on selected char
    // 3.2.1 Potentially can store the selected/input information
    // in an object and repopulate the page based on what is there
// 3.3 Need a UI object to change character

// ORDER OF WORK

// Start with option 1 because it's the most "difficult" and will require using
// API






request()

//