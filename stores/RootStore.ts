import { Container } from "inversify";
import { ModalStore } from "./ModalStore";
import { useMemo } from "react";
import { Web3Store } from "./Web3Store";
// import {WalletStore} from "./WalletStore";
import "reflect-metadata";
import { GalleryStore } from "./GalleryStore";
// @ts-ignore
export class HistoryStore implements History {}
export class RootStore {
  public web3store: Web3Store;
  public container: Container;
  public modalStore: ModalStore;
  public galleryStore: GalleryStore;
  public constructor() {
    this.web3store = new Web3Store(this);
    this.galleryStore = new GalleryStore(this);
    this.modalStore = new ModalStore(this);
    this.container = new Container();
    this.container.bind(Web3Store).toConstantValue(this.web3store);
    this.container.bind(ModalStore).toConstantValue(this.modalStore);
    this.container.bind(GalleryStore).toConstantValue(this.galleryStore);
    this.container.bind(Container).toConstantValue(this.container);
  }
}

function initializeStore(initialData = null) {
  let store;
  let _store: any = store ?? new RootStore();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState?: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
