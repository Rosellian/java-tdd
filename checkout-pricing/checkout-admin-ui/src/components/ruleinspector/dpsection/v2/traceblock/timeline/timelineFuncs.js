export function getDetailsInput(dp, nodeIndex, debuggerDP) {
    let step = nodeIndex + 1;

    const debuggerNode = debuggerDP[nodeIndex];

    const remaining = dp.remaining - step;

    const prevPrice = nodeIndex > 0 ? dp.nodes[nodeIndex - 1].price : null;

    const unitPrice = dp.unitPrice * step;

    return {debuggerNode, remaining, prevPrice, unitPrice};
}