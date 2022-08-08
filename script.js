const domPass = document.querySelector(".password")
const lengthSlider = document.querySelector("#length")
const passwordLengthNum = document.querySelector(".password-length")
const btnNew = document.querySelector("#btn-new")
const checkBoxContainer = document.querySelector(".checkboxes")

const characters = {
    letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    capLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    specChar: ["!", "#", "¤", "%", "&", "/", "(", ")", "=", "?", "@", "£", "$", "€", "{", "[", "]", "}", "<", ">", "|", "-", "_", ".", ",", ":", ";"]
}

let allowed = new Set(["letters", "capLetters", "numbers", "specChar"])
let passLength = lengthSlider.value

passwordLengthNum.innerText = passLength

lengthSlider.addEventListener("input", (x) => {
    passLength = x.target.value
    createPass(passLength, [...allowed])
    passwordLengthNum.innerText = passLength
})

function createPass(len, arr) {
    let result = []
    let length = len
    let howManySelected = arr.length
    let current;
// = = = = PUTS AN RANDOM AMOUNT OF EACH CHARACTER TYPE INTO RESULT = = = = = = 
    for (let k = 0; k < howManySelected - 1; k++) {
        current = arr.pop()
        for (let i = 0; i <= Math.ceil(Math.random() * (length - arr.length)); i++) {
            result.push(characters[current][Math.floor(Math.random() * (characters[current].length))])
            length--
        }
    }
    current = arr.pop()
    for (let i = 0; i < length; i++) {
        result.push(characters[current][Math.floor(Math.random() * (characters[current].length))])
    }
//==============================================================================
//=>=>=>=>=>=>=>=>=>=>=>=>= RANDOMIZES RESULT <=<=<=<=<=<=<=<=<=<=<=<=<=<=<=<=<=
    let temp;
    let rand
    for (let i = result.length - 1; i > 0; i--) {
        rand = Math.floor(Math.random() * i)
        temp = result[rand]
        result[rand] = result[i]
        result[i] = temp
    }
//==============================================================================
    console.log(result.join(""))
    domPass.innerText = result.join("")
}

btnNew.addEventListener("click",()=>{
    createPass(passLength, [...allowed])
})

checkBoxContainer.addEventListener("click",(x)=>{
	if(x.target.type === "checkbox"){
		let target = x.target.id
		if(x.target.checked){allowed.add(target)}
		if(!x.target.checked && allowed.size>1){allowed.delete(target)}
		else{x.target.checked = true}
		createPass(passLength, [...allowed])
	}
})

createPass(passLength, [...allowed])

