const envParsed = process.env;

const DestinationChainBridge = artifacts.require("DestinationChainBridge");
const NativeChainBridge = artifacts.require("NativeChainBridge");

module.exports = async function (deployer, network, accounts) {

    const tokenAddress = "0x9158E70119d661BA0cAEB2b392EDd9565CaC82b7";
    const feePercentage = "100";

    const gasFeeAmount = "20000000000000000"
    const currentAccount = accounts[0];
    console.log(currentAccount);

    await deployer.deploy(NativeChainBridge, tokenAddress, currentAccount, feePercentage, gasFeeAmount, {from: currentAccount});
    const nativeChainBridge = await NativeChainBridge.deployed();
    console.log('NativeChainBridge address: ', nativeChainBridge.address);
    await nativeChainBridge.setAllowedChains('1', true, {from: currentAccount});

    await deployer.deploy(DestinationChainBridge, tokenAddress, currentAccount, feePercentage, {from: currentAccount});
    const destinationChainBridge = await DestinationChainBridge.deployed();
    console.log('DestinationChainBridge address: ', destinationChainBridge.address);
    await destinationChainBridge.setAllowedChains('56', true, {from: currentAccount});


    //____________________________PROD DEPLOYMENT_______________________________________

    // await deployer.deploy(NativeChainBridge, tokenAddress, currentAccount, feePercentage, gasFeeAmount, {from: currentAccount});
    // const nativeChainBridge = await NativeChainBridge.deployed();
    // console.log('NativeChainBridge address: ', nativeChainBridge.address);
    // await nativeChainBridge.setAllowedChains('1', true, {from: currentAccount});

    // await deployer.deploy(DestinationChainBridge, ggTokenInstance.address, currentAccount, feePercentage, {from: currentAccount});
    // const destinationChainBridge = await DestinationChainBridge.deployed();
    // console.log('DestinationChainBridge address: ', destinationChainBridge.address);

    // await destinationChainBridge.setAllowedChains('56', true, {from: currentAccount});
    // await ggTokenInstance.setBridgeContract(destinationChainBridge.address, {from: currentAccount});

};
