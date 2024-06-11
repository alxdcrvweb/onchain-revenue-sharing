import { observer } from "mobx-react";
import { fromWeiToEth } from "../../utils/utilities";
import { useInjection } from "inversify-react";
import { Web3Store } from "../../stores/Web3Store";
import { StakingStore } from "../../stores/StakingStore";
import { ModalStore } from "../../stores/ModalStore";
import { ModalsEnum } from "../../modals";
import { useEffect, useState } from "react";
import AttentionModal from "../../modals/attentionModal";

const TableRow = observer(({ el, isPast }: { el: any; isPast: boolean }) => {
  const web3Store = useInjection(Web3Store);
  const stakeStore = useInjection(StakingStore);
  const modalStore = useInjection(ModalStore);
  const [openModal, setOpenModal] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isWithdrawn, setIsWithdrawn] = useState(false);

  const [proofs, setProofs] = useState<any>(undefined);
  // const withdraw = () => {
  //   web3Store.withdraw(el.positionId).then((res) => {
  //     if (res) {
  //       setTimeout(() => {
  //         stakeStore.getPoints(web3Store.address, web3Store.season);
  //       }, 2500);
  //     }
  //   });
  // };
  const withdraw = () => {
    setOpenModal(true);
    // modalStore.showModal(ModalsEnum.Attention, { positionId: el.positionId });
  };
  const claim = () => {
    web3Store
      .claim(el.positionId, proofs?.proof, proofs?.claimAmount)
      .then(() => {
        setIsClaimed(true);
      });
  };
  useEffect(() => {
    // if (el.positionId && stakeStore.proofsList.length !== 0) {
    if (!isPast && stakeStore.proofsList.length !== 0) {
      let ind = stakeStore.proofsList.findIndex(
        (l) => l.positionId == el.positionId
      );
      setProofs(stakeStore.proofsList[ind]);
    } else if (isPast && stakeStore.proofsListPast.length !== 0) {
      let ind = stakeStore.proofsListPast.findIndex(
        (l) => l.positionId == el.positionId
      );
      setProofs(stakeStore.proofsListPast[ind]);
    }
    // }
  }, [el.positionId, stakeStore.proofsListPast, stakeStore.proofsList]);
  // console.log(el, proofs, isPast);
  return (
    <>
      <div className="positions-details">
        <div className="staked-amount">{fromWeiToEth(el.depositAmount)}</div>
        <div className="points-earned">{el.points}</div>
        <div className="withdraw-button">
          {!isPast && (
            <div
              onClick={withdraw}
              style={{
                pointerEvents: isWithdrawn ? "none" : "auto",
                opacity: isWithdrawn ? 0.5 : 1,
              }}
            >
              Withdraw
            </div>
          )}
          {(isPast || proofs) && (
            <div
              onClick={claim}
              style={{
                pointerEvents:
                  !proofs || isClaimed || proofs?.isClaimed ? "none" : "auto",
                opacity: !proofs || isClaimed || proofs?.isClaimed ? 0.5 : 1,
              }}
            >
              Claim
            </div>
          )}
        </div>
      </div>
      {openModal && (
        <AttentionModal
          positionId={el.positionId}
          setModal={setOpenModal}
          setIsWithdrawn={setIsWithdrawn}
        />
      )}
      <style jsx>{`
        .positions-details {
          background-color: #0f0f0f;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 1fr;
          margin-top: 8px;
          gap: 20px;
          color: var(--White-W-64, rgba(255, 255, 255, 0.64));
          font-weight: 400;
          white-space: nowrap;
          letter-spacing: -0.48px;
          padding: 16px;
        }
        @media (max-width: 991px) {
          .positions-details {
            flex-wrap: wrap;
            padding-right: 20px;
            white-space: initial;
          }
        }
        .staked-amount {
          font-family: Inter, sans-serif;
        }
        .points-earned {
          color: var(--White-W-100, #fff);
          font-family: Inter, sans-serif;
          font-weight: 600;
        }
        .withdraw-button {
          text-align: right;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          flex: 1;
          cursor: pointer;
          font: 14px/24px Poppins, sans-serif;
        }
        .withdraw-button div:hover {
          color: white;
        }
      `}</style>
    </>
  );
});
export default TableRow;
