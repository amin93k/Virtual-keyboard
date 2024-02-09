const li = document.querySelectorAll("li")
const input = document.getElementById("typing")

// Initialize shift and caps lock states
let shiftToggle = false
let shiftId
let capsLock = false

// focus on input box when load page
input.focus()

document.addEventListener("keydown",function (e){
    let element = document.getElementById(e.code)
    changeClass(element)
})

// Loop through all li elements
li.forEach(function (elm){
    elm.addEventListener("mousedown", selectMouse)
    elm.addEventListener("selectstart", (event) => {
        event.preventDefault()
    })
})

// add and remove CSS class for button animation with a delay
function changeClass(element){
    try {
        element.classList.add("selected")
        setTimeout(() => element.classList.remove("selected"), 200)
    }catch (err){
        // Does not display errors related to non-existent keys
    }
}

// handle mouse click events on the buttons
function selectMouse(event){
    let keyElm = event.target
    let keyText = keyElm.textContent

    if(keyText === "Shift" && shiftToggle === false){
        keyElm.classList.add("selected")
        shiftToggle = true
        shiftId = keyElm.id
        return;
    }else if(shiftToggle){
        shiftToggle = false
        document.getElementById(shiftId).classList.remove("selected")
        changeClass(keyElm)

        // Add appropriate characters to the input value
        switch (keyText){
            case "1": input.value += "!"
                break
            case "2": input.value += "@"
                break
            case "3": input.value += "#"
                break
            case "4": input.value += "$"
                break
            case "5": input.value += "%"
                break
            case "6": input.value += "^"
                break
            case "7": input.value += "&"
                break
            case "8": input.value += "*"
                break
            case "9": input.value += "("
                break
            case "0": input.value += ")"
                break
            case "-": input.value += "_"
                break
            case "=": input.value += "+"
                break
            case "[": input.value += "{"
                break
            case "]": input.value += "}"
                break
            case "\"": input.value += "|"
                break
            case "'": input.value += '"'
                break
            case ";": input.value += ":"
                break
            case "/": input.value += "?"
                break
            case ".": input.value += ">"
                break
            case ",": input.value += "<"
                break

            case "Space":
            case "Tab":
            case "Caps":
            case "Enter":
            case "Esc":
            case "Shift":
            case "Back":
                break
            default:
            input.value += keyText
        }
        return;
    }

    // Handle Backspace key
    if (keyText === "Back") {
        input.value = input.value.slice(0, -1);
        changeClass(keyElm)
        return
    }

    // Handle Space key
    if (keyText === "Space") {
        input.value += " "
        changeClass(keyElm)
        return
    }

    // Handle Caps Lock key
    if(keyText === "Caps"){

        if(keyElm.classList[2] === "selected"){
            keyElm.classList.remove("selected")
            capsLock = false
            return;
        }else {
            keyElm.classList.add("selected")
            capsLock = true
        }
    }

    if(capsLock){
        // If Caps Lock is active
        switch (keyText){
            // Handle special keys that shouldn't be affected by Caps Lock
            case "Tab":
            case "Caps":
            case "Enter":
            case "Esc":
                break
            default:
                input.value += keyText
                changeClass(keyElm)
        }
    }
    // If Caps Lock is not active
    else {
        switch (keyText) {
            case "Tab":
            case "Caps":
            case "Enter":
            case "Esc":
                changeClass(keyElm)
                break
            default:
                input.value += keyText.toLowerCase()
                changeClass(keyElm)
        }
    }

}
