import { RootStore } from "./RootStore";
import { makeObservable, observable } from "mobx";
import "reflect-metadata";
import axios from "axios";
import { injectable } from "inversify";

injectable();

export class GalleryStore {
  @observable characters: any[] = [];
  @observable recepts: any[] = [];
  @observable char: any;
  @observable takenNft: any;
  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  setChar = (id?: string) => {
    if (id) {
      this.char = this.characters.find((el) => el.id == id);
    } else {
      this.char = null;
    }
  };
  getRecepts = async () => {
    // const params = {
    //   chain: chain,
    //   address: address,
    // };

    // const query = new URLSearchParams(params).toString();

    try {
      const res = await axios.get("/api/recepts");
      console.log(res, res.data.result.length);

      // return Promise.all(
      //   res.data.result
      //     .filter((el: any) => el.token_uri)
      //     .map(async (el: any) => {
      //       console.log(el);
      //       return {
      //         block_number: el.block_number,
      //         id: el.token_id,
      //         ...el.normalized_metadata,
      //       };
      //     })
      // );
    } catch (e) {
      console.log(e);
    }
  };
  setRecepts = (recepts: any[]) => {
    this.recepts = recepts;
  };
  removeToken = (id: string) => {
    let index = this.characters.findIndex((object) => object.id === id);
    if (index !== -1) {
      this.characters.splice(index, 1);
    }
  };

  getCharacters = async (address: string, chain: string) => {
    console.log(address, "hiii");
    const params = {
      chain: chain,
      address: address,
    };

    const query = new URLSearchParams(params).toString();

    try {
      const res = await axios.get("/api/nfts?" + query);
      console.log(res, res.data.result.length);

      return Promise.all(
        res.data.result
          // .filter((el: any) => el.token_uri)
          .map(async (el: any) => {
            console.log(el);
            return {
              block_number: el.block_number,
              id: el.token_id,
              // useCount: Number(await this.rootStore.web3store.isTokenUsed(el.token_id)),
              ...el.normalized_metadata,
            };
          })
      );
    } catch (e) {
      console.log(e);
    }
  };
  setCharacters = (characters: any[]) => {
    this.characters = characters;
  };
}
