import i0 from '../i0.js'
import tarot from './tarot.js'
import cardsService from '../services/cards.js'

i0.obj('tarot-reading', 
`
<section class="section long">
    <b class="header"><a class="header-link" href="#tarot">Tarot</a></b>
    <div i0="container" class="container center"></div>
    <div i0="reading" class="center"></div>
</section>
`,
async ui => {

    const removeRandom = (array) => {
        const random = Math.floor(Math.random() * array.length)
        return array.splice(random, 1)[0]
     };

    const tarotAr = Object.values(tarot())

    let cards = []

    const sameDay = (d1, d2) => d1.getFullYear() === d2.getFullYear() 
        && d1.getMonth() === d2.getMonth() 
        && d1.getDate() === d2.getDate()

    const initCards = () => {
        cards = [
            removeRandom(tarotAr),
            removeRandom(tarotAr),
            removeRandom(tarotAr)
        ]

        cards.forEach(card => {
            if((Math.random() * 100) <= 33.33)
                card.reversed = true
            if(i0.env('display') === 'mobile') card.view = true
            else card.reading = true
        })

        cardsService.push({
            date: new Date().toDateString(),
            cards: cards.map(c => { return {
                name: c.name.toLowerCase().split(' ').join(''),
                reversed: c.reversed || false
            }})
        })
    }

    if(!cardsService.get()[0]){
        initCards()
    } else {
        const save = cardsService.get()[0]
        if(sameDay(new Date(save.date), new Date())){
            cards = save.cards.map(c => {
                const card = tarot()[c.name]
                if(c.reversed == 'true') card.reversed = true
                if(i0.env('display') === 'mobile') card.view = true
                else card.reading = true
                return card
            })
        }
        else {
            cardsService.remove(save)
            initCards()
        }
    }
    
    cards.forEach(card => ui.container.appendChild(i0.load('tarot-card', card)))

    i0.onbroadcast('view-tarot', d => {
        ui.reading.innerHTML = ''
        const card = Object.assign({}, d)
        delete card.view
        card.reading = true
        ui.reading.appendChild(i0.load('tarot-card', card))
    })

})

export default {}