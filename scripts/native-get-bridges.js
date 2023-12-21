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
        //
        // const ggtkInstance = await GGTKN.deployed();
        // console.log('ggtkInstance address:', ggtkInstance.address);

        // const destinationBridgeInstance = await DestinationChainBridge.deployed();
        // console.log('destinationBridgeInstance address:', destinationBridgeInstance.address);

        const getAllPendingBridgesByToken = await bridgeInstance.getAllPendingBridgesByToken(tokenInstance.address);
        console.log('getAllPendingBridgesByToken', getAllPendingBridgesByToken.toString());

        const getAllUserPendingBridgesByToken = await bridgeInstance.getAllUserPendingBridgesByToken(currentAccount, tokenInstance.address);
        console.log('getAllUserPendingBridgesByToken', getAllUserPendingBridgesByToken.toString());

        const getAllUserBridgesByToken = await bridgeInstance.getAllUserBridgesByToken(currentAccount, tokenInstance.address);
        console.log('getAllUserBridgesByToken', getAllUserBridgesByToken.toString());

        callback();
    } catch (e) {
        console.error(e);
        callback();
    }
}
