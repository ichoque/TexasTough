//define event listeners and common buttons
menu01.addEventListener('click', async function () {
    swapMenu(1);
});

menu02.addEventListener('click', async function () {
    swapMenu(2);
});

homeIcon.addEventListener('click', async function () {
    displayHome();
});

vehicleIcon.addEventListener('click', async function () {
    // window.location.reload(true); 
    // in the future, this icon will load different data for the application 
});

adminIcon.addEventListener('click', async function () {
    // mainContainer.requestFullscreen();
    // mainContainer.style.width = "1200px";
    displayAdmin();
});

cartIcon.addEventListener('click', async function () {
    displayOrder();
});

showPass.addEventListener('click', async function () {
    togglePass();
});

adminExit.addEventListener('click', async function () {
    clearAdmin();
});

orderExit.addEventListener('click', async function () {
    clearAdmin();
});

menuArrowL.addEventListener('click', async function () {
    menuArrowL.disabled = true;
    slider(-mBtnDist, 7, 7, curMenu);
    await sleep(animTime.duration);
    menuArrowL.disabled = false;
});

menuArrowR.addEventListener('click', async function () {
    menuArrowR.disabled = true;
    slider(mBtnDist, mBtnDist, 7, 7, curMenu);
    await sleep(animTime.duration);
    menuArrowR.disabled = false;
});

homeSlideArrowR.addEventListener('click', async function () {
    homeSlideArrowR.disabled = true;
    slider(homeSlideDist, slideCount, 1, homeSlide);
    await sleep(animTime.duration);
    homeSlideArrowR.disabled = false;
});

homeSlideArrowL.addEventListener('click', async function () {
    homeSlideArrowL.disabled = true;
    slider(-homeSlideDist, slideCount, 1, homeSlide);
    await sleep(animTime.duration);
    homeSlideArrowL.disabled = false;
});

productArrowL.addEventListener('click', async function () {
    productArrowL.disabled = true;
    slider(-productDist, 5, 3, productBoxes);
    await sleep(animTime.duration);
    productArrowL.disabled = false;
});

productArrowR.addEventListener('click', async function () {
    productArrowR.disabled = true;
    slider(productDist, 5, 3, productBoxes);
    await sleep(animTime.duration);
    productArrowR.disabled = false;
});

packagedetailArrowL.addEventListener('click', async function () {
    productArrowL.disabled = true;
    slider(-packageDist, 5, 3, packageBoxesDetail);
    await sleep(animTime.duration);
    packagedetailArrowL.disabled = false;
});

packagedetailArrowR.addEventListener('click', async function () {
    packagedetailArrowR.disabled = true;
    slider(packageDist, 5, 3, packageBoxesDetail);
    await sleep(animTime.duration);
    packagedetailArrowR.disabled = false;
});

//touch / interactivity 

function menuTouch() {
    curMenu.addEventListener('touchstart', async function _menuSt(e) { tS = e.targetTouches[0].clientX; }, { passive: true });

    curMenu.addEventListener('touchmove', async function _menuMv(e) {
        tE = e.targetTouches[0].clientX;
    }, { passive: true })

    curMenu.addEventListener('touchend', async function _menuEn(e) {
        if (tE) {
            tE - tS > 0 ? slider(mBtnDist * 3, curMenuC - 2, 7, curMenu) : slider(-mBtnDist * 3, curMenuC - 2, 7, curMenu);
            subcatCont.style.visibility = 'hidden';
            subcatCont.innerHTML = '';
        }
        tS = tE = '';
    }, { passive: true })
}

function productTouch(dist, items) {
    productBoxes.addEventListener('touchstart', async function _prodSt(e) {
        tS = e.targetTouches[0].clientX;
    }, { passive: true });

    productBoxes.addEventListener('touchmove', async function _prodMv(e) {
        tE = e.targetTouches[0].clientX;
    }, { passive: true })

    productBoxes.addEventListener('touchend', async function _prodEn(e) {
        if (tE) {
            tE - tS > 0 ? slider(dist * 2, items, 6, productBoxes, 1) : slider(-dist * 2, items, 6, productBoxes, 1);
        }
        tS = tE = '';
    }, { passive: true })
}

