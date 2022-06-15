const Web3 = require('web3');
const ERC20 = require('./MyToken.json');
const UNISWAP_FACTORY_ABI = require('./Factory.json');
const UNISWAP_EXCHANGE_ABI = require('./Exchange.json');

/**
 * BEFORE USING THIS SCRIPT MAKE SURE TO REPLACE:
 * - <YOUR_CONTRACT_ABI>
 * - <YOUR_CONTRACT_ADDRESS>
 * - CONTRACT_ADDRESS variable value
 * - YOUR_READ_FUNCTION_NAME method name
 * - YOUR_WRITE_FUNCTION_NAME method name
 */

const ACCOUNT_PRIVATE_KEY = '0x786ae7e69667d8273de61f6441d26c753bac2c62baccaa48953d6e7b06de916d'; // Replace this with your Ethereum private key with funds on Layer 2.
const CONTRACT_ABI = ERC20.abi; // this should be an Array []
const SOCKS_CONTRACT_ADDRESS = '0x52828739dC1A8f5e1dd48a111233402f21387066';
const DAI_CONTRACT_ADDRESS = '0x280718C026CdE21e5e34Aa924DA36F16A65aCB14'
const FACTORY_ADDRESS = "0xEb31E45B47AEFb88ca5c975A7eb4e217E9eD1f3f"
const EXCHNAGE_TEMPLATE_ADDRESS="0xdBa7acB2E653f471C84e1077e0B6aE1493B354a9"
const SOCKS_EXCHANGE_ADDRESS="0x95b6D5161B91b57c0154BEECF714392AE452fD65"
const DAI_EXCHANGE_ADDRESS = "0x82CA4286Ca1d76d5Dc7178Fa6E464d9ca21c7eF8"

const web3 = new Web3('https://godwoken-testnet-v1.ckbapp.dev');

const account = web3.eth.accounts.wallet.add(ACCOUNT_PRIVATE_KEY);

async function readCall() {
    const contract = new web3.eth.Contract(CONTRACT_ABI, SOCKS_CONTRACT_ADDRESS);

    const callResult = await contract.methods.balanceOf(account.address).call({
        from: account.address
    });

    console.log(`Read call result: ${callResult}`);
}

async function readContractCall() {
    const contract = new web3.eth.Contract(CONTRACT_ABI, SOCKS_CONTRACT_ADDRESS);

    const callResult = await contract.methods.balanceOf("0xAD9f47E048D2B454275d86Ed7D8aaBec6De26a48").call({
        from: account.address
    });

    console.log(`Read call result: ${callResult}`);
}


async function readExchnageTemplateCall() {
    const contract = new web3.eth.Contract(UNISWAP_FACTORY_ABI, FACTORY_ADDRESS);

    const callResult = await contract.methods.exchangeTemplate().call({
        from: account.address
    });

    console.log(`Read call result: ${callResult}`);
}

async function getExchange() {
    const contract = new web3.eth.Contract(UNISWAP_FACTORY_ABI, FACTORY_ADDRESS);

    const callResult = await contract.methods.getExchange(SOCKS_CONTRACT_ADDRESS).call({
        from: account.address
    });

    console.log(`Read call result for Socks: ${callResult}`);

    const DAIcallResult = await contract.methods.getExchange(DAI_CONTRACT_ADDRESS).call({
        from: account.address
    });

    console.log(`Read call result for DAI: ${DAIcallResult}`);
}

async function getToken() {
    const contract = new web3.eth.Contract(UNISWAP_FACTORY_ABI, FACTORY_ADDRESS);

    const callResult = await contract.methods.getToken(SOCKS_EXCHANGE_ADDRESS).call({
        from: account.address
    });

    console.log(`Read call result: ${callResult}`);
}

async function getSocksExchangeContractBalance() {
    const contract = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, SOCKS_EXCHANGE_ADDRESS);

    const callResult = await contract.methods.balanceOf(account.address).call({
        from: account.address
    });

    console.log(`Read call result: ${callResult}`);
}

async function getSocksExchangeInfo() {
    const Sockscontract = new web3.eth.Contract(CONTRACT_ABI, SOCKS_CONTRACT_ADDRESS);

    const contract = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, SOCKS_EXCHANGE_ADDRESS);

    const callResult = await contract.methods.balanceOf(SOCKS_EXCHANGE_ADDRESS).call({
        from: account.address
    });

    const callResultForSocks = await Sockscontract.methods.balanceOf(SOCKS_EXCHANGE_ADDRESS).call({
        from: account.address
    });

    const SocksExchnageEthBalance = await web3.eth.getBalance(SOCKS_EXCHANGE_ADDRESS);

    //console.log(`Read call result: ${callResult}`);
    console.log(`Read call result for Socks Balance in Socks Exchange Contract: ${callResultForSocks}`);
    console.log(`Read call result for Eth balance in Socks Exchange Contract: ${SocksExchnageEthBalance}`);
}

