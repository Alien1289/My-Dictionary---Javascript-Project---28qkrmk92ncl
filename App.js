
let wordInput = ""
let initial = "";
let count = 0
let arr = []

document.getElementById('main-content-entry-input').addEventListener('input', function(){
    if (count === 0){
        wordInput = document.getElementById('main-content-entry-input').value
    }else{
        wordInput = document.getElementById('main-content-entry-input').value
        document.getElementById('section').style['visibility'] = 'hidden'
    }
})

document.getElementsByClassName('search')[0].addEventListener('click', async function(){
    
    if (initial !== wordInput){
        try{
            initial = wordInput
            let request = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`)
            let data =  await request.json()

            let w = data[0].word 
            let m = data[0].meanings[0].definitions[0].definition
            

            let obj = {'word': w, 'meaning':m}
            arr.push(obj)

            
            if (count === 0){
                document.getElementById('section').style['display'] = 'block'
            }else{
                document.getElementById('section').style['visibility'] = 'visible'
            }
            document.getElementById('section').innerHTML = 
            `<h2>Word: <span>'${w}'</span></h2><br/><h2>Meaning:</h2><br/><p>${m}</p>`
            count = 1;

        }catch(err){
            if (count === 0){
                document.getElementById('section').style['display'] = 'block'
            }else{
                document.getElementById('section').style['visibility'] = 'visible'
            }
            document.getElementById('section').innerHTML = "<h5>Sorry, We could not find the word in our Dictionary</h5>"
            count = 1;
        }
        
    }
})


document.getElementById('nav-history-button').addEventListener('click', function(){


    if(document.getElementById('nav-history-button').innerText === 'HISTORY'){

        document.getElementById('nav-history-button').innerText = 'SEARCH'

        document.getElementById('main').style['display'] = 'none'
        document.getElementById('overlay-history').style['display'] = 'grid'

        if (arr.length === 0){
            document.getElementById('overlay-history-note').style['display'] = 'block'
        }else{
            document.getElementById('overlay-history-note').style['display'] = 'none'
        }

        for(let index in arr){
            let newElement = document.createElement('div')
            newElement.setAttribute('class', 'grid-history-item')
            newElement.innerHTML = 
            `<h2>Word: <span >${arr[index].word}</span></h2><br/><h2>Meaning:</h2><p>${arr[index].meaning}</p><i class="fa-solid fa-trash-can"></i>`
            deleteArrayElement(newElement.getElementsByClassName('fa-trash-can')[0], newElement, arr[index].word)
            document.getElementById('overlay-history').appendChild(newElement)
        }
    }else{
        document.getElementById('nav-history-button').innerText = 'HISTORY'

        document.getElementById('overlay-history-note').style['display'] = 'none'
        document.getElementById('overlay-history').style['display'] = 'none'
        document.getElementById('main').style['display'] = 'flex'
        document.getElementById('overlay-history').innerHTML = ""
        document.getElementById('main-content-entry-input').value = ""
        document.getElementById('section').style['display'] = 'none'

        count = 0

    }
    
})


function deleteArrayElement(element, newElement, target){
    element.addEventListener('click', function(){
        newElement.style['display'] = 'none'
        for(let index in arr){
            if (arr[index].word === target){
                arr.splice(index,1)
                if(arr.length === 0){
                    document.getElementById('overlay-history-note').style['display'] = 'block'
                }
                break;
            }
        }
        console.log(arr)
    })


    
}