function packageDetailTouch(dist, items) {
    packageBoxesDetail.addEventListener('touchstart', async function _packDSt(e) {
        tS = e.targetTouches[0].clientX;
    }, { passive: true });

    packageBoxesDetail.addEventListener('touchmove', async function _packDMv(e) {
        tE = e.targetTouches[0].clientX;
    }, { passive: true })

    packageBoxesDetail.addEventListener('touchend', async function _packDEn(e) {
        if (tE) {
            tE - tS > 0 ? slider(dist * 2, items, 6, packageBoxesDetail, 1) : slider(-dist * 2, items, 6, packageBoxesDetail, 1);
        }
        tS = tE = '';
    }, { passive: true })
}

function swapMenu(num) {
    curMenu.removeEventListener('touchstart', _menuSt, true);
    curMenu.removeEventListener('touchmove', _menuMv, true);
    curMenu.removeEventListener('touchend', _menuEn, true);
    menuArrows.style.visibility = 'hidden';

    switch (num) {
        case 1:
            if (curMenuN == 2) {
                menuRow02.style.visibility = 'hidden';
                menuRow01.style.visibility = 'visible';
                menuRow02.style.pointerEvents = 'none';
                menuRow01.style.pointerEvents = 'all';
                curMenuN = 1;
                curMenu = menuRow01;
                curMenuC = packages.length;

                menu01.classList.add('s-glow');
                menu02.classList.remove('s-glow');
            }
            break;
        case 2:
            if (curMenuN == 1) {
                menuRow01.style.visibility = 'hidden';
                menuRow02.style.visibility = 'visible';
                menuRow01.style.pointerEvents = 'none';
                menuRow02.style.pointerEvents = 'all';
                curMenuN = 2;
                curMenu = menuRow02;
                curMenuC = categories.length;
                menu02.classList.add('s-glow');
                menu01.classList.remove('s-glow');
            }
        default:
            break;
    }
    curMenuC > 8 ? menuArrows.style.visibility = 'visible' : '';

    menuTouch();
}

function slider(dst, itms, max, el, useCur) {
    let curPosS = getComputedStyle(el);
    let curPos = (Number(curPosS.left.slice(0, -2)));
    itms = (useCur) ? curItems : itms;
    if (itms > max) {
        let maxL = 0;
        let maxR = (itms - max) * -(Math.abs(dst));
        let newPos = (curPos + dst);
        if (newPos >= maxR && newPos <= maxL) {
            let anim = [{
                left: (curPos) + 'px'
            }, {
                left: (curPos + dst + (curPos % Math.abs(dst))) + 'px'
            }]

            el.animate(anim, animTime);
        }
    }
}

function flipBox(id) {
    let flip = document.getElementById(id);
    let anim;
    if (flip.getAttribute('flip') === 'false' || flip.getAttribute('flip') === null) {
        anim = [{ transform: 'rotateY(0)' }, { transform: 'rotateY(180deg)' }];
        flip.setAttribute('flip', 'true');
    } else {
        anim = [{ transform: 'rotateY(180deg)' }, { transform: 'rotateY(0deg)' }];
        flip.setAttribute('flip', 'false');
    }
    document.getElementById(id).animate(anim, animFlip);
}

function fadeBox(id) {
    let fade = document.getElementById(id);
    let anim;
    if (fade.getAttribute('fade') === 'false' || fade.getAttribute('fade') === null) {
        anim = [{ opacity: 0 }, { opacity: 1 }];
        fade.setAttribute('fade', 'true');
    } else {
        anim = [{ opacity: 1 }, { opacity: 0 }];
        fade.setAttribute('fade', 'false');
    }
    document.getElementById(id).animate(anim, animTime);
}

// UI build 
function buildMenuProducts() { // build product menu
    for (let i = 0; i < categories.length; i++) {
        let newButton = menuRow02.appendChild(document.createElement('div'));
        newButton.classList.add('menu-button');
        newButton.setAttribute('id', categories[i]);
        newButton.textContent = categories[i].toUpperCase();

        //build button links
        let subcatList = subcats.filter(obj => obj.cat.trim() === categories[i]);
        if (subcatList.length > 1) {
            newButton.setAttribute('onclick', `displaySubcat('${categories[i]}','${subcatList.map(o => o.sub)}')`);
        } else {
            newButton.setAttribute('onclick', `displayProduct('${categories[i]}')`);
        }
    }
}

