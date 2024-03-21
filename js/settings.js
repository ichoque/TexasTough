// common variables
let useArrows = true,
    windowWidth = window.innerWidth; //not used

// Variables
let categories = [],
    subcategories = [],
    subcats = [],
    pricingCF = 'consumer',
    paymentsMT = 'monthly', // 'total'
    APR = '11.9',
    numMonths = '72',
    downPayment = "0";

//Defaults
let cur = '$',
    salesTax = 7,
    defaultProductImg = '/img/product-img.png',
    slideCount = 1,
    pinCode = '1',
    pinCount = 0,
    pinTimeOut = 60,
    pinSuccess = 0;

// presets - some of this isn't being used
let curMenu = menuRow01,
    curMenuN = 1,
    curMenuC = 0,
    curItems = 0,
    curPage = '',
    curPageN = 1,
    curProducts = [];

let curScreen = { package: null, menu: null };

// global variables
let tS, tE;

// interface distances
let mBtnDist = 208,
    productDist = 468,
    packageDist = 360,
    productStart = 0,
    productCol = 3,
    homeSlideDist = window.innerWidth;

// animations
let animTime = { // default animation timer
    duration: 600,
    iterations: 1,
    fill: 'forwards',
    easing: "ease-in-out"
};

let animFlip = { // default animation timer
    duration: 400,
    iterations: 1,
    fill: 'both',
    easing: "ease-in-out"
};

//live endpoints
let shopifyUrl = 'https://app.nista.co/client/hewlett/shopify/index.js?collectionID=';
let draftOrderUrl = 'https://app.nista.co/client/hewlett/shopify/draft-order.js?id=';

//dev endpoints
//shopifyUrl = 'http://dev-vm/dev/client/hewlett/kiosk-data-app-02/index.js?collectionID=';

//draftOrderUrl = 'http://dev-vm/dev/client/hewlett/kiosk-data-app-02/draft-order-new.js?id=';


let shopifyCollections = [ //not used ???
    { name: 'Protection', id: '470029697337' }, { name: 'Services', id: '470029730105' }, { name: 'Silverado 1500', id: '470637674809' }
]

//{ name: 'Packages', id: '470029664569' },
//Data Objects
let productsD = []; //product data object
let packagesData = {}; //packages data object
let slidesList = ["UI-img/home-slide-01.jpg",
    "UI-img/home-slide-02.jpg", "UI-img/home-slide-03.jpg", "UI-img/home-slide-04.jpg", "UI-img/home-slide-05.jpg"];


//this was saved from the Google Sheet version and may be useful    
let newcategories = [
    {
        "cat": "Bumpers and Grille Guards",
        "sub": "Grille Guard"
    },
    {
        "cat": "Bumpers and Grille Guards",
        "sub": "Rear Bumpers"
    },
    {
        "cat": "Interior",
        "sub": "Leather"
    },
    {
        "cat": "Side Steps & Running Boards",
        "sub": "3\""
    },
    {
        "cat": "Side Steps & Running Boards",
        "sub": "4\""
    },
    {
        "cat": "Side Steps & Running Boards",
        "sub": "5\""
    },
    {
        "cat": "Side Steps & Running Boards",
        "sub": "6\""
    },
    {
        "cat": "Side Steps & Running Boards",
        "sub": "Drop Steps"
    },
    {
        "cat": "Side Steps & Running Boards",
        "sub": "Power Steps"
    },
    {
        "cat": "Bed Covers",
        "sub": "Roll Up Soft Covers"
    },
    {
        "cat": "Bed Covers",
        "sub": "Folding Soft Covers"
    },
    {
        "cat": "Bed Covers",
        "sub": "Hard Rolling Covers"
    },
    {
        "cat": "Bed Covers",
        "sub": "Hard Folding Covers"
    },
    {
        "cat": "Bed Covers",
        "sub": "One Piece Covers"
    },
    {
        "cat": "Bed Covers",
        "sub": "Power Covers"
    },
    {
        "cat": "Toolboxes",
        "sub": "Low Profile"
    },
    {
        "cat": "Toolboxes",
        "sub": "Standard Toolbox"
    },
    {
        "cat": "Toolboxes",
        "sub": "Wide and Deep Boxes"
    },
    {
        "cat": "Wheels",
        "sub": "18 inch"
    },
    {
        "cat": "Wheels",
        "sub": "20 inch"
    },
    {
        "cat": "Wheels",
        "sub": "22 inch"
    },
    {
        "cat": "Tires",
        "sub": "35 inch"
    },
    {
        "cat": "Suspension",
        "sub": "SST LIFT KIT"
    },
    {
        "cat": "PROTECTION",
        "sub": "INTERIOR"
    },
    {
        "cat": "PROTECTION",
        "sub": "EXTERIOR"
    }
]

let packages = [
    { name: 'Protection', id: '470029697337' }, { name: 'Services', id: '470029730105' }, { name: 'Silverado 1500', id: '470637674809' }]

let data; //main products data object used throughout the application
let dataPackages; //main products data object used throughout the application

let cA = 0,
    cB = 1,
    cC = 2,
    cD = 3,
    cE = 4,
    cF = 5,
    cG = 6,
    cH = 7,
    cI = 8,
    cJ = 9,
    cK = 10,
    cL = 11,
    cM = 12,
    cN = 13,
    cO = 14;

// Products field Order
let prodCat = cB,
    prodSub = cC,
    prodID = cD,
    prodManu = cE,
    prodName = cF,
    //prodType = 6,
    prodPriceC = cH, //prodPriceF = 8,
    prodPriceI = cJ,
    prodInstTime = cI,
    prodDesc = cL,
    prodDetl = cK,
    prodImg = cM,
    prodImg2 = cN,
    prodImg3 = cO;

// Packages field Order
let packName = cB,
    packID = cC,
    packCat = cD,
    packDesc = cE,
    packDetl = cF,
    packPriceC = cG,
    packPriceF = cH,
    packImg = cI,
    packItems = cJ,
    packImg2 = cK;

let cart = [];
let prevCart = [];
let dot = '.';

//touch function definitions
let _menuSt = function () { };
let _menuMv = function () { };
let _menuEn = function () { };
let _prodSt = function () { };
let _prodMv = function () { };
let _prodEn = function () { };
let _packDSt = function () { };
let _packDMv = function () { };
let _packDEn = function () { };

// Slides field Order
let slideURL = 2;

// keyboard controls
const Keyboard = window.SimpleKeyboard.default;

const pinKeyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp}", "{enter}"]
    },
    theme: "hg-theme-default hg-layout-numeric numeric-theme",
    display: {
        "{bksp}": "⌫",
        "{enter}": "Enter"
    }
});
