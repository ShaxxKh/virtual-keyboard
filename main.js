const Keyboard = {
    elements:{
        main: null,
        keyContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        shift: false,
        capsLock: false,
        ru: false,
        sound: false,
        microphone: false
    },

    init() {
        this.elements.main = document.createElement('div');
        this.elements.keyContainer = document.createElement('div');

        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keyContainer.classList.add('keyboard__keys');
        this.elements.keyContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keyContainer.querySelectorAll('.keyboard__key');


        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll('.keyboard-input').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                })
            })
        })
    },

    open(initialValue, oninput, onclose){
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden')
    },

    close(){
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden')
    },

    _triggerEvent(handlerName){
        if(typeof this.eventHandlers[handlerName] == 'function'){
            this.eventHandlers[handlerName](this.properties.value)
        }
    },

    _createKeys(){
        
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',

            'caps','q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',

             'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, 'enter',

             'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', 
            
             'ru','space', 'sounds', 'microphone', 'left', 'right', 'done'
        ];
        

        const createIconHTML = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`
        }
        const input = document.querySelector('.keyboard-input')
        let cursorPos/*  = input.length
        input.selectionDirection = 'forward' */
        
        /* const left = this.properties.value.slice(0, cursorPos);
        const right = this.properties.value.slice(cursorPos); */

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button')
            const insertLineBreak = ['backspace', ']', 'enter', '?', 'microphone'].indexOf(key) !== -1

            keyElement.setAttribute('type', 'button')
            keyElement.setAttribute('data-key', '0720')
            keyElement.classList.add('keyboard__key')

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide')
                    keyElement.innerHTML = createIconHTML('backspace')

                    keyElement.addEventListener('click', () =>{
                        if(this.properties.sound){
                            const audio = document.querySelector(`audio[data-key="backspace"]`)
                            audio.currentTime = 0;
                            audio.play()
                        }
                    
                        input.focus()
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
                        this._triggerEvent('oninput');
                    })
                    break;
                
                case "caps":
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable')
                    keyElement.innerHTML = createIconHTML('keyboard_capslock')

                    keyElement.addEventListener('click', () => {
                        if(this.properties.sound){
                            const audio = document.querySelector(`audio[data-key="caps"]`)
                            audio.currentTime = 0;
                            audio.play()
                        }
                        this._toggleCaps()
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock)
                    })
                    break;

                case "enter":
                    keyElement.classList.add('keyboard__key--wide')
                    keyElement.innerHTML = createIconHTML('keyboard_return')

                    keyElement.addEventListener('click', () => {
                        if(this.properties.sound){
                            const audio = document.querySelector(`audio[data-key="enter"]`)
                            audio.currentTime = 0;
                            audio.play()
                        }
                        const input = document.querySelector('.keyboard-input')
                        input.focus()
                        this.properties.value += '\n'
                        this._triggerEvent('oninput');
                        
                    })
                    break;

                case "space":
                    keyElement.classList.add('keyboard__key--extra-wide')
                    keyElement.innerHTML = createIconHTML('space_bar')

                    keyElement.addEventListener('click', () => {
                        if(this.properties.sound){
                            const audio = document.querySelector(`audio[data-key="space"]`)
                            audio.currentTime = 0;
                            audio.play()
                            
                        }
                        input.focus()
                        this.properties.value += " "
                        this._triggerEvent('oninput');
                    })
                    break;

                case "done":
                    keyElement.classList.add('keyboard__key--wide')
                    keyElement.innerHTML = createIconHTML('check_circle')

                    keyElement.addEventListener('click', () => {
                        if(this.properties.sound){
                            const audio = document.querySelector(`audio[data-key="done"]`)
                            audio.currentTime = 0;
                            audio.play()
                        }
                        
                        this.close()
                        this._triggerEvent('onclose')
                    })
                    break;

                case "shift":
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable')
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_up')

                    keyElement.addEventListener('click', () => {
                        if(this.properties.sound){
                            const audio = document.querySelector(`audio[data-key="shift"]`)
                            audio.currentTime = 0;
                            audio.play()
                            
                        }
                        
                        this._toggleShift()
                        keyElement.classList.toggle('keyboard__key--active', this.properties.shift)
                    })
                    break;

                case "ru":
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable')
                    keyElement.innerHTML = createIconHTML('language')

                    keyElement.addEventListener('click', () => {
                        if(this.properties.sound){
                            const audio = document.querySelector(`audio[data-key="language"]`)
                            audio.currentTime = 0;
                            audio.play()
                        }
                        
                        this._toggleRu()
                        keyElement.classList.toggle('keyboard__key--active', this.properties.ru)
                    })
                    break;

                case "sounds":
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
                    keyElement.innerHTML = createIconHTML('audiotrack')

                    keyElement.addEventListener('click', () => {
                        this.makeSound()
                        keyElement.classList.toggle('keyboard__key--active', this.properties.sound)
                    })

                    break;

                case "microphone":
                    keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable')
                    keyElement.innerHTML = createIconHTML('mic')
                    
                    keyElement.addEventListener('click', () => {
                        this.speechRegognition();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.microphone)
                    })
                break;

                case "left":
                    keyElement.classList.add('keyboard__key--wide')
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_left')

                    keyElement.addEventListener('click', () => {
                        input.focus()
                        if(cursorPos !== 0){
                            cursorPos = input.selectionStart = input.selectionEnd = input.selectionStart - 1
                        }
                    })
                    
                    break;

                case "right":
                    keyElement.classList.add('keyboard__key--wide')
                    keyElement.innerHTML = createIconHTML('keyboard_arrow_right')

                    keyElement.addEventListener('click', () => {
                        input.focus()
                        cursorPos = input.selectionStart = input.selectionEnd = input.selectionStart + 1
                        
                    })
                    break;
                default: 
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        const input = document.querySelector('.keyboard-input')
                        input.focus()
                        /* input.textContent += "s" */
                        this.properties.value += keyElement.textContent/* `${this.properties.value.substring(0, cursorPos)}${keyElement.textContent}${this.properties.value.substring(cursorPos)}` */
                        this._triggerEvent('oninput')
                        console.log(`${this.properties.value.substring(0, cursorPos)}`)
                        
                    })
                    break;
            }
            fragment.appendChild(keyElement)


        if(insertLineBreak){
            fragment.appendChild(document.createElement('br'));
        }
        })
        return fragment
    },
    _toggleCaps(){
        this.properties.capsLock = !this.properties.capsLock

        for(const key of this.elements.keys){
            if(key.childElementCount === 0){
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase()
            }
        }
    },
    _toggleShift(){
        this.properties.shift = !this.properties.shift;
        

        if(this.properties.shift){
            for(const key of this.elements.keys){
                key.textContent.toUpperCase()
                
                if(key.textContent === '1'){
                    key.textContent = '!'
                }else if(key.textContent === '2'){
                    key.textContent = '@'
                }else if(key.textContent === '3'){
                    key.textContent = '#'
                }else if(key.textContent === '4'){
                    key.textContent = '$'
                }else if(key.textContent === '5'){
                    key.textContent = '%'
                }else if(key.textContent === '6'){
                    key.textContent = '^'
                }else if(key.textContent === '7'){
                    key.textContent = '&'
                }else if(key.textContent === '8'){
                    key.textContent = '*'
                }else if(key.textContent === '9'){
                    key.textContent = '('
                }else if(key.textContent === '0'){
                    key.textContent = ')'
                }else if(key.textContent === ','){
                    key.textContent = '<'
                }else if(key.textContent === '.'){
                    key.textContent = '>'
                }else if(key.textContent === '?'){
                    key.textContent = '/'
                }else if(key.textContent === '['){
                    key.textContent = '{'
                }else if(key.textContent === ']'){
                    key.textContent = '}'
                }else if(key.textContent === ';'){
                    key.textContent = ':'
                }else if(key.textContent === `'`){
                    key.textContent = '"'
                }
                
            }
        }else {
            for(const key of this.elements.keys){
                if(key.textContent === '!'){
                    key.textContent = '1'
                }else if(key.textContent === '@'){
                    key.textContent = '2'
                }else if(key.textContent === '#'){
                    key.textContent = '3'
                }else if(key.textContent === '$'){
                    key.textContent = '4'
                }else if(key.textContent === '%'){
                    key.textContent = '5'
                }else if(key.textContent === '^'){
                    key.textContent = '6'
                }else if(key.textContent === '&'){
                    key.textContent = '7'
                }else if(key.textContent === '*'){
                    key.textContent = '8'
                }else if(key.textContent === '('){
                    key.textContent = '9'
                }else if(key.textContent === ')'){
                    key.textContent = '0'
                }else if(key.textContent === '<'){
                    key.textContent = ','
                }else if(key.textContent === '>'){
                    key.textContent = '.'
                }else if(key.textContent === '/'){
                    key.textContent = '?'
                }else if(key.textContent === '{'){
                    key.textContent = '['
                }else if(key.textContent === '}'){
                    key.textContent = ']'
                }else if(key.textContent === ':'){
                    key.textContent = ';'
                }else if(key.textContent === `"`){
                    key.textContent = `'`
                }else if(key.textContent === '№'){
                    key.textContent = '3'
                }
            }
        }
        
        for (const key of this.elements.keys) {
            if(key.childElementCount === 0){
                if(key.textContent.toUpperCase() === key.textContent){
                    key.textContent = key.textContent.toLowerCase()
                }else{
                    key.textContent = key.textContent.toUpperCase()
                }
            }
            
        }
        
            
    },
    _toggleRu(){
        this.properties.ru = !this.properties.ru;

        if(this.properties.ru){
            for(const key of this.elements.keys){

                if(key.textContent === 'q'){
                    key.textContent = 'й'
                }else if(key.textContent === 'w'){
                    key.textContent = 'ц'
                }else if(key.textContent === 'e'){
                    key.textContent = 'у'
                }else if(key.textContent === 'r'){
                    key.textContent = 'к'
                }else if(key.textContent === 't'){
                    key.textContent = 'е'
                }else if(key.textContent === 'y'){
                    key.textContent = 'н'
                }else if(key.textContent === 'u'){
                    key.textContent = 'г'
                }else if(key.textContent === 'i'){
                    key.textContent = 'ш'
                }else if(key.textContent === 'o'){
                    key.textContent = 'щ'
                }else if(key.textContent === 'p'){
                    key.textContent = 'з'
                }else if(key.textContent === 'a'){
                    key.textContent = 'ф'
                }else if(key.textContent === 's'){
                    key.textContent = 'ы'
                }else if(key.textContent === 'd'){
                    key.textContent = 'в'
                }else if(key.textContent === 'f'){
                    key.textContent = 'а'
                }else if(key.textContent === 'g'){
                    key.textContent = 'п'
                }else if(key.textContent === 'h'){
                    key.textContent = 'р'
                }else if(key.textContent === 'j'){
                    key.textContent = 'о'
                }else if(key.textContent === 'k'){
                    key.textContent = 'л'
                }else if(key.textContent === 'l'){
                    key.textContent = 'д'
                }else if(key.textContent === 'z'){
                    key.textContent = 'я'
                }else if(key.textContent === 'x'){
                    key.textContent = 'ч'
                }else if(key.textContent === 'c'){
                    key.textContent = 'с'
                }else if(key.textContent === 'v'){
                    key.textContent = 'м'
                }else if(key.textContent === 'b'){
                    key.textContent = 'и'
                }else if(key.textContent === 'n'){
                    key.textContent = 'т'
                }else if(key.textContent === 'm'){
                    key.textContent = 'ь'
                }else if(key.textContent === ','){
                    key.textContent = 'б'
                }else if(key.textContent === '.'){
                    key.textContent = 'ю'
                }else if(key.textContent === '/'){
                    key.textContent = '.'
                }else if(key.textContent === '['){
                    key.textContent = 'х'
                }else if(key.textContent === ']'){
                    key.textContent = 'ъ'
                }else if(key.textContent === ';'){
                    key.textContent = 'ж'
                }else if(key.textContent === `'`){
                    key.textContent = 'э'
                }else if(key.textContent === 'Q'){
                    key.textContent = 'Й'
                }else if(key.textContent === 'W'){
                    key.textContent = 'Ц'
                }else if(key.textContent === 'E'){
                    key.textContent = 'У'
                }else if(key.textContent === 'R'){
                    key.textContent = 'К'
                }else if(key.textContent === 'T'){
                    key.textContent = 'Е'
                }else if(key.textContent === 'Y'){
                    key.textContent = 'Н'
                }else if(key.textContent === 'U'){
                    key.textContent = 'Г'
                }else if(key.textContent === 'I'){
                    key.textContent = 'Ш'
                }else if(key.textContent === 'O'){
                    key.textContent = 'Щ'
                }else if(key.textContent === 'P'){
                    key.textContent = 'З'
                }else if(key.textContent === '{'){
                    key.textContent = 'Х'
                }else if(key.textContent === '}'){
                    key.textContent = 'Ъ'
                }else if(key.textContent === 'A'){
                    key.textContent = 'Ф'
                }else if(key.textContent === 'S'){
                    key.textContent = 'Ы'
                }else if(key.textContent === 'D'){
                    key.textContent = 'В'
                }else if(key.textContent === 'F'){
                    key.textContent = 'А'
                }else if(key.textContent === 'G'){
                    key.textContent = 'П'
                }else if(key.textContent === 'H'){
                    key.textContent = 'Р'
                }else if(key.textContent === 'J'){
                    key.textContent = 'О'
                }else if(key.textContent === 'K'){
                    key.textContent = 'Л'
                }else if(key.textContent === 'L'){
                    key.textContent = 'Д'
                }else if(key.textContent === ':'){
                    key.textContent = 'Ж'
                }else if(key.textContent === `"`){
                    key.textContent = 'Э'
                }else if(key.textContent === 'Z'){
                    key.textContent = 'Я'
                }else if(key.textContent === 'X'){
                    key.textContent = 'Ч'
                }else if(key.textContent === 'C'){
                    key.textContent = 'С'
                }else if(key.textContent === 'V'){
                    key.textContent = 'М'
                }else if(key.textContent === 'B'){
                    key.textContent = 'И'
                }else if(key.textContent === 'N'){
                    key.textContent = 'Т'
                }else if(key.textContent === 'M'){
                    key.textContent = 'Ь'
                }else if(key.textContent === '<'){
                    key.textContent = 'Б'
                }else if(key.textContent === '>'){
                    key.textContent = 'Ю'
                }else if(key.textContent === '/'){
                    key.textContent = '.'
                }
            }
        }else {
            for(const key of this.elements.keys){
                
                if(key.textContent === 'й'){
                    key.textContent = 'q'
                }else if(key.textContent === 'ц'){
                    key.textContent = 'w'
                }else if(key.textContent === 'у'){
                    key.textContent = 'e'
                }else if(key.textContent === 'к'){
                    key.textContent = 'r'
                }else if(key.textContent === 'е'){
                    key.textContent = 't'
                }else if(key.textContent === 'н'){
                    key.textContent = 'y'
                }else if(key.textContent === 'г'){
                    key.textContent = 'u'
                }else if(key.textContent === 'ш'){
                    key.textContent = 'i'
                }else if(key.textContent === 'щ'){
                    key.textContent = 'o'
                }else if(key.textContent === 'з'){
                    key.textContent = 'p'
                }else if(key.textContent === 'ф'){
                    key.textContent = 'a'
                }else if(key.textContent === 'ы'){
                    key.textContent = 's'
                }else if(key.textContent === 'в'){
                    key.textContent = 'd'
                }else if(key.textContent === 'а'){
                    key.textContent = 'f'
                }else if(key.textContent === 'п'){
                    key.textContent = 'g'
                }else if(key.textContent === 'р'){
                    key.textContent = 'h'
                }else if(key.textContent === 'о'){
                    key.textContent = 'j'
                }else if(key.textContent === 'л'){
                    key.textContent = 'k'
                }else if(key.textContent === 'д'){
                    key.textContent = 'l'
                }else if(key.textContent === 'я'){
                    key.textContent = 'z'
                }else if(key.textContent === 'ч'){
                    key.textContent = 'x'
                }else if(key.textContent === 'с'){
                    key.textContent = 'c'
                }else if(key.textContent === 'м'){
                    key.textContent = 'v'
                }else if(key.textContent === 'и'){
                    key.textContent = 'b'
                }else if(key.textContent === 'т'){
                    key.textContent = 'n'
                }else if(key.textContent === 'ь'){
                    key.textContent = 'm'
                }else if(key.textContent === 'б'){
                    key.textContent = ','
                }else if(key.textContent === 'ю'){
                    key.textContent = '.'
                }else if(key.textContent === '.'){
                    key.textContent = '/'
                }else if(key.textContent === 'х'){
                    key.textContent = '['
                }else if(key.textContent === 'ъ'){
                    key.textContent = ']'
                }else if(key.textContent === 'ж'){
                    key.textContent = ';'
                }else if(key.textContent === `э`){
                    key.textContent = `'`
                }else if(key.textContent === 'Й'){
                    key.textContent = 'Q'
                }else if(key.textContent === 'Ц'){
                    key.textContent = 'W'
                }else if(key.textContent === 'У'){
                    key.textContent = 'E'
                }else if(key.textContent === 'К'){
                    key.textContent = 'R'
                }else if(key.textContent === 'Е'){
                    key.textContent = 'T'
                }else if(key.textContent === 'Н'){
                    key.textContent = 'Y'
                }else if(key.textContent === 'Г'){
                    key.textContent = 'U'
                }else if(key.textContent === 'Ш'){
                    key.textContent = 'I'
                }else if(key.textContent === 'Щ'){
                    key.textContent = 'O'
                }else if(key.textContent === 'З'){
                    key.textContent = 'P'
                }else if(key.textContent === 'Х'){
                    key.textContent = '{'
                }else if(key.textContent === 'Ъ'){
                    key.textContent = '}'
                }else if(key.textContent === 'Ф'){
                    key.textContent = 'A'
                }else if(key.textContent === 'Ы'){
                    key.textContent = 'S'
                }else if(key.textContent === 'В'){
                    key.textContent = 'D'
                }else if(key.textContent === 'А'){
                    key.textContent = 'F'
                }else if(key.textContent === 'П'){
                    key.textContent = 'G'
                }else if(key.textContent === 'Р'){
                    key.textContent = 'H'
                }else if(key.textContent === 'О'){
                    key.textContent = 'J'
                }else if(key.textContent === 'Л'){
                    key.textContent = 'K'
                }else if(key.textContent === 'Д'){
                    key.textContent = 'L'
                }else if(key.textContent === 'Ж'){
                    key.textContent = ':'
                }else if(key.textContent === `Э`){
                    key.textContent = `"`
                }else if(key.textContent === 'Я'){
                    key.textContent = 'Z'
                }else if(key.textContent === 'Ч'){
                    key.textContent = 'X'
                }else if(key.textContent === 'С'){
                    key.textContent = 'C'
                }else if(key.textContent === 'М'){
                    key.textContent = 'V'
                }else if(key.textContent === 'И'){
                    key.textContent = 'B'
                }else if(key.textContent === 'Т'){
                    key.textContent = 'N'
                }else if(key.textContent === 'Ь'){
                    key.textContent = 'M'
                }else if(key.textContent === 'Б'){
                    key.textContent = '<'
                }else if(key.textContent === 'Ю'){
                    key.textContent = '>'
                }else if(key.textContent === '.'){
                    key.textContent = '/'
                }
            }
        }       
    },
    makeSound(){
        this.properties.sound = !this.properties.sound
            for(const key of this.elements.keys){
                key.addEventListener('click', () => {
                    if(this.properties.sound){
                        if(key.childElementCount === 0){
                            if(this.properties.ru){
                                const audio = document.querySelector(`audio[data-key="russian"]`)
                                audio.currentTime = 0
                                audio.play()
                            }else{
                                const audio = document.querySelector(`audio[data-key="english"]`)
                                audio.currentTime = 0
                                audio.play()
                            }
                        }
                    }
                })
            }
    },
    speechRegognition(){
        this.properties.microphone = !this.properties.microphone

            const recognition = new SpeechRecognition();
            recognition.interimResults = false;
            if(this.properties.ru){
                recognition.lang = 'ru-RU'
            }else{
                recognition.lang = 'en-US'
            }

                recognition.addEventListener('result', e => {
                    const transcript = Array.from(e.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('')
        
                    this.properties.value += transcript
                    this._triggerEvent('oninput')
                    console.log(transcript)
    
                    
                })
                if(this.properties.microphone){
                    
                    recognition.start()
                    recognition.continuous = true;
                    console.log(this.properties.microphone)
                }
                else{
                    recognition.continuous = false
                    /* recognition.removeEventListener('end', recognition.start)
                    recognition.removeEventListener('result', e) */
                    recognition.stop()
                }
    },
    removeTransition(e){
        if(e.propertyName !== 'background-color'){
            return
        }
        this.classList.remove('change')
    },
    realKeyTap(){
        /* window.addEventListener('keypress', e => {
            this.properties.value += e.textContent
            console.log(e.textContent)
            for(const key of this.elements.keys){
                if(key.textContent === e.textContent){
                    key.classList.add('change')
                }
            }
        }) */
        
    }
}