function buildMenuPackages() { // build packages menu
    for (let i = 0; i < packages.length; i++) {
        let newButton = menuRow01.appendChild(document.createElement('div'));
        newButton.classList.add('menu-button');
        newButton.setAttribute('id', packages[i].name);
        newButton.setAttribute('onclick', `displayPackage('${packages[i].name}')`);
        newButton.textContent = packages[i].name.toUpperCase();
    }
}

function highlightMenu(menu) { //highlight the bottom menu button on click
    let menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(el => {
        el.classList.remove('m-glow');
    });
    document.getElementById(menu).classList.add('m-glow');
}

function buildHomeSlides() {
    let counter = 0;
    slidesList.forEach(el => {
        let newSlide = homeSlide.appendChild(document.createElement('li'));
        newSlide.classList.add('home-slide-img');
        newSlide.setAttribute('style',"background-image: url("+el+")")
        //let newSlideImg = newSlide.appendChild(document.createElement('img'));
        //newSlideImg.src = el;
        counter++;
    });
    slideCount = counter;
    homeSlide.style.width = window.innerWidth * slideCount + 'px';
}

// UI display

function displayHome() {
    packagePage.style.visibility = 'hidden';
    productPage.style.visibility = 'hidden';
    orderPage.style.visibility = 'hidden';
    homePage.style.visibility = 'visible';
    adminPage.style.visibility = 'hidden';
    pinBox.style.visibility = 'hidden';
    productArrowR.style.visibility = 'hidden';
    productArrowL.style.visibility = 'hidden';
    let menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(el => {
        el.classList.remove('m-glow');
    });
}

function displayAdmin() {
    pinInput.value = '';
    adminPage.style.visibility = 'visible';
    let currentTime = Date.now();
    if ((pinSuccess + 60) > Number(currentTime)) {
        displayAdminMenu();
    } else { pinBox.style.visibility = 'visible'; }
    productArrowR.style.visibility = 'hidden';
    productArrowL.style.visibility = 'hidden';
    let menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(el => {
        el.classList.remove('m-glow');
    });

}

function displayAdminMenu() { //correct PIN   
    pinSuccess = Date.now();
    pinInput.value = '';
    pinBox.style.visibility = 'hidden';
    adminMenu.style.visibility = 'visible';

    // display stored values
    pricingCF == 'consumer' ? document.getElementById('consumerPrice').checked = true : pricingCF == 'fleet' ? document.getElementById('fleetPrice').checked = true : document.getElementById('hidePrice').checked = true;
    paymentsMT == 'monthly' ? document.getElementById('monthlyPayment').checked = true : document.getElementById('totalPayment').checked = true;
    document.getElementById('APR').value = APR;
    document.getElementById('numMonths').value = numMonths;
    document.getElementById('downPayment').value = downPayment;
    // document.getElementById('name').value = customerName;
    document.getElementById('tax').value = salesTax;
}

function displayOrder() {
    if (cart.length > 0) {
        orderPage.style.visibility = 'visible';
        orderBody.innerHTML = '';

        let newOrder = orderBody.appendChild(document.createElement('div'));
        newOrder.classList.add('order-items');

        let priceTotal = 0;

        for (let i = 0; i < cart.length; i++) {
            newDiv = newOrder.appendChild(document.createElement('div'));
            newDiv.classList.add('order-item');

            newDiv2 = newDiv.appendChild(document.createElement('div'));
            newDiv2.classList.add('order-img');
            imgThumbSrc = new Image();
            imgThumbSrc.src = cart[i].img;
            newDiv2.style.backgroundImage = `url(${imgThumbSrc.src})`;

            newDiv2 = newDiv.appendChild(document.createElement('div'));
            newDiv2.classList.add('order-name');
            newDiv2.textContent = cart[i].name;

            newDiv2 = newDiv.appendChild(document.createElement('div'));
            newDiv2.classList.add('order-price');
            newDiv2.textContent = (pricingCF !== 'hide') ? cur + cart[i].price : '';
            priceTotal += Number(cart[i].price);

            newDiv2 = newDiv.appendChild(document.createElement('div'));
            newDiv2.classList.add('order-delete-icon');
            newDiv2.setAttribute('id', i);
            newDiv2.setAttribute('onclick', `deleteItem('${i}')`);
        }

        newOrder = orderBody.appendChild(document.createElement('div'));
        newOrder.classList.add('order-totals');

        let subTotalText = ['subtotal', 'tax', 'total'];
        if (priceTotal > 0) {
            for (let i = 0; i < subTotalText.length; i++) {
                newDiv = newOrder.appendChild(document.createElement('div'));
                newDiv.classList.add('order-listtotals');
                newDiv2 = newDiv.appendChild(document.createElement('div'));
                newDiv2.classList.add('order-subtotals');
                newDiv2.textContent = subTotalText[i];
                newDiv2 = newDiv.appendChild(document.createElement('div'));
                newDiv2.classList.add('order-sub-price'); //fix css here

                switch (i) {
                    case 0:
                        newDiv2.textContent = (pricingCF !== 'hide') ? cur + priceTotal : '';
                        break;
                    case 1:
                        newDiv2.textContent = (pricingCF !== 'hide') ? cur + ((priceTotal * (salesTax / 100)).toFixed(0)) : '';
                        break;
                    case 2:
                        newDiv2.textContent = (pricingCF !== 'hide') ? cur + (Number(priceTotal) + Number((priceTotal * (salesTax / 100)).toFixed(0))) : '';
                        break;
                    default:
                        break;
                }
            }
        }
    }
}

