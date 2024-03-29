import i0 from './i0.js'
import objs from './objs/_objs.js'
import pages from './pages/_pages.js'

onresize = () => {
    i0.env('display', innerWidth < 800 ? 'mobile' : 'desktop')
    i0.broadcast('resize')
}
onresize()

i0.target('https://essencialsbackend.blbbrayan.repl.co')
i0.router(pages)