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

        const tokenInstance = await GGTKN.deployed();
        console.log('tokenInstance address:', tokenInstance.address);

        const bridgeInstance = await DestinationChainBridge.deployed();
        console.log('bridgeInstance address:', bridgeInstance.address);

        const approve = await tokenInstance.approve(bridgeInstance.address, '200', {from: currentAccount});
        console.log(approve)

        const getAllUserPendingBridgesByToken = await bridgeInstance.getAllUserPendingBridgesByToken(currentAccount, tokenInstance.address);
        console.log('getAllUserPendingBridgesByToken', getAllUserPendingBridgesByToken.toString());

        const getAllUserBridgesByToken = await bridgeInstance.getAllUserBridgesByToken(currentAccount, tokenInstance.address);
        console.log('getAllUserBridgesByToken', getAllUserBridgesByToken.toString());

        // await bridgeInstance.setAllowedBridgeTokens(tokenInstance.address, true, {from: currentAccount});

        const completeBridge = await bridgeInstance.bridgeTokens(tokenInstance.address, '200', '56', {from: currentAccount});

        const getAllUserPendingBridgesByToken1 = await bridgeInstance.getAllUserPendingBridgesByToken(currentAccount, tokenInstance.address);
        console.log('getAllUserPendingBridgesByToken', getAllUserPendingBridgesByToken1.toString());

        const getAllUserBridgesByToken1 = await bridgeInstance.getAllUserBridgesByToken(currentAccount, tokenInstance.address);
        console.log('getAllUserBridgesByToken', getAllUserBridgesByToken1.toString());

        callback();
    } catch (e) {
        console.error(e);
        callback();
    }
}
