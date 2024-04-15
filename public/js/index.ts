
const contentImage: HTMLElement | null = document.getElementById('contentImage');
const pointsHtml: HTMLElement | null = document.getElementById('pointsHtml');
const attemptCountHtml: HTMLElement | null = document.getElementById('attemptCountHtml');
const btnUpdatePlay: HTMLElement | null = document.getElementById('btnUpdatePlay');

//Cuando se le de dos vece a la pantalla que no se le haga zoom 
interface Eventualities {
    pairStatus: Boolean;
    storeImageOpen: string[];
    figureImage: HTMLElement[];
    pointCounter: number;
    attempts: number;
}

const eventualities: Eventualities = {
    pairStatus: false,
    storeImageOpen: [],
    figureImage: [],
    pointCounter: 0,
    attempts: 0
}

let { pairStatus } = eventualities;
let { storeImageOpen } = eventualities;
let { figureImage } = eventualities;
let { pointCounter } = eventualities
let { attempts } = eventualities

const attemptCount = () => {
    attempts++
    if (attemptCountHtml) attemptCountHtml.textContent = attempts.toString();
}

const enableImage = (layer: HTMLElement, figureIdentity: string) => {

    layer.style.opacity = '0';

    if (figureIdentity) {
        storeImageOpen.push(figureIdentity);
        figureImage.push(layer)
    }

    if (!pairStatus) {
        pairStatus = true;
        return
    }

    if (contentImage) contentImage.style.pointerEvents = 'none';

    for (let item of figureImage) {
        item.classList.remove('pointer-event-none');
    }

    attemptCount();

    pairStatus = false;

    setTimeout(() => {
        contentImage?.querySelectorAll('figure div.layer').forEach(figure => {
            const figureActual = figure as HTMLElement
            figureActual.style.opacity = '1';
        })
    }, 700);
}

const mixImage = () => {
    if (contentImage) {
        const figureElements: Element[] = Array.prototype.slice.call(contentImage.querySelectorAll('figure'));
        figureElements.sort(() => Math.random() - 0.5);
        contentImage.textContent = '';
        figureElements.forEach(figureElement => {
            contentImage.appendChild(figureElement);
        });
    }
}

const countPoint = () => {
    pointCounter++
    if (pointsHtml) pointsHtml.textContent = pointCounter.toString();
}

mixImage();

const validateImagesSame = () => {
    if (storeImageOpen.length != 2) return
    const imageOpenOne = storeImageOpen[0]
    const imageOpenTow = storeImageOpen[1]
    if (imageOpenOne == imageOpenTow) {
        countPoint()
        contentImage?.querySelectorAll(`figure[identity="${storeImageOpen[0]}"]`)
            .forEach(figure => {
                const figureImage = figure.querySelector('.layer') as HTMLElement;
                setTimeout(() => {
                    figureImage.style.backgroundColor = '#7d7d7d';
                    figureImage.classList.add('pointer-event-none');
                    figureImage.style.cursor = 'not-allowed';
                }, 700);
            });
    }

    setTimeout(() => {
        if (contentImage) {
            contentImage.style.pointerEvents = 'auto';
            // for (let item of figureImage) {
            //     item.style.pointerEvents = 'none'
            // }
        }
        storeImageOpen = [];
        figureImage = [];
    }, 700);
}

contentImage?.addEventListener('click', e => {
    const target = e.target as HTMLElement
    if (target.matches('.layer')) {
        const figureIdentity = target.parentElement?.getAttribute('identity');
        const figureString = figureIdentity || "";
        target.classList.add('pointer-event-none');
        enableImage(target, figureString);
        validateImagesSame();
    }
})

btnUpdatePlay?.addEventListener('click', e => {
    pairStatus = false;
    pointCounter = 0;
    attempts = 0;
    if(pointsHtml && attemptCountHtml){
        pointsHtml.textContent = '0';
        attemptCountHtml.textContent = '0';
    }

    contentImage?.querySelectorAll('div.layer').forEach(layer=>{
        const layerHtml = layer as HTMLElement
        mixImage();
        layerHtml.style.backgroundColor = 'rgb(59, 59, 59)';
        layerHtml.style.cursor = 'pointer';
        layerHtml.classList.remove('pointer-event-none');
    })

})