/* window.addEventListener('keydown', (e) => {
    console.log(Keyboard.elements.keys[24].textContent.keyCode)
}) */

window.addEventListener('keydown', e => {
    const input = document.querySelector('.keyboard-input')
    input.focus()
    console.log()
    
    for(const element of Keyboard.elements.keys){
        if(e.key === 'Enter' && element.innerHTML.includes('keyboard_return')){
            element.classList.add('change')
            Keyboard.properties.value += '\n'
        }
        if(e.keyCode === 8 && element.innerHTML.includes('backspace')){
            element.classList.add('change')
        }
        if(e.keyCode === 16 && element.innerHTML.includes('keyboard_arrow_up')){
            element.classList.add('change')
            Keyboard._toggleShift()
            element.classList.toggle('keyboard__key--active')
        }
        if(e.keyCode === 20 && element.innerHTML.includes('keyboard_capslock')){
            element.classList.add('change')
            Keyboard._toggleCaps()
            element.classList.toggle('keyboard__key--active')
        }
        if(e.keyCode === 37 && element.innerHTML.includes('keyboard_arrow_left')){
            element.classList.add('change')
        }
        if(e.keyCode === 39 && element.innerHTML.includes('keyboard_arrow_right')){
            element.classList.add('change')
        }
        if(e.keyCode === 32 && element.innerHTML.includes('space_bar')){
            element.classList.add('change')
        }
        

        if(element.textContent === e.key){
            element.classList.add('change')
        }
        element.addEventListener('transitionend', Keyboard.removeTransition)
    }
})

window.addEventListener('DOMContentLoaded', function (){
    Keyboard.init();
    
})
window.SpeechRecognition = window.SpeechRegognition || window.webkitSpeechRecognition;