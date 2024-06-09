import StakingComponent from "../components/staking/staking";
import UserPositions from "../components/staking/table";

const Main = () => {
  return (
    <div className="container">
      <div className="main-page">
        <StakingComponent />
        <UserPositions />
      </div>
    </div>
  );
};
export default Main;
