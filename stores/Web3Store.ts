import { action, makeObservable, observable } from "mobx";
import "reflect-metadata";
import Web3 from "web3";
import { RootStore } from "./RootStore";
import { stakeAbi, stakeContract } from "../utils/contracts/stake";
import { injectable } from "inversify";
import BN from "bignumber.js";
import { erc20Abi, erc20Contract } from "../utils/contracts/erc20";

interface User {
  login: string;
  email: string;
  address?: string;
  id?: string;
}

injectable();

export class Web3Store {
  @observable address: any = undefined;
  @observable isInitConnect: boolean = false;
  @observable provider: any = null;
  @observable web3: Web3 | null = null;
  @observable tokensList: any[] = [];
  @observable signer?: any | null = undefined;
  @observable contract?: any = undefined;
  @observable erc20?: any = undefined;
  @observable correctChain: boolean = false;
  @observable connected: boolean = false;
  @observable unsupported?: boolean = false;
  @observable presaleStage: string = "";
  @observable price: string = "";
  @observable fromWhitelisted: number = 0;
  @observable fromPills: number = 0;
  @observable balancePills: number = 0;
  @observable balanceRecept: number = 0;
  @observable season: number = 0;
  @observable isMidseason: boolean = false;
  @observable fromPublic: number = 0;
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  setCorrectChain = (status: boolean) => {
    this.correctChain = status;
  };
  setInitConnect = (status: boolean) => {
    this.isInitConnect = status;
  };
  checkPause = async () => {
    try {
      const res = await this.contract.methods.paused().call();
      return res;
    } catch (e) {
      console.log(e);
      // return false;
    }
  };
  claim = async (positionId: number, proof?: string[], amount?: string) => {
    console.log(positionId, proof, amount);
    try {
      const res = await this.contract.methods
        .claim(amount, positionId, proof)
        .send({
          from: this.address,
        });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  withdraw = async (positionId: number) => {
    try {
      const res = await this.contract.methods.withdraw(positionId).send({
        from: this.address,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  depositWithAllowance = async (val: number, set: (b: boolean) => void) => {
    try {
      const allowance = await this.erc20.methods
        .allowance(this.address, stakeContract)
        .call();
      if (Number(allowance) >= val + 0.02) {
        this.deposit(val, set);
      } else {
        await this.erc20?.methods
          .approve(
            stakeContract,
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          )
          .send({
            from: this.address,
          })
          .on("receipt", () => {
            this.deposit(val, set);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  deposit = async (val: number, set: (b: boolean) => void) => {
    try {
      const res = await this.contract.methods
        .deposit(Web3.utils.toWei(val.toString(), "ether"))
        .send({
          from: this.address,
          // value: Web3.utils.toWei(val.toString(), "ether"),
        });
      console.log(res);
      set(false);
    } catch (e) {
      set(false);

      console.log(e);
    }
  };

  setProvider = (provider?: any, address?: string) => {
    if (address) {
      this.setInitConnect(true);
      this.address = address;
    }
    console.log("CONNECT", provider);
    if (provider) {
      // this.checked = true;
      // console.log("CONNECT");
      this.web3 = new Web3(provider);
      this.contract = new this.web3.eth.Contract(
        stakeAbi as any,
        stakeContract
      );
      this.erc20 = new this.web3.eth.Contract(erc20Abi as any, erc20Contract);
      this.subscribeProvider();
    }
  };
  getCurrentSeason = async () => {
    try {
      const season = await this.contract.methods.season().call();
      const isMidseason = await this.contract.methods.isMidseason().call();
      console.log(isMidseason);
      this.isMidseason = isMidseason
      this.season = Number(season);
    } catch (e) {
      console.log(e);
    }
  };
  checkIsPaused = async () => {
    try {
      const pause = await this.contract.methods.paused().call();

      return pause;
    } catch (e) {
      console.log(e);
    }
  };

  setConnected = (connected: boolean) => {
    if (!this.contract) {
      this.connected = connected;
      this.web3 = new Web3(
        "https://endpoints.omniatech.io/v1/base/mainnet/public"
      );
      this.erc20 = new this.web3.eth.Contract(erc20Abi as any, erc20Contract);
      this.contract = new this.web3.eth.Contract(
        stakeAbi as any,
        stakeContract
      );
    }
  };
  setAddress = (user: any) => {
    if (user?.address) {
      this.address = user.address;
    } else {
      console.log("hi disconnect 2");
      this.address = null;
    }
  };
  subscribeProvider = () => {
    console.log("subscribeProvider");
    //@ts-ignore
    this.web3?.currentProvider?.on("accountsChanged", (account) => {
      console.log("account", account);
      this.setAddress({ address: account[0] });
    });
  };

  disconnected = () => {
    this.address = null;
  };

  disconnectWallet = async () => {
    this.provider = null;
    this.address = null;
    this.web3 = null;
  };

  mintPrescription = async (id: string, amount: number, price: BN) => {
    console.log(price.toString());
    try {
      // this.rootStore.modalStore.hideModal(ModalsEnum.Mint);
      const res = await this.contract?.methods
        .presalePayedMint(id, amount)
        .send({
          from: this.address,
          value: price.toString(),
        });
      console.log(res);
      // this.disableMintModal = false;
      return true;
    } catch (error) {
      // this.disableMintModal = false;
      console.log(error);
      return false;
    }
  };
}