async function getDAIExchangeInfo() {
    const Sockscontract = new web3.eth.Contract(CONTRACT_ABI, DAI_CONTRACT_ADDRESS);

    const contract = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, DAI_EXCHANGE_ADDRESS);

    const callResult = await contract.methods.balanceOf(DAI_EXCHANGE_ADDRESS).call({
        from: account.address
    });

    const callResultForSocks = await Sockscontract.methods.balanceOf(DAI_EXCHANGE_ADDRESS).call({
        from: account.address
    });

    const SocksExchnageEthBalance = await web3.eth.getBalance(DAI_EXCHANGE_ADDRESS);

    //console.log(`Read call result: ${callResult}`);
    console.log(`Read call result for DAI Balance in DAI Exchange Contract: ${callResultForSocks}`);
    console.log(`Read call result for Eth balance in DAI Exchange Contract: ${SocksExchnageEthBalance}`);
}


async function approvSocksToken() {
    const contract = new web3.eth.Contract(CONTRACT_ABI, SOCKS_CONTRACT_ADDRESS);


    const tx = contract.methods.approve(SOCKS_EXCHANGE_ADDRESS,"500000000000000000000").send(
        {
            from: account.address,
            gas: 6000000
        }
    );

    tx.on('transactionHash', hash => console.log(`Write call transaction hash: ${hash}`));

    const receipt = await tx;

    console.log('Write call transaction receipt: ', receipt);
}

async function addLiquidity() {
    const contract = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, SOCKS_EXCHANGE_ADDRESS);

    const tx = contract.methods.addLiquidity(0,"500000000000000000000","1753669533").send(
        {
            from: account.address,
            gas: 6000000,
            value:"1000000000000000000"
        }
    );

    tx.on('transactionHash', hash => console.log(`Write call transaction hash: ${hash}`));

    const receipt = await tx;

    console.log('Write call transaction receipt: ', receipt);
}




async function writeCall() {
    const contract = new web3.eth.Contract(CONTRACT_ABI, SOCKS_CONTRACT_ADDRESS);

    const tx = contract.methods.transfer("0xAD9f47E048D2B454275d86Ed7D8aaBec6De26a48","100000000000000000000").send(
        {
            from: account.address,
            gas: 6000000
        }
    );

    tx.on('transactionHash', hash => console.log(`Write call transaction hash: ${hash}`));

    const receipt = await tx;

    console.log('Write call transaction receipt: ', receipt);
}



async function createExchange() {
    const contract = new web3.eth.Contract(UNISWAP_FACTORY_ABI, FACTORY_ADDRESS);

    const tx = contract.methods.createExchange(SOCKS_CONTRACT_ADDRESS).send(
        {
            from: account.address,
            gas: 6000000
        }
    );

    console.log('Return from Tx of createExchange ', tx);

    tx.on('transactionHash', hash => console.log(`Write call transaction hash: ${hash}`));

    const receipt = await tx;

    console.log('Write call transaction receipt: ', receipt);
}

async function initializeFactory() {
    const contract = new web3.eth.Contract(UNISWAP_FACTORY_ABI, FACTORY_ADDRESS);

    const tx = contract.methods.initializeFactory(EXCHNAGE_TEMPLATE_ADDRESS).send(
        {
            from: account.address,
            gas: 6000000
        }
    );

    tx.on('transactionHash', hash => console.log(`Write call transaction hash: ${hash}`));

    const receipt = await tx;

    console.log('Write call transaction receipt: ', receipt);
}



(async () => {
    const balance = BigInt(await web3.eth.getBalance(account.address));

    if (balance === 0n) {
        console.log(`Insufficient balance. Can't issue a smart contract call. Please deposit funds to your Ethereum address: ${account.address}`);
        return;
    }

    console.log('Calling contract...');

    // Check smart contract state before state change.
    //await readCall();

    // Change smart contract state.
    //await writeCall();

    //initializeFactory smart contract state
    // await initializeFactory();

    //read exchangeTemplate

    //await readExchnageTemplateCall()

    //createExchange for new token address
    //await createExchange()

    // Check smart contract state for getExchange
    //await getExchange()

    // apporving  smart contract  before addLiquidity
    //await approvSocksToken()

    //await getSocksExchangeContractBalance();

    // add Liquidity into exchnage contract

    await getSocksExchangeInfo();
    
    await addLiquidity()

    await getSocksExchangeInfo();

    //await getDAIExchangeInfo()

   // await getSocksExchangeContractBalance();

    // Check smart contract state for getToken.
    //await getToken()

    // Check smart contract state after state change.
    // await readCall();

     // Check smart contract state after state change.
    // await readContractCall();
})();
