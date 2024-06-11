import { useInjection } from "inversify-react";
import { ModalStore } from "../stores/ModalStore";
import AttentionModal from "./attentionModal";
import { observer } from "mobx-react-lite";

export enum ModalsEnum {
  Attention,
}

const MODAL_REGISTRY = {
  [ModalsEnum.Attention]: AttentionModal,
};

export const ModalsContainer = observer(() => {
  const modalStore = useInjection(ModalStore);
  console.log(modalStore.activeModals);
  return (
    <>
      {modalStore.activeModals.map((m, i) => {
        const Component = MODAL_REGISTRY[m.key];
        console.log(Component);
        return <Component key={i} data={m.data} idx={i} />;
      })}
    </>
  );
});
