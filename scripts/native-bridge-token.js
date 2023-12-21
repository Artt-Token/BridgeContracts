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

        // const ggtkInstance = await GGTKN.deployed();
        // console.log('ggtkInstance address:', ggtkInstance.address);

        // const destinationBridgeInstance = await DestinationChainBridge.deployed();
        // console.log('destinationBridgeInstance address:', destinationBridgeInstance.address);

        const approve = await tokenInstance.approve(bridgeInstance.address, '1000', {from: currentAccount});
        console.log(approve)

        // const bridgeChainAllow = await bridgeInstance.setAllowedChains('1', true, {from: currentAccount});
        // console.log(bridgeChainAllow);

        const bridgeTokens = await bridgeInstance.bridgeTokens(tokenInstance.address, '1000', '1', {from: currentAccount, value:'20000000000000000'});
        console.log(bridgeTokens);

        const bridges = await bridgeInstance.getAllPendingBridgesByToken(tokenInstance.address);
        console.log(bridges.toString());

        callback();
    } catch (e) {
        console.error(e);
        callback();
    }
}
