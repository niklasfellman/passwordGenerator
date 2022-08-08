const cbLetters = document.querySelector("#letters")
const cbCapLetters = document.querySelector("#capLetters")
const cbNumbers = document.querySelector("#numbers")
const cbSpecChar = document.querySelector("#specChars")
const domPass = document.querySelector(".password")
const lengthSlider = document.querySelector("#length")
const passLengthNum = document.querySelector(".password-length")
let characters = {
    letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    capLetters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    specChar: ["!", "#", "¤", "%", "&", "/", "(", ")", "=", "?", "@", "£", "$", "€", "{", "[", "]", "}", "<", ">", "|", "-", "_", ".", ",", ":", ";"]
}
let allowed = new Set(["letters", "capLetters", "numbers", "specChar"])
let passLength = lengthSlider.value
passLengthNum.innerText = passLength
lengthSlider.addEventListener("input", (x) => {
    passLength = x.target.value
    createPass(passLength, [...allowed])
    passLengthNum.innerText = passLength
})

function createPass(len, arr) {
    let result = []
    let length = len
    let selectedNum = arr.length
    let current;
    for (let k = 0; k < selectedNum - 1; k++) {
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
    let temp;
    let rand
    for (let i = result.length - 1; i > 0; i--) {
        rand = Math.floor(Math.random() * i)
        temp = result[rand]
        result[rand] = result[i]
        result[i] = temp
    }
    console.log(result.join(""))
    domPass.innerText = result.join("")
}
cbLetters.addEventListener("click", (x) => {
    let checked = x.target.checked
    if (checked) {
        allowed.add("letters")
    }
    if (!checked && allowed.size > 1) {
        allowed.delete("letters")
    } else {
        x.target.checked = true
    }
    createPass(passLength, [...allowed])
})
cbCapLetters.addEventListener("click", (x) => {
    let checked = x.target.checked
    if (checked) {
        allowed.add("capLetters")
    }
    if (!checked & allowed.size > 1) {
        allowed.delete("capLetters")
    } else {
        x.target.checked = true
    }
    createPass(passLength, [...allowed])
})
cbSpecChar.addEventListener("click", (x) => {
    let checked = x.target.checked
    if (checked) {
        allowed.add("specChar")
    }
    if (!checked && allowed.size > 1) {
        allowed.delete("specChar")
    } else {
        x.target.checked = true
    }
    createPass(passLength, [...allowed])
})
cbNumbers.addEventListener("click", (x) => {
    let checked = x.target.checked
    if (checked) {
        allowed.add("numbers")
    }
    if (!checked && allowed.size > 1) {
        allowed.delete("numbers")
    } else {
        x.target.checked = true
    }
    createPass(passLength, [...allowed])
})
createPass(passLength, [...allowed])