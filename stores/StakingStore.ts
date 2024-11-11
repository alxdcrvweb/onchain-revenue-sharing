import { RootStore } from "./RootStore";
import { makeObservable, observable } from "mobx";
import "reflect-metadata";
import axios from "axios";
import { injectable } from "inversify";
import { backendUrl } from "../config/config";

injectable();

export class StakingStore {
  @observable list: any[] = [];
  @observable pointsList: any[] = [];
  @observable pointsListPast: any[] = [];

  @observable proofsList: any[] = [];
  @observable proofsListPast: any[] = [];
  @observable totalPoints: number = 0;
  @observable totalPointsPast: number = 0;

  constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }
  getStakingList = async (address: string, season: number, isPast: boolean) => {
    try {
      const res = await axios.get(
        backendUrl + `api/v1/claims/${season}/${address}`
      );
      if (isPast) {
        console.log(res.data.data.proofs);
        this.proofsListPast = res.data.data.proofs;
        return;
      }
      // this.list = res.data.data.positions.map((el: any, i: number) => {
      //   console.log(res.data.data.proofs[i]);
      //   return { ...el, proof: res.data.data.proofs[i] };
      // });
      this.proofsList = res.data.data.proofs;
      this.getStakingList(address, season - 1, true);
      // console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  getPoints = async (address: string, season: number, isPast: boolean) => {
    try {
      const res = await axios.get(
        backendUrl + `api/v1/points/${season}/${address}`
      );
      console.log(res.data);
      let pts = Number(
        res.data.data.positions.reduce(
          (acc: any, item: any) => acc + item.points,
          0
        )
      );
      if (isPast) {
        this.totalPointsPast = pts;
        this.pointsListPast = res.data.data.positions;
        return;
      }
      this.totalPoints = Number(
        res.data.data.positions.reduce(
          (acc: any, item: any) => acc + item.points,
          0
        )
      );
      this.pointsList = res.data.data.positions;
      this.getPoints(address, season - 1, true);
    } catch (e) {
      console.log(e);
    }
  };
}