function displayProduct(prod, subcat) { //display a la carte products
    subcatCont.style.visibility = 'hidden';
    subcatCont.innerHTML = '';
    productBoxes.removeEventListener('touchstart', _prodSt, true);
    productBoxes.removeEventListener('touchmove', _prodMv, true)
    productBoxes.removeEventListener('touchend', _prodEn, true)

    highlightMenu(prod);
    packagePage.style.visibility = 'hidden';
    productPage.style.visibility = 'visible';
    adminPage.style.visibility = 'hidden';
    orderPage.style.visibility = 'hidden';
    homePage.style.visibility = 'hidden';
    packagedetailArrowR.style.visibility = 'hidden';
    packagedetailArrowL.style.visibility = 'hidden';

    let curProducts = [];
    if (subcat) {
        productsD.forEach(el => {
            if (el[prodCat] && el[prodCat].v == prod && el[prodSub].v == subcat) { curProducts.push(el) };
        });
        productTitle.innerHTML = subcat.toUpperCase();
    } else {
        productsD.forEach(el => {
            if (el[prodCat] && el[prodCat].v == prod) { curProducts.push(el) }
        });
        productTitle.innerHTML = prod.toUpperCase();
    }

    //resort data by name
    curProducts.sort((a, b) => {
        let fa = a[prodName].v.toLowerCase(),
            fb = b[prodName].v.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    //console.log(curProducts);
    let curPosS = getComputedStyle(productBoxes);
    let curPos = (Number(curPosS.left.slice(0, -2)));

    if (curPos != 0) {
        let anim = [{ left: (curPos) + 'px' }, { left: '0px' }]
        productBoxes.animate(anim, animTime);
    }
    productBoxes.innerHTML = '';
    productBoxesC.style.width = '1420px';

    if (curProducts.length < 7) { //hide arrows if not needed
        productArrowR.style.visibility = 'hidden';
        productArrowL.style.visibility = 'hidden';
        (curProducts.length < 5) ? productBoxesC.style.width = '980px' : '';
    } else {
        productArrowR.style.visibility = 'visible';
        productArrowL.style.visibility = 'visible';
    }
    curProducts.forEach(el => { //setup box
        let newProduct = productBoxes.appendChild(document.createElement('div'));
        newProduct.classList.add('product-box');
        newProduct.setAttribute('id', el[prodID].v);

        if (el[prodDesc]) { //add flip card overlay
            newFlip = newProduct.appendChild(document.createElement('div'));
            newFlip.classList.add('product-box-flip');
            newFlip.setAttribute('onclick', `flipBox('${el[prodID].v}')`);
            newFlip.setAttribute('flip', 'false');
        }

        //box front 
        newDiv = newProduct.appendChild(document.createElement('div'));
        newDiv.classList.add('product-box-front');

        newDiv2 = newDiv.appendChild(document.createElement('div'));
        newDiv2.classList.add('product-title');
        el[prodName] ? newDiv2.textContent = el[prodName].v : '';

        if (el[prodDesc]) { //flip icon
            newDiv2 = newDiv.appendChild(document.createElement('div'));
            newDiv2.classList.add('flip-icon');
        }

        newDiv2 = newDiv.appendChild(document.createElement('div'));
        newDiv2.classList.add('product-box-img');

        let newDivImg = newDiv2.appendChild(document.createElement('div'));

        newDivImg.classList.add('product-box-img-img');
        newDivImg.setAttribute('id', el[prodID].v + '-img');
        newDivImgSrc = new Image();
        el[prodImg] ? newDivImgSrc.src = el[prodImg].v : newDivImgSrc.src = defaultProductImg;
        newDivImg.style.backgroundImage = `url(${newDivImgSrc.src})`;

        //image thumbnails if more than one image is available
        if (el[prodImg2]) {

            let imgThumb = newDiv2.appendChild(document.createElement('div'));
            imgThumb.classList.add('product-box-img-thumb');
            imgThumbSrc = new Image();
            imgThumbSrc.src = el[prodImg].v
            imgThumb.style.backgroundImage = `url(${imgThumbSrc.src})`;
            imgThumb.setAttribute('onclick', `displayThumb('${el[prodID].v}-img','${el[prodImg].v}')`);


            imgThumb = newDiv2.appendChild(document.createElement('div'));
            imgThumb.classList.add('product-box-img-thumb');
            imgThumbSrc = new Image();
            imgThumbSrc.src = el[prodImg2].v
            imgThumb.style.backgroundImage = `url(${imgThumbSrc.src})`;
            imgThumb.setAttribute('onclick', `displayThumb('${el[prodID].v}-img','${el[prodImg2].v}')`);

        } else { // add empty thumb section?
            let imgThumb = newDiv2.appendChild(document.createElement('div'));
            imgThumb.classList.add('product-box-img-thumb');
            imgThumb.style.border = '0px';

        }
        if (el[prodImg3]) {

            let imgThumb = newDiv2.appendChild(document.createElement('div'));
            imgThumb.classList.add('product-box-img-thumb');
            imgThumbSrc = new Image();
            imgThumbSrc.src = el[prodImg3].v
            imgThumb.style.backgroundImage = `url(${imgThumbSrc.src})`;
            imgThumb.setAttribute('onclick', `displayThumb('${el[prodID].v}-img','${el[prodImg3].v}')`);
        }

        newDiv3 = newDiv.appendChild(document.createElement('div'));
        newDiv3.classList.add('product-footer');
        newDiv2 = newDiv3.appendChild(document.createElement('div'));
        newDiv2.classList.add('product-details-button');
        if (cart.find(o => o.id === el[prodID].v)) { newDiv2.textContent = "ADDED" } else {
            newDiv2.textContent = "ADD"
        }

        // Add to cart button
        newDiv2.setAttribute('id', el[prodID].v + '-but');
        newDiv2.setAttribute('onclick', `saveCart('${el[prodID].v}',${curPackage.variants[0].id}, '${el[prodName].v}' ,'${el[prodPriceC].v}','prod','${el[prodImg].v}','${el[prodID].v}-but')`);

        //price in footer
        newDiv2 = newDiv3.appendChild(document.createElement('div'));
        newDiv2.classList.add('product-price');

        if (el[prodPriceC]) {
            if (paymentsMT == 'monthly') {
                newDiv2.textContent = (pricingCF !== 'hide') ? cur + monthlyPayment(el[prodPriceC].v - downPayment, numMonths, APR).toFixed(0) + '/mo' : '';
            } else {
                newDiv2.textContent = (pricingCF !== 'hide') ? cur + Math.round(el[prodPriceC].v) : '';
            }
        }

        //back of card
        newDiv = newProduct.appendChild(document.createElement('div'));
        newDiv.classList.add('product-box-back');
        newDiv2 = newDiv.appendChild(document.createElement('div'));
        newDiv2.classList.add('product-title');
        el[prodName] ? newDiv2.textContent = el[prodName].v : '';
        newDiv2 = newDiv.appendChild(document.createElement('div'));
        newDiv2.classList.add('product-description');
        el[prodDesc] ? newDiv2.innerHTML = el[prodDesc].v : '.';

    });
    curItems = (curProducts.length - 2);
    (curProducts.length > 6) ? productTouch(productDist, curProducts.length / 2) : '';
}

function displayPackage(pack) { //show packages
    curScreen = { package: pack, menu: null };
    highlightMenu(pack);
    packagePage.style.visibility = 'visible';
    productPage.style.visibility = 'hidden';
    orderPage.style.visibility = 'hidden';
    homePage.style.visibility = 'hidden';
    adminPage.style.visibility = 'hidden';
    productArrowR.style.visibility = 'hidden';
    productArrowL.style.visibility = 'hidden';
    packagedetailArrowR.style.visibility = 'hidden';
    packagedetailArrowL.style.visibility = 'hidden';
    packageTitle.innerHTML = pack.toUpperCase();
    let curPackages = packagesData[pack];

    packageBoxes.innerHTML = '';
    curPackages.length == 4 ? (packageBoxesC.style.width = '1720px', packageBoxesC.style.left = '160px') : (packageBoxesC.style.width = '1420px', packageBoxesC.style.left = '412px');
    console.log(curPackages)
    curPackages.forEach(el => {
        let newPackage = packageBoxes.appendChild(document.createElement('div'));
        newPackage.classList.add('package-box');
        newPackage.setAttribute('id', el.id);

        let newDivImg = newPackage.appendChild(document.createElement('div'));

        newDivImg.classList.add('package-box-img');
        newDivImg.setAttribute('id', el.id + '-img');
        newDivImgSrc = new Image();
        el.images ? newDivImgSrc.src = el.images[0] : newDivImgSrc.src = defaultProductImg;
        newDivImg.style.backgroundImage = `url(${newDivImgSrc.src})`;

        newDiv = newPackage.appendChild(document.createElement('div'));
        newDiv.classList.add('package-box-text');

        newDiv2 = newDiv.appendChild(document.createElement('div'));
        newDiv2.classList.add('package-title');
        el.name ? newDiv2.textContent = el.name : '';

        newDiv2 = newDiv.appendChild(document.createElement('div'));
        newDiv2.classList.add('package-description');
        el.html ? newDiv2.textContent = extractHTML(el.html, 'p') : '.';

        newList = newDiv.appendChild(document.createElement('ul'));
        newList.classList.add('package-details');

        newDiv2 = newDiv.appendChild(document.createElement('div'));
        newDiv2.classList.add('package-price');

        let totalPr = el.variants[0].price;

        if (paymentsMT == 'monthly') {
            newDiv2.textContent = (pricingCF !== 'hide') ? cur + monthlyPayment(totalPr - downPayment, numMonths, APR).toFixed(0) + '/mo' : '';
        } else {
            newDiv2.textContent = (pricingCF !== 'hide') ? cur + totalPr : '';
        }

        newDiv2 = newDiv.appendChild(document.createElement('div'));
        newDiv2.classList.add('package-savings');
        newDiv2.textContent = (pricingCF !== 'hide' && el.variants[0].compare) ? 'Bundle savings of: ' + cur + Math.abs(el.variants[0].compare - Math.round(totalPr)).toFixed(0) : '';

        newDiv2 = newDiv.appendChild(document.createElement('div'));
        newDiv2.classList.add('package-buttons');
        newDiv3 = newDiv2.appendChild(document.createElement('div'));
        newDiv3.classList.add('package-details-button-detail');
        newDiv3.setAttribute('onclick', `displayPackageDetail('${pack}','${el.id}')`);
        newDiv3 = newDiv2.appendChild(document.createElement('div'));
        newDiv3.classList.add('package-details-button-add');
        if (cart.find(o => o.id === el.id)) { newDiv3.textContent = "ADDED" } else {
            newDiv3.textContent = "ADD"
        }
        newDiv3.setAttribute('id', el.id + '-but');
        newDiv3.setAttribute('onclick', `saveCart('${el.id}',${el.variants[0].id}, '${el.name}' ,'${totalPr}','pack', '${el.images[0]}','${el.id}-but')`);
    });
}

function displayPackageDetail(pack, packid) { //show package products

    packageDetailBox.innerHTML = '';
    productPage.style.visibility = 'hidden';
    packageDetailPage.style.visibility = 'visible';
    adminPage.style.visibility = 'hidden';
    orderPage.style.visibility = 'hidden';
    homePage.style.visibility = 'hidden';
    packagedetailArrowR.style.visibility = 'hidden';
    packagedetailArrowL.style.visibility = 'hidden';
    detailTitle.style.zIndex = 20;
    detailTitle.style.top = '-55px';
    packageDetailTitle.innerHTML = pack.toUpperCase();

    let curPackage = (packagesData[pack].find(o => o.id === packid));

    const productDiv = packageDetailBox.appendChild(document.createElement('div'));
    productDiv.classList.add('package-detail-text');

    const productTitle = packageDetailBox.appendChild(document.createElement('div'));
    productTitle.classList.add('package-detail-title');
    productTitle.textContent = curPackage.name;
    packageDetailBox.appendChild(productTitle);

    const SKUdetail = packageDetailBox.appendChild(document.createElement('div'));
    SKUdetail.classList.add('package-detail-sku');
    SKUdetail.textContent = `SKU: ${curPackage.variants[0].sku}`;
    packageDetailBox.appendChild(SKUdetail);

    newDiv2 = packageDetailBox.appendChild(document.createElement('div'));
    newDiv2.classList.add('package-detail-price');

    let totalPr = curPackage.variants[0].price;

    if (paymentsMT == 'monthly') {
        newDiv2.textContent = (pricingCF !== 'hide') ? cur + monthlyPayment(totalPr - downPayment, numMonths, APR).toFixed(0) + '/mo' : '';
    } else {
        newDiv2.textContent = (pricingCF !== 'hide') ? cur + totalPr : '';
    }

    newDiv2 = packageDetailBox.appendChild(document.createElement('div'));
    newDiv2.classList.add('package-detail-savings');
    newDiv2.textContent = (pricingCF !== 'hide' && curPackage.variants[0].compare) ? 'Bundle savings of: ' + cur + Math.abs(curPackage.variants[0].compare - Math.round(totalPr)).toFixed(0) : '';

    newDiv2 = packageDetailBox.appendChild(document.createElement('div'));
    newDiv2.classList.add('package-detail-buttons');
    newDiv3 = newDiv2.appendChild(document.createElement('div'));
    newDiv3.classList.add('package-details-button-add');
    if (cart.find(o => o.id === curPackage.id)) { newDiv3.textContent = "ADDED" } else {
        newDiv3.textContent = "ADD"
    }

    newDiv3.setAttribute('id', curPackage.id + '-det-but');
    newDiv3.setAttribute('onclick', `saveCart('${curPackage.id}', ${curPackage.variants[0].id}, '${curPackage.name}' ,'${totalPr}','pack', '${curPackage.images[0]}','${curPackage.id}-det-but')`);



    //html Container handling
    const htmlDiv = document.createElement('div');
    htmlDiv.innerHTML = curPackage.html;
    const h1Element = htmlDiv.querySelector('h1');
    if (h1Element) {
        h1Element.parentNode.removeChild(h1Element);
    }
    const elementsWithStyles = htmlDiv.querySelectorAll('[style]');
    elementsWithStyles.forEach((element) => {
        element.removeAttribute('style');
    });
    const paragraphs = htmlDiv.querySelectorAll('p');
    paragraphs.forEach((paragraph) => {
        if (paragraph.textContent.trim() === '&nbsp;' || paragraph.textContent.trim() === '') {
            paragraph.parentNode.removeChild(paragraph);
        }
    });
    productDiv.appendChild(htmlDiv);

    const imagesDiv = document.createElement('div');
    imagesDiv.classList.add('package-detail-images');

    const largeImageDiv = imagesDiv.appendChild(document.createElement('div'));
    largeImageDiv.classList.add('package-detail-large-image');
    const largeImage = imagesDiv.appendChild(document.createElement('img'));
    largeImage.style.width = '640px';
    largeImageDiv.appendChild(largeImage);

    const thumbnailsDiv = imagesDiv.appendChild(document.createElement('div'));
    thumbnailsDiv.classList.add('package-detail-thumbnails');

    curPackage.images.forEach((image, index) => {
        const totalAvailableWidth = 640;
        const gapWidth = 8;
        const maxThumbnailWidth = 140;
        const minThumbnailWidth = 60;

        const totalGapSpace = gapWidth * (curPackage.images.length - 1);

        const availableWidthForThumbnails = totalAvailableWidth - totalGapSpace;

        let thumbnailWidth = Math.min(Math.max(availableWidthForThumbnails / curPackage.images.length, minThumbnailWidth), maxThumbnailWidth);

        const thumbnail = imagesDiv.appendChild(document.createElement('img'));
        thumbnail.classList.add('package-detail-thumbnail');
        thumbnail.src = image;
        thumbnail.style.width = `${thumbnailWidth}px`;
        thumbnail.addEventListener('click', () => {
            largeImage.src = image;
        });
        thumbnailsDiv.appendChild(thumbnail);

        if (index === 0) {
            largeImage.src = image;
        }
    });


    packageDetailBox.appendChild(imagesDiv);

    fadeBox('packageDetailPage');

}

function displayThumb(id, image) {
    document.getElementById(id).style.backgroundImage = `url(${image})`;
}

function displaySubcat(cat, subcat) {
    // console.log(cat);
    //console.log(subcat);
    //convert subcat to an array and sort
    subcat = subcat.split(',');
    subcat.sort((a, b) => {
        let fa = a.toLowerCase(),
            fb = b.toLowerCase();
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    //get computed position of button and current scale to avoid 'double-scale' placement
    let catButton = document.getElementById(cat);
    let curScale = mainContainer.style.transform;
    let startIndex = curScale.indexOf('(') + 1;
    let endIndex = curScale.lastIndexOf(')');
    curScale = curScale.substring(startIndex, endIndex);
    let ht = (subcat.length * 55) + 65; //height of buttons + one extra
    let pX = catButton.getBoundingClientRect().left / curScale;
    let pY = (catButton.getBoundingClientRect().top - (ht * curScale)) / curScale;
    displayProduct(cat);
    subcatCont.style.left = pX + 'px';
    subcatCont.style.top = pY + 'px';
    subcatCont.style.height = ht + 'px';

    //build subMenu
    let newSubMenu = subcatCont.appendChild(document.createElement('div'));
    newSubMenu.classList.add('subcatMenu');
    newSubMenu.style.height = ht + 'px';

    let newSubItem = newSubMenu.appendChild(document.createElement('div'));
    newSubItem.classList.add('subcatMenuButton');
    newSubItem.textContent = "All";
    newSubItem.setAttribute('onclick', `displayProduct('${cat}')`);

    for (let i = 0; i < subcat.length; i++) {
        newSubItem = newSubMenu.appendChild(document.createElement('div'));
        newSubItem.classList.add('subcatMenuButton');
        newSubItem.textContent = subcat[i];
        newSubItem.setAttribute('onclick', `displayProduct('${cat}','${subcat[i]}')`);
    }
    let anim = [{ top: ht + 'px' }, { top: '0px' }]

    setTimeout(() => { //display menu after short delay
        newSubMenu.animate(anim, animTime);
        subcatCont.style.visibility = 'visible';
    }, 400);

    setTimeout(() => { //hide menu
        let anim = [{ top: '0px' }, { top: ht + 'px' }]
        newSubMenu.animate(anim, animTime);
    }, 5000);
}

function deleteItem(n) {
    cart.splice(n, 1);
    if (cart.length > 0) {
        cartNotification.innerHTML = cart.length;
        cartNotification.style.display = 'block';
        displayOrder();
    } else { clearAdmin(); }
}

function clearAdmin() {
    pinKeyboard.clearInput();
    showNotification();
    adminPage.style.visibility = 'hidden';
    pinBox.style.visibility = 'hidden';
    adminMenu.style.visibility = 'hidden';
    orderPage.style.visibility = 'hidden';
    productArrowR.style.visibility = 'hidden';
    productArrowL.style.visibility = 'hidden';
    let menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(el => {
        el.classList.remove('m-glow');
    });
    if (curScreen.package) { displayPackage(curScreen.package) }
}

async function closeDetails() {
    fadeBox('packageDetailPage');
    await sleep(animTime.duration);
    packageDetailPage.style.visibility = 'hidden';

    //  packageBoxesDetail.removeEventListener('touchstart', _packDSt, true);
    //  packageBoxesDetail.removeEventListener('touchmove', _packDMv, true)
    //   packageBoxesDetail.removeEventListener('touchend', _packDEn, true)
    //   packagedetailArrowR.style.visibility = 'hidden';
    //  packagedetailArrowL.style.visibility = 'hidden';
    // packageDetailPackageBox.innerHTML = '';
    //   packageDetailMedia.innerHTML = '';
    //   packageDetailMedia.style.backgroundImage = '';
    // packageDetailMedia.style.top = '110px';

}

menuTouch();