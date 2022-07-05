const classSelector = document.getElementById('class-select')
const charImg = document.getElementById('char-img')
const profList = document.getElementById('proficiencies-list')
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
defaultOption.setAttribute('innerText', Select a Class)
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
        document.getElementById('selected-class').innerText = e.target.value
        let src = `${baseImgUrl}${portraitMap[e.target.value.toLowerCase()]}`
        charImg.src = src
        charImg.classList.remove('hidden')
        req = await fetch(`https://www.dnd5eapi.co/api/classes/${e.target.value.toLowerCase()}`)
        res = await req.json()
        profList.innerHTML = ''
        res.proficiencies.forEach((prof) => {
            let li = document.createElement('li')
            li.innerText = prof.name
            profList.append(li)
        })
        profList.classList.remove('hidden')
        console.log(e.target.value)
    })
}

// the request function will now automatically run when the page loads


// 1. List out the spells available to each class in DnD according to the class the user has currently selected
// 2. Allow the user to name their character in DnD project
// 3. Allow the user to create multiple characters in DnD project

// 1. Is 

request()

//