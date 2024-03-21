// Data Loading and Parsing ////////////////////////////////////////////////

function loadShopifyData() {
    shopifyCollections.forEach(collection => {
        let url = shopifyUrl + collection.id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                packagesData[collection.name] = data.products.map(product => {
                    const imageSources = product.images.map(image => image.src);
                    const variants = product.variants
                        .map(variant => ({
                            name: variant.title,
                            price: variant.price,
                            compare: variant.compare_at_price,
                            sku: variant.sku,
                            id: variant.id.toString()
                        }))
                        .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                    return {
                        id: product.id.toString(),
                        name: product.title,
                        images: imageSources,
                        html: product.body_html,
                        variants: variants
                    };
                });
            })
            .catch(error => {
                console.error('Error fetching data from collection:', collection.name, error);
            });
    });
}

function extractHTML(htmlString, tagName) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlString, 'text/html');
    var tag = doc.querySelector(tagName);
    return tag ? tag.textContent : '';
}

//missing image handling
document.addEventListener('error', function (event) {
    if (event.target.tagName.toLowerCase() !== 'img') return;
    event.target.src = defaultProductImg;
}, true);

//scale, resize and ready functions ///////////////////////////////
docReady(function () {
    resize();
    loadShopifyData();
    buildMenuPackages();
    buildHomeSlides();
});

addEventListener('resize', (event) => {
    resize(); //resize window on browser size change
});

function resize() {
    //document.getElementById('container').style.transform = "scale(" + (window.innerWidth / 1920) + ")";
}

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function onChange(input) {
    console.log(input);
    pinInput.value = input;
    input = '';
}

function onKeyPress(button) {
    if (button == "{enter}") {
        pinInput.value == pinCode && pinCount < 20 ? displayAdminMenu() : pinCount++;
    }
    pinCount > 19 ? console.log('maximum PIN tries') : '';
}

function togglePass() {
    pinInput.type == 'text' ? pinInput.type = 'password' : pinInput.type = 'text';
}

async function saveSettings() {
    pricingCF = document.querySelector('input[name="pricingCF"]:checked').value;
    paymentsMT = document.querySelector('input[name="paymentsMT"]:checked').value
    APR = document.getElementById('APR').value;
    numMonths = document.getElementById('numMonths').value;
    downPayment = document.getElementById('downPayment').value;
    //customerName = document.getElementById('name').value;
    salesTax = document.getElementById('tax').value;

    for (let i = 0; i < 3; i++) {
        document.getElementById('saveButton').textContent = 'Saving' + dot.repeat(i);
        await sleep(500);
    }

    clearAdmin();
    document.getElementById('saveButton').textContent = 'Save Settings';
}

async function saveCart(id, variant, name, price, type, img, button) {
    cart.push({
        'id': id,
        'variant': variant,
        'name': name,
        'price': Number(price).toFixed(0),
        'type': type,
        'img': img,
    });

    showNotification();

    if (button) {
        for (let i = 0; i < 3; i++) {
            document.getElementById(button).textContent = 'ADDING' + dot.repeat(i);
            await sleep(500);
        }
        document.getElementById(button).textContent = 'ADDED';
    }
}

function showNotification() {
    if (cart.length > 9) {
        cartNotification.innerHTML = '+';
        cartNotification.style.display = 'block';
    } else if (cart.length > 0) {
        cartNotification.innerHTML = cart.length;
        cartNotification.style.display = 'block';
    } else {
        cartNotification.innerHTML = '';
        cartNotification.style.display = 'none';
    }
}

async function clearCart() {
    prevCart = [...cart];
    for (let i = 0; i < 3; i++) {
        document.querySelector('.order-clear').textContent = 'Clearing' + dot.repeat(i);
        await sleep(500);
    }
    cart = [];
    clearAdmin();
    document.getElementById('customer-name').value = '';
    document.getElementById('name').value = '';
    document.querySelector('.order-clear').textContent = "Clear Cart";
}

async function restoreCart() {
    if (prevCart.length > 0) {
        cart = [...prevCart];
        showNotification();
        for (let i = 0; i < 3; i++) {
            document.querySelector('.order-restore').textContent = 'Restoring' + dot.repeat(i);
            await sleep(500);
        }
        displayOrder();
        document.querySelector('.order-restore').textContent = "Restore Cart";
    }
}

function monthlyPayment(p, n, i) {
    i = i / 100 / 12;
    return p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

async function sendOrder() {
    var customerName = document.getElementById('customer-name');
    var customerEmail = document.getElementById('customer-email');
    var salesPerson = document.getElementById('sales-person');

    var isValid = true;

    [customerName, customerEmail, salesPerson].forEach(function (input) {
        input.style.borderColor = '';
    });

    if (!customerName.value.trim()) {
        customerName.style.border = '3px solid red';
        isValid = false;
    }
    if (!customerEmail.value.trim() || !validateEmail(customerEmail.value.trim())) {
        customerEmail.style.border = '3px solid red';
        isValid = false;
    }
    if (!salesPerson.value.trim()) {
        salesPerson.style.border = '3px solid red';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    for (let i = 0; i < 3; i++) {
        document.querySelector('.order-email').textContent = 'Submitting' + dot.repeat(i);
        await sleep(500);
    }
    document.querySelector('.order-email').textContent = 'Submitted';


    const variants = cart.map(data => data.variant).join(',');

    const url = `${draftOrderUrl}${variants}&customerName=${customerName.value.trim()}&salesRep=${salesPerson.value.trim()}`;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching data:', error));
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}