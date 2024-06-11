import { observer } from "mobx-react";
import StakingComponent from "../components/staking/staking";
import UserPositions from "../components/staking/table";
import { useInjection } from "inversify-react";
import { Web3Store } from "../stores/Web3Store";
import { useEffect } from "react";
import UserPositionsPast from "../components/staking/tablePast";
import { StakingStore } from "../stores/StakingStore";

const Main = observer(() => {
  const web3store = useInjection(Web3Store);
  const stakingstore = useInjection(StakingStore);

  useEffect(() => {
    if (web3store) {
      web3store.getCurrentSeason();
    }
  }, [web3store]);
  return (
    <>
      <div className="container">
        {!web3store.isMidseason ? (
          <div className="main-page">
            <StakingComponent />
            <UserPositions />
            {stakingstore.totalPointsPast > 0 && web3store.season - 1 > 0 && (
              <UserPositionsPast />
            )}
          </div>
        ) : (
          <div className="cont">
            <div className="staking-container">
              <div className="staking-header">Onchain staking on pause</div>
              <div className="staking-subheader">
                <span>wait till next season</span> and claim your reward
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        .cont {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
        }
        .staking-container {
          align-items: start;
          display: flex;
          flex-direction: column;
          max-width: 1120px;
          width: 100vw;
          margin-top: 172px;
        }
        .staking-header {
          background: linear-gradient(
            94deg,
            rgba(255, 255, 255, 0.4) -1.07%,
            #fff 53.25%,
            rgba(255, 255, 255, 0.4) 104.41%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          padding-bottom: 5px;
          font: 400 32px/100% Poppins, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .staking-header {
            max-width: 100%;
          }
        }
        .staking-subheader {
          text-align: center;
          color: #fff;
          margin-top: 16px;
          font: 700 48px/52px "PoppinsBold", -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .staking-subheader span {
          background: var(
            --Gold,
            linear-gradient(141deg, #ffd600 -21.71%, #a23100 186.95%)
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (max-width: 991px) {
          .staking-subheader {
            max-width: 100%;
            font-size: 40px;
            line-height: 48px;
            text-align: left;
          }
        }
      `}</style>
    </>
  );
});
export default Main;
