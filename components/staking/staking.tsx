import * as React from "react";
import { observer } from "mobx-react";
import { useInjection } from "inversify-react";
import { Web3Store } from "../../stores/Web3Store";
import { StakingStore } from "../../stores/StakingStore";

const StakingComponent = observer(() => {
  const web3Store = useInjection(Web3Store);
  const stakingStore = useInjection(StakingStore);
  const [stakeValue, setStakeValue] = React.useState("0");
  const [blocked, setBlocked] = React.useState(false);

  const dep = async () => {
    setBlocked(true);
    await web3Store.depositWithAllowance(Number(stakeValue), setBlocked);
  };
  React.useEffect(() => {
    if (web3Store.address && web3Store.season !== undefined) {
      stakingStore.getPoints(web3Store.address, web3Store.season, false);
    }
  }, [web3Store.address, web3Store.season]);
  return (
    <>
      <div className="staking-container">
        <div className="staking-header">Onchain staking</div>
        <div className="staking-subheader">
          <span>Stake onchain</span> and earn rewards
        </div>
        <div className="staking-content">
          <div className="staking-main">
            <div className="staking-column">
              <div className="staking-input-section">
                <div className="staking-input-header">
                  <div className="staking-input-label">Enter the quantity</div>
                  <input
                    className="staking-input-value"
                    value={stakeValue}
                    onChange={(e) => {
                      if (
                        !isNaN(Number(e.target.value)) ||
                        e.target.value == "."
                      ) {
                        setStakeValue(e.target.value);
                      } else if (e.target.value == "") {
                        setStakeValue("");
                      }
                    }}
                  ></input>
                </div>
                <div className="staking-details">
                  <div className="staking-minimum">Min 1000 $onchain</div>
                  <div className="staking-rate">
                    <span style={{ color: "rgba(255,255,255,1)" }}>
                      1 ETH ={" "}
                    </span>
                    1000 points
                  </div>
                </div>
                <div
                  className="staking-button"
                  style={{
                    pointerEvents: !blocked ? "auto" : "none",
                    opacity: !blocked ? 1 : 0.5,
                  }}
                  onClick={dep}
                >
                  stake
                </div>
              </div>
            </div>
            <div className="staking-column-secondary">
              <div className="staking-summary">
                <div className="staking-total-points">
                  {stakingStore.totalPoints + stakingStore.totalPointsPast}
                </div>
                <div className="staking-total-label">Total points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx >{`
        .staking-container {
          align-items: start;
          display: flex;
          flex-direction: column;
          width: 100%;
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
        .staking-content {
          align-self: stretch;
          margin-top: 48px;
          width: 100%;
        }
        @media (max-width: 991px) {
          .staking-content {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .staking-main {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .staking-main {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .staking-column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 65%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .staking-column {
            width: 100%;
          }
        }
        .staking-input-section {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-size: 16px;
          max-width: 588px;
        }
        @media (max-width: 991px) {
          .staking-input-section {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .staking-input-header {
          justify-content: space-between;
          background-color: #0f0f0f;
          display: flex;
          gap: 8px;
          color: var(--White-W-64, rgba(255, 255, 255, 0.64));
          letter-spacing: -0.48px;
          line-height: 150%;
          padding: 16px;
        }
        @media (max-width: 991px) {
          .staking-input-header {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .staking-input-label {
          font-family: Inter, sans-serif;
          font-weight: 400;
        }
        .staking-input-value {
          text-align: right;
          font-family: Inter, sans-serif;
          font-weight: 600;
          background: none;
          outline: none;
          color: white;
        }
        .staking-details {
          justify-content: space-between;
          display: flex;
          margin-top: 8px;
          gap: 16px;
          font-size: 14px;
          letter-spacing: -0.42px;
          padding: 0 16px;
        }
        @media (max-width: 991px) {
          .staking-details {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .staking-minimum {
          color: var(--White-W-64, rgba(255, 255, 255, 0.64));
          font-family: Inter, sans-serif;
          font-weight: 400;
          line-height: 157%;
        }
        .staking-rate {
          color: #eab201;
          text-align: right;
          font-family: Inter, sans-serif;
          font-weight: 600;
          line-height: 22px;
        }
        .staking-button {
          font-family: Poppins, sans-serif;
          justify-content: center;
          align-items: center;
          /* border: 1px solid rgba(0, 0, 0, 0.08); */
          background-image: url(/mintbg.png);
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin-top: 42px;
          color: var(--White-W-100, #fff);
          font-weight: 400;
          white-space: nowrap;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          /* line-height: 150%; */
          padding: 16px 32px;
        }
        @media (max-width: 991px) {
          .staking-button {
            max-width: 100%;
            margin-top: 40px;
            white-space: initial;
            padding: 16px 32px;
          }
        }
        .staking-column-secondary {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 35%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .staking-column-secondary {
            width: 100%;
            margin-left: 0px;
          }
        }
        .staking-summary {
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.21);
          backdrop-filter: blur(18.149999618530273px);
          background-color: rgba(255, 255, 255, 0.06);
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          line-height: 100%;
          width: 100%;
          padding: 32px;
          width: 406px;
          padding-top: 10px;
        }
        @media (max-width: 991px) {
          .staking-summary {
            margin-top: 40px;
            padding: 0 20px;
            width: 100%;
          }
        }
        .staking-total-points {
          text-align: center;
          height: 100px;
          background: var(
            --Gold,
            linear-gradient(141deg, #ffd600 -21.71%, #a23100 186.95%)
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 80px;
          font: italic 700 80px "PoppinsBold", -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .staking-total-points {
            font-size: 40px;
            margin: 0 0px;
          }
        }
        .staking-total-label {
          color: var(--White-W-100, #fff);
          margin-top: 8px;
          text-align: center;
          font: 400 32px Poppins, sans-serif;
        }
        @media (max-width: 991px) {
          .staking-total-label {
            margin: 0 9px;
          }
        }
      `}</style>
    </>
  );
});

export default StakingComponent;
