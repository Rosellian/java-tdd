export function diffType(a, b, diffs) {
    switch (a.type) {
        case "SpecialPrice":
            diffSpecialPrice(a, b, diffs);
            break;
        case "BuyXGetYFree":
            diffBuyXGetYFree(a, b, diffs);
            break;
        case "BuyXGetYDiscount":
            diffBuyXGetYDiscount(a, b, diffs);
            break;
        case "CrossSkuBuyXGetYFree":
            diffCrossSkuBuyXGetYFree(a, b, diffs);
            break;
        case "CrossSkuBuyXGetYDiscount":
            diffCrossSkuBuyXGetYDiscount(a, b, diffs);
            break;
        case "SkuDiscount":
            diffSkuDiscount(a, b, diffs);
            break;
        default:
            diffs.push(`Unknown rule type: ${a.type}`);
            break;
    }
}

//Rule types
function diffSpecialPrice(a, b, diffs) {
    diffSku(a, b, diffs);
    if (a.quantity !== b.quantity) diffs.push(`Quantity changed (${a.quantity} → ${b.quantity})`);
    if (a.price !== b.price) diffs.push(`Price changed (${a.price} → ${b.price})`);
}

function diffBuyXGetYFree(a, b, diffs) {
    diffSku(a, b, diffs);
    diffBuyAndGet(a, b, diffs);
}

function diffBuyXGetYDiscount(a, b, diffs) {
    diffSku(a, b, diffs);
    diffBuyAndGet(a, b, diffs);
    diffDiscount(a, b, diffs);
}

function diffCrossSkuBuyXGetYFree(a, b, diffs) {
    diffBuySkuAndBuyQty(a, b, diffs);
    if (a.freeSku !== b.freeSku) diffs.push(`Free SKU changed (${a.freeSku} → ${b.freeSku})`);
    if (a.freeQty !== b.freeQty) diffs.push(`Free Qty changed (${a.freeQty} → ${b.freeQty})`);
}

function diffCrossSkuBuyXGetYDiscount(a, b, diffs) {
    diffBuySkuAndBuyQty(a, b, diffs);
    if (a.discountSku !== b.discountSku) diffs.push(`Discount SKU changed (${a.discountSku} → ${b.discountSku})`);
    if (a.discountQty !== b.discountQty) diffs.push(`Discount Qty changed (${a.discountQty} → ${b.discountQty})`);
    diffDiscount(a, b, diffs);
}

function diffSkuDiscount(a, b, diffs) {
    diffSku(a, b, diffs);
    diffDiscount(a, b, diffs);
}

//Helper functions
function diffSku(a, b, diffs) {
    if (a.sku !== b.sku) diffs.push(`SKU changed (${a.sku} → ${b.sku})`);
}

function diffBuyAndGet(a, b, diffs) {
    if (a.buy !== b.buy) diffs.push(`Buy changed (${a.buy} → ${b.buy})`);
    if (a.get !== b.get) diffs.push(`Get changed (${a.get} → ${b.get})`);
}

function diffDiscount(a, b, diffs) {
    if (a.discount !== b.discount) diffs.push(`Discount changed (${a.discount} → ${b.discount})`);
}

function diffBuySkuAndBuyQty(a, b, diffs) {
    if (a.buySku !== b.buySku) diffs.push(`Buy SKU changed (${a.buySku} → ${b.buySku})`);
    if (a.buyQty !== b.buyQty) diffs.push(`Buy Qty changed (${a.buyQty} → ${b.buyQty})`);
}