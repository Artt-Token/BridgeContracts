/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()
const mnemonic = process.env.MNEMONIC;
console.log('Mnemonic:', mnemonic)

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "5777",       // Any network (default: none)
    },
    ethereum: {
      provider: () => new HDWalletProvider('7537e151b541d07cd780e5c05581106892f4737bec578ef17d4bf2bc0afc775f', 'https://eth-mainnet.g.alchemy.com/v2/CLI2LX_mo5vj3KKDGIcS8G6bYKtzGuvr'),
      network_id: 1,  // Ethereum mainnet
      gas: 30000000,
      websockets: true,
      skipDryRun: true
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/' + process.env.INFURA_PROVIDER),
      network_id: 4,
      skipDryRun: true,
      gas: 8500000,
      websockets: true
    },
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, 'https://goerli.infura.io/v3/415ef25d5af541549fb974517242834f'),
      network_id: '5', // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 10000000000,
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, process.env.POLYGON_MUMBAI_PROVIDER),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 600,
      skipDryRun: true
    },
    polygon: {
      provider: () => new HDWalletProvider('7537e151b541d07cd780e5c05581106892f4737bec578ef17d4bf2bc0afc775f', 'https://polygon-mainnet.g.alchemy.com/v2/v7MKB9Tam6L7VACb-pRZSZ08LoQbrPc8'),
      network_id: 137,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bscTestnet: {
      provider: () => new HDWalletProvider(mnemonic, process.env.BSC_TESTNET_PROVIDER),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 600,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, process.env.BSC_MAINNET_PROVIDER),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice: 3000000000
    },
    sepolia:{
      provider: () => new HDWalletProvider(mnemonic, process.env.SEPOLIA_PROVIDER),
      network_id: 11155111,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.12",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        // evmVersion: "byzantium"
      }
    }
  },
  plugins: [
    'truffle-plugin-verify',
    'truffle-contract-size',
    'truffle-flatten'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    bscscan: process.env.BSCSCAN_API_KEY,
    polygonscan: process.env.POLYGONSCAN_API_KEY
  }
};
