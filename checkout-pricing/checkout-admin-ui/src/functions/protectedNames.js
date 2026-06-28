const PROTECTED_RULESETS = [
    "default",
    "campaigna",
    "campaignb",
    "nocrossnoskudiscount"
];

const PROTECTED_PRICE_LISTS = [
    "default"
];

export function isProtectedRuleset(name) {
    const normalizedName = normalize(name);
    return PROTECTED_RULESETS.includes(normalizedName);
}

export function isProtectedPriceList(name) {
    const normalizedName = normalize(name);
    return PROTECTED_PRICE_LISTS.includes(normalizedName);
}

function normalize(name) {
    return name.replaceAll(" ", "").toLowerCase();
}