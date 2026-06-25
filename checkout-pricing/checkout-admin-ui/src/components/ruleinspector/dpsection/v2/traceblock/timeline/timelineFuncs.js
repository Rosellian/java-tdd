export function getDetailsInput(dp, nodeIndex, debuggerDP) {
    let step = nodeIndex + 1;

    const debuggerNode = debuggerDP[nodeIndex];

    const remaining = dp.remaining - step;

    const unitPrice = dp.unitPrice * step;

    return {debuggerNode, remaining, unitPrice};
}