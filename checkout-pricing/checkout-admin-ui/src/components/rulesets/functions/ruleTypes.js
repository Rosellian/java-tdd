export function isEqualTypeFields(a, b) {
    switch (a.type) {
        case "SpecialPrice":
            return equalSpecialPrice(a, b);
        case "BuyXGetYFree":
            return equalBuyXGetYFree(a, b);
        case "BuyXGetYDiscount":
            return equalBuyXGetYDiscount(a, b);
        case "CrossSkuBuyXGetYFree":
            return equalCrossSkuBuyXGetYFree(a, b);
        case "CrossSkuBuyXGetYDiscount":
            return equalCrossSkuBuyXGetYDiscount(a, b);
        case "SkuDiscount":
            return equalSkuDiscount(a, b);
        default:
            return false;
    }
}

//Rule types
function equalSpecialPrice(a, b) {
    return (
        equalSku(a, b) &&
        a.quantity === b.quantity &&
        a.price === b.price
    );
}

function equalBuyXGetYFree(a, b) {
    return (
        equalSku(a, b) &&
        equalBuyAndGet(a, b)
    );
}

function equalBuyXGetYDiscount(a, b) {
    return (
        equalSku(a, b) &&
        equalBuyAndGet(a, b) &&
        equalDiscount(a, b)
    );
}

function equalCrossSkuBuyXGetYFree(a, b) {
    return (
        equalBuySkuAndGetQty(a, b) &&
        a.freeSku === b.freeSku &&
        a.freeQty === b.freeQty
    );
}

function equalCrossSkuBuyXGetYDiscount(a, b) {
    return (
        equalBuySkuAndGetQty(a, b) &&
        a.discountSku === b.discountSku &&
        a.discountQty === b.discountQty &&
        equalDiscount(a, b)
    );
}

function equalSkuDiscount(a, b) {
    return (
        equalSku(a, b) &&
        equalDiscount(a, b)
    );
}

//Helper functions
function equalSku(a, b) {
    return a.sku === b.sku;
}

function equalBuyAndGet(a, b) {
    return a.buy === b.buy &&
        a.get === b.get;
}

function equalDiscount(a, b) {
    return a.discount === b.discount;
}

function equalBuySkuAndGetQty(a, b) {
    return a.buySku === b.buySku &&
        a.buyQty === b.buyQty;
}