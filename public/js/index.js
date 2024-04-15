var contentImage = document.getElementById('contentImage');
var pointsHtml = document.getElementById('pointsHtml');
var attemptCountHtml = document.getElementById('attemptCountHtml');
var btnUpdatePlay = document.getElementById('btnUpdatePlay');
var eventualities = {
    pairStatus: false,
    storeImageOpen: [],
    figureImage: [],
    pointCounter: 0,
    attempts: 0
};
var pairStatus = eventualities.pairStatus;
var storeImageOpen = eventualities.storeImageOpen;
var figureImage = eventualities.figureImage;
var pointCounter = eventualities.pointCounter;
var attempts = eventualities.attempts;
var attemptCount = function () {
    attempts++;
    if (attemptCountHtml)
        attemptCountHtml.textContent = attempts.toString();
};
var enableImage = function (layer, figureIdentity) {
    layer.style.opacity = '0';
    if (figureIdentity) {
        storeImageOpen.push(figureIdentity);
        figureImage.push(layer);
    }
    if (!pairStatus) {
        pairStatus = true;
        return;
    }
    console.log(storeImageOpen);
    if (contentImage)
        contentImage.style.pointerEvents = 'none';
    for (var _i = 0, figureImage_1 = figureImage; _i < figureImage_1.length; _i++) {
        var item = figureImage_1[_i];
        item.classList.remove('pointer-event-none');
    }
    attemptCount();
    pairStatus = false;
    setTimeout(function () {
        contentImage === null || contentImage === void 0 ? void 0 : contentImage.querySelectorAll('figure div.layer').forEach(function (figure) {
            var figureActual = figure;
            figureActual.style.opacity = '1';
        });
    }, 700);
};
var mixImage = function () {
    if (contentImage) {
        var figureElements = Array.prototype.slice.call(contentImage.querySelectorAll('figure'));
        figureElements.sort(function () { return Math.random() - 0.5; });
        contentImage.textContent = '';
        figureElements.forEach(function (figureElement) {
            contentImage.appendChild(figureElement);
        });
    }
};
var countPoint = function () {
    pointCounter++;
    if (pointsHtml)
        pointsHtml.textContent = pointCounter.toString();
};
mixImage();
var validateImagesSame = function () {
    if (storeImageOpen.length != 2)
        return;
    var imageOpenOne = storeImageOpen[0];
    var imageOpenTow = storeImageOpen[1];
    if (imageOpenOne == imageOpenTow) {
        countPoint();
        contentImage === null || contentImage === void 0 ? void 0 : contentImage.querySelectorAll("figure[identity=\"".concat(storeImageOpen[0], "\"]")).forEach(function (figure) {
            var figureImage = figure.querySelector('.layer');
            setTimeout(function () {
                figureImage.style.backgroundColor = '#7d7d7d';
                figureImage.classList.add('pointer-event-none');
                figureImage.style.cursor = 'not-allowed';
            }, 700);
        });
    }
    setTimeout(function () {
        if (contentImage) {
            contentImage.style.pointerEvents = 'auto';
            // for (let item of figureImage) {
            //     item.style.pointerEvents = 'none'
            // }
        }
        storeImageOpen = [];
        figureImage = [];
    }, 700);
};
contentImage === null || contentImage === void 0 ? void 0 : contentImage.addEventListener('click', function (e) {
    var _a;
    var target = e.target;
    if (target.matches('.layer')) {
        var figureIdentity = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('identity');
        // const figure = target.parentElement;
        var figureString = figureIdentity || "";
        target.classList.add('pointer-event-none');
        enableImage(target, figureString);
        validateImagesSame();
    }
});
btnUpdatePlay === null || btnUpdatePlay === void 0 ? void 0 : btnUpdatePlay.addEventListener('click', function (e) {
    pairStatus = false;
    pointCounter = 0;
    attempts = 0;
    if (pointsHtml && attemptCountHtml) {
        pointsHtml.textContent = '0';
        attemptCountHtml.textContent = '0';
    }
    contentImage === null || contentImage === void 0 ? void 0 : contentImage.querySelectorAll('div.layer').forEach(function (layer) {
        var layerHtml = layer;
        console.log(layerHtml);
        mixImage();
        layerHtml.style.backgroundColor = 'rgb(59, 59, 59)';
        layerHtml.style.cursor = 'auto';
        layerHtml.classList.remove('pointer-event-none');
    });
});
