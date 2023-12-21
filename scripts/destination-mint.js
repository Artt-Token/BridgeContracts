const DestinationChainBridge = artifacts.require("DestinationChainBridge");
const NativeChainBridge = artifacts.require("NativeChainBridge");
const ArttTestToken = artifacts.require("ArttTestToken");
const GGTKN = artifacts.require("GGTKN");

module.exports = async callback => {
    try {
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];
        console.log('Current account', currentAccount);
        console.log('---------------------------------------------------------');

        const tokenInstance = await ArttTestToken.deployed();
        console.log('tokenInstance address:', tokenInstance.address);

        const bridgeInstance = await NativeChainBridge.deployed();
        console.log('bridgeInstance address:', bridgeInstance.address);

        const ggtkInstance = await GGTKN.deployed();
        console.log('ggtkInstance address:', ggtkInstance.address);

        const destinationBridgeInstance = await DestinationChainBridge.deployed();
        console.log('destinationBridgeInstance address:', destinationBridgeInstance.address);
        // listenToEvent(destinationBridgeInstance);

        const balance1 = await ggtkInstance.balanceOf(currentAccount);
        console.log(balance1.toString());

        // const approve = await tokenInstance.approve(bridgeInstance.address, '300', {from: currentAccount});
        // console.log(approve)

        // const bridgeChainAllow = await destinationBridgeInstance.setAllowedChains('56', true, {from: currentAccount});
        // console.log(bridgeChainAllow);
        // await ggtkInstance.setBridgeContract(currentAccount, {from: currentAccount});

        // ggtkInstance.mintTo(currentAccount, '1000', {from: currentAccount});

        const bridgeTokens = await destinationBridgeInstance.releaseBridgedTokens(ggtkInstance.address, currentAccount, '297', {
            from: currentAccount
        });


        console.log(bridgeTokens);
        //
        // await ggtkInstance.mintTo(currentAccount, '1000', {from: currentAccount});

        const balance = await ggtkInstance.balanceOf(currentAccount);
        console.log(balance.toString());
        callback();
    } catch (e) {
        console.error(e);
        callback();
    }
}

// async function listenToEvent(destinationBridgeInstance) {
//     console.log('listenToEvent');
//     // Listen to the MyEvent event
//     destinationBridgeInstance.events.DebugInfo({}, {fromBlock: 0, toBlock: 'latest'})
//         .on('data', (event) => {
//             console.log('MyEvent emitted:', event.returnValues);
//         })
//         .on('error', (error) => {
//             console.error('Error listening to MyEvent:', error);
//         });
// }