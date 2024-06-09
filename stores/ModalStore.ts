import { injectable } from "inversify";
import { RootStore } from "./RootStore";
import { action, makeObservable, observable } from "mobx";
import { ModalsEnum } from "../modals";
import "reflect-metadata";



export interface ModalEntry {
    key: ModalsEnum;
    data?: any;
}


export class ModalStore {
    activeModals: ModalEntry[] = [];

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
    }


    showModal = (key: ModalsEnum, data?: any) => {
        console.log('key', key);
        this.activeModals.push({ key, data });
        console.log(this.activeModals)
    }

    isVisible = (key: ModalsEnum) => {
        return this.activeModals.some(m => m.key === key);
    }

    hideModal = (idx: number) => {
        this.activeModals = this.activeModals.filter((m, i) => i !== idx);
    }

    hideAllModals = () => {
        this.activeModals = [];
    }
}
