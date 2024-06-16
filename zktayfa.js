import "dotenv/config";
import { ethers } from "ethers";
import { abi } from "./abi";

//contract adresi = 0x66fd4fc8fa52c9bec2aba368047a0b27e24ecfe4 => https://era.zksync.network/address/0x66fd4fc8fa52c9bec2aba368047a0b27e24ecfe4

const contractAddress = "0x66fd4fc8fa52c9bec2aba368047a0b27e24ecfe4";

const getProvider = (mainnet = false) => {
  const providerUrl = mainnet
    ? `https://zksync-mainnet.g.alchemy.com/v2/${process.env.ZK_MAINNET_API}`
    : `https://zksync-sepolia.g.alchemy.com/v2/${process.env.ZK_TESTNET_API}`; 

  return new ethers.JsonRpcProvider(providerUrl);
};

const getSigner = (mainnet = false) => {
    const provider = getProvider(mainnet);
  
    return new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY, provider);
  };

const provider = getProvider(true);
const signer = getSigner(true);

const contractZK = new ethers.Contract(contractAddress, abi, signer);

//claim sitesinde cuzdan aratmadan once F12>network aratinca attigi requestte var prooflar ve indexler


const param1 = "283791" // _index buraya kendi indexini yaz 
const param2 = "51144000000000000000000" // _amount buraya hak kazandığın token miktarını yaz
const param3 = [
  0x5287c81fd10827e0251880ef46252dfab7e43a9ba5cf70a2d017a3ea6e74085b,
  0xf7c0af77cde4e68c266d785991d03d94369455e08e7cc50b9893855e4d0b83c0,
  0x7735f75d231f2e40f0abe900b1d8629a12dec41b78d252098023d2db7f05965d,
  0x5d521d56d31021a2c0f54707b076b1be9ec3e138fbfbe72403d51d4338566c53,
  0xbab539ece121a4bd7157d692effaad67a567e60e114d48ef930839928c9d41d9,
  0x07fe5e48873baad9b7a2acc24e0de3ec71bc027253f4806c9784eacf25723956,
  0x87832c82be493db1fd82e60460b5ea327545169e8f845e6da4340af6a85b8206,
  0xc734528c515bda246cb04fe64f72cb70cc13fd4b7564b344dae62cf2df470469,
  0xc32b32b8eecc727ce4a61b4ae2a3469168b5b14728ecf483b6ee3fb3b0715c2a,
  0x0323f63bc2a1acb5a3aecf7c84e01d0329be8ba9348fe365c86e77dbbd916bfa,
  0xa7dea163b13b38d76a7517574bd9d3e105defc271c96cafe670435690570fd07,
  0x50f2cffe1c3ff3fc7d5e63c9d28ae36fa6bc5ea34daeaf97c90a653e0abea87f,
  0x482a9b43272f60bd73dc082794a052e961df6530eff4ad3f0b8a2196f777470a,
  0xa590d297ad97703eb4b72efbfba586cb663cf6c3e81d84710888391641b49720,
  0x568ac74396c0d8945ed47092640728eeb838c0775306b95ee359176f7a3bc78e,
  0x2c14b4d05e0f342e5e7f88d701ea1a05efbfdef88bba67e5509c485e53b9c943,
  0xe33101d2c1523f7cb90923ad06e975f0b79226fa2cac5c53f994b9c1600a266e,
  0xbad82892e8285e059a2db2e3e560d999ce8e9c8abb5edf1c20f0cc7b6cc2c2ce,
  0xd3add19da850794b9cb334b6116ca97e9f44a74d45b3cda07f487822d385abc1,
  0x92532c932f2839aebcd17e5327db3b37358bcfc640cfc2ff187a8a8a906e0c9d
] // _merkleProof





const tx = await contractZK.claim(param1,param2,param3,{
  gasLimit : 100000, //bunu ayarla
  gasPrice : ethers.parseUnits("50.0", "gwei") //bunu da ayarla
});

console.log("Transaction Hash:", tx.hash);

const receipt = await tx.wait();
console.log("Transaction Receipt:", receipt);

