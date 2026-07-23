export function getFullClass(resource) {
    let isFull = resource.used >= resource.capacity

    return isFull ? " full" : "";
}