import { useConnectModal } from "@rainbow-me/rainbowkit";
import classNames from "classnames";
import { observer } from "mobx-react";
import style from "./connect.module.scss";
import { Web3Store } from "../../stores/Web3Store";
import { useInjection } from "inversify-react";
import { addressSlice } from "../../utils/utilities";
export const SeparatedConnect = observer(
  ({ cssClassProps }: { cssClassProps?: any }) => {
    const { openConnectModal } = useConnectModal();
    const web3store = useInjection(Web3Store);
    return (
      <button
        onClick={() => {
          web3store.setInitConnect(false);
          openConnectModal && openConnectModal();
        }}
        type="button"
        className={classNames(style.connect)}
      >
       {!web3store.address ? 'CONNECT' : addressSlice(web3store.address)}
      </button>
    );
  }
);
