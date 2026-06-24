export function getDetailsInput(dp, nodeIndex, debuggerDP) {
    const debuggerNode = debuggerDP[nodeIndex];

    const remaining = dp.remaining - (nodeIndex + 1);

    const prevPrice = nodeIndex > 0 ? dp.nodes[nodeIndex - 1].price : null;

    return {debuggerNode, remaining, prevPrice};
}