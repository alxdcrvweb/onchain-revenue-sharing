import * as React from "react";
import TableRow from "./tableRow";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { StakingStore } from "../../stores/StakingStore";
import { Web3Store } from "../../stores/Web3Store";

const UserPositionsPast = observer(() => {
  const stakingStore = useInjection(StakingStore);
  const web3Store = useInjection(Web3Store);

  return (
    <>
      <div className="positions-container">
        <div className="positions-header">
          Claim rewards from season {web3Store.season - 1}
        </div>
        <div className="positions-summary">
          <div className="positions-staked">Total onchain staked</div>
          <div className="positions-points">Total points earned</div>
        </div>
        {stakingStore.pointsListPast.map((el, i) => {
          return <TableRow el={el} key={i} isPast={true} />;
        })}
      </div>
      <style jsx>{`
        .positions-container {
          display: flex;
          flex-direction: column;
          font-size: 16px;
          line-height: 150%;
          /* padding: 0 20px; */
          width: 95vw;
          max-width: 1200px;
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .positions-header {
          letter-spacing: 2.4px;
          text-transform: uppercase;
          background: linear-gradient(
            94deg,
            rgba(255, 255, 255, 0.4) -1.07%,
            #fff 53.25%,
            rgba(255, 255, 255, 0.4) 104.41%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          width: 100%;
          font: 400 48px/100% Poppins, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .positions-header {
            max-width: 100%;
            font-size: 40px;
          }
        }
        .positions-summary {
          background-color: #0f0f0f;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 1fr;
          margin-top: 39px;
          gap: 20px;
          color: var(--White-W-100, #fff);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 16px;
        }
        @media (max-width: 991px) {
          .positions-summary {
            flex-wrap: wrap;
          }
        }
        .positions-staked {
          font-family: Poppins, sans-serif;
          font-weight: 400;
        }
        .positions-points {
          font-family: Poppins, sans-serif;
          font-weight: 600;
          flex: 1;
        }
        @media (max-width: 991px) {
          .positions-points {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
});

export default UserPositionsPast;
