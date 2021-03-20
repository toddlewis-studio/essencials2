import i0 from '../i0.js'

i0.obj('tarot-card', 
`
    <div class="tarot-container">
        <p>
            <b i0="name" class="p-header"></b>
            <span i0="suit" class="cap"></span>
        </p>
        <b i0="descB"><p i0="desc" class="tarot-desc"></p></b>
        <b i0="adviseB" class="hidden"><p i0="advise" class="tarot-desc"></p></b>
        <img i0="img" class="tarot-img">
    </div>
`,
(ui, props) => {
    ui.name.innerText = `${props.name}`
    ui.suit.innerText = `${props.suit} #${props.i}`
    ui.img.src = `./assets/${props.suit}/${props.i}) ${props.name}.PNG`
    if(props.reading){
        ui.descB.classList.add('hidden')
        ui.adviseB.classList.remove('hidden')
        if(props.reversed){
            ui.advise.innerText = props.reverseAdvice
        } else {
            ui.advise.innerText = props.advice
        }
    } else {
        ui.desc.innerText = props.desc
    }
})

export default {}