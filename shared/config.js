import BscTestnetMerkleABI from '../abis/BscTestnetMerkleAbi.json'
import ArbitriumMainnetABI from '../abis/ArbitriumMainAbi.json'

export const Catoshi_Mainnet = {
    name: "Arbitrium Mainnet",
    chainID: 42161,
    claim_Contract:"0x1EA9b385738aD3ACc9813048F42C2f310FF43472",
    abi: ArbitriumMainnetABI,
    ipfs: "https://ipfs.io/ipfs/QmfXVt4QNwEWe8FsKSMZgV6TnaCGwsYL9QBYuRRSh5JDH9/"
}

export const Catoshi_Testnet = {
    name: "BSC Testnet",
    chainID: 97,
    claim_Contract: "0xA43A9115673a6b567FfAFcF8056042D1D211D42b",
    abi: BscTestnetMerkleABI,
    ipfs: 'https://ipfs.io/ipfs/QmU6gAQRguFdWH6SYV14LHCLSJvKP4A9bYHgvLoStKvQ7y/'
}