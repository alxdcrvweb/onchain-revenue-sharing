import * as React from "react";
import { ModalsEnum } from ".";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { Web3Store } from "../stores/Web3Store";
import { StakingStore } from "../stores/StakingStore";
import ModalContainer from "./ModalContainer";
import style from "./Modal.module.sass";
interface modalProps {
  key: ModalsEnum;
  data?: any;
  idx: ModalsEnum;
}
const AttentionModal = observer(
  ({
    positionId,
    setModal,
    setIsWithdrawn,
  }: {
    positionId: number;
    setIsWithdrawn: (w: boolean) => void;
    setModal: (m: boolean) => void;
  }) => {
    const web3Store = useInjection(Web3Store);
    const stakeStore = useInjection(StakingStore);
    const [blocked, setBlocked] = React.useState(false);
    const withdraw = () => {
      setBlocked(true);
      web3Store.withdraw(positionId).then((res) => {
        // if (res) {
        setTimeout(() => {
          // stakeStore.getPoints(web3Store.address, web3Store.season, false);
          setModal(false);
          setBlocked(false);
          setIsWithdrawn(true);
        }, 1000);
        // }
      });
    };

    return (
      <div className={style.fade}>
        <div className="attention-container">
          <div className="attention-content">
            <div className="attention-text">
              <div className="attention-icon">⚠️</div>
              <div className="attention-title">Attention!</div>
              <div className="attention-description">
                Withdrawing your position will result in the loss of all accrued
                rewards. Ensure you have reviewed the potential impact on your
                earnings before proceeding with the withdrawal.
              </div>
            </div>
            {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/528bb94cdf4d5cb1bb340993f70365efa697642f513da1cd1c8e3dc57250a201?"
            className="attention-image"
          /> */}
          </div>
          <div
            className="attention-button"
            style={{
              opacity: blocked ? 0.5 : 1,
              pointerEvents: blocked ? "none" : "auto",
            }}
            onClick={withdraw}
          >
            Withdraw
          </div>
          <div className="close-button" onClick={() => setModal(false)}>
            Close
          </div>
        </div>
        <style jsx>{`
          .attention-container {
            border: 1px solid rgba(255, 255, 255, 0.21);
            backdrop-filter: blur(18.149999618530273px);
            background-color: rgba(255, 255, 255, 0.06);
            display: flex;
            max-width: 588px;
            flex-direction: column;
            font-weight: 400;
            text-align: center;
            padding: 28px 24px 28px 48px;
          }
          @media (max-width: 991px) {
            .attention-container {
              padding: 0 20px;
            }
          }
          .attention-content {
            display: flex;
            align-items: start;
            gap: 0px;
          }
          @media (max-width: 991px) {
            .attention-content {
              flex-wrap: wrap;
            }
          }
          .attention-text {
            display: flex;
            margin-top: 8px;
            flex-direction: column;
          }
          @media (max-width: 991px) {
            .attention-text {
              max-width: 100%;
            }
          }
          .close-button {
            cursor: pointer;
            margin-top: 10px;
            margin-bottom: 20px;
          }
          .attention-icon {
            color: #000;
            letter-spacing: 2.8px;
            text-transform: uppercase;
            align-self: center;
            font: 56px/100% Poppins, sans-serif;
          }
          @media (max-width: 991px) {
            .attention-icon {
              font-size: 40px;
            }
          }
          .attention-title {
            color: var(--White-W-100, #fff);
            margin-top: 24px;
            font: 700 32px Poppins, sans-serif;
          }
          @media (max-width: 991px) {
            .attention-title {
              max-width: 100%;
            }
          }
          .attention-description {
            color: var(--White-W-64, rgba(255, 255, 255, 0.64));
            margin-top: 16px;
            font: 16px/24px Poppins, sans-serif;
          }
          @media (max-width: 991px) {
            .attention-description {
              max-width: 100%;
            }
          }
          .attention-image {
            aspect-ratio: 1;
            object-fit: auto;
            object-position: center;
            width: 24px;
          }
          .attention-button {
            justify-content: center;
            cursor: pointer;
            align-items: center;
            border: 1px solid rgba(0, 0, 0, 0.08);
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 199, 0, 0.06) 51%,
              rgba(153, 153, 153, 0) 100%
            );
            backdrop-filter: blur(18.149999618530273px);
            margin-top: 32px;
            color: var(--White-W-100, #fff);
            white-space: nowrap;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            padding: 16px 32px;
            font: 16px/150% Poppins, sans-serif;
          }
          @media (max-width: 991px) {
            .attention-button {
              max-width: 100%;
              white-space: initial;
              padding: 0 20px;
            }
          }
        `}</style>
      </div>
    );
  }
);

export default AttentionModal;
