import { BigNumber } from "ethers";
import BN from "bignumber.js";
import numeral from "numeral";
import { fromWei } from "web3-utils";
export function toBNJS(val: BigNumber | number | string) {
  return val ? new BN(val?.toString()) : new BN(0);
}

export const ipfsGateway = (cid: string) => {
  // console.log(cid)
  if (cid) {
    let com = "img-quality=80&img-width=320&img-height=350&";
    let handleCid = cid.replace("ipfs://", "").replace("ipfs:/", "");
    return `https://loot.mypinata.cloud/ipfs/${handleCid}?${com}pinataGatewayToken=${process.env.PINATA_GATEWAY_TOKEN}`;
  } else return "";
};
export function maskAddress(address: string) {
  return address.slice(0, 6) + "..." + address.slice(address.length - 4);
}

export function fd(val: number | string | BN) {
  if (!val) return "";
  return numeral(val?.toString()).format("0,0[.][000000000000000000]");
}
export const addressSlice = (address: string | undefined) => {
  if (!address) return "0000...0000";
  return (
    address.slice(0, 4) +
    "..." +
    address.slice(address.length - 4, address.length)
  );
};
export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
BN.config({ EXPONENTIAL_AT: 100 });
export const fromWeiToEth = (num: string | BigNumber, fixed?: number) => {
  if (!isNaN(Number(num))) {
    return Number(Number(fromWei(num.toString(), "ether")).toFixed(fixed || 5));
  } else {
    return 0;
  }
};
