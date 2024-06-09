import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";


export enum ModalsEnum {
  Mint,
  MintFinish,
}

const MODAL_REGISTRY = {

};

export const ModalsContainer = observer(() => {
  const modalStore = useInjection(ModalStore);

  return (
    <>
      {modalStore.activeModals.map((m, i) => {
        const Component = MODAL_REGISTRY[m.key];
        return <Component key={i} data={m.data} idx={i} />;
      })}
    </>
  );
});
