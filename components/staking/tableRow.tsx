const TableRow = () => {
  return (
    <>
      <div className="positions-details">
        <div className="staked-amount">10,000</div>
        <div className="points-earned">500</div>
        <div className="withdraw-button">Withdraw</div>
      </div>
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
          font: 14px/24px Poppins, sans-serif;
        }
      `}</style>
    </>
  );
};
export default TableRow;
