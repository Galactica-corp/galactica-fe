export const TableHeader = () => {
  // grid-cols-[20px,2fr,2fr,100px,100px,150px]
  return (
    <div className="grid grid-cols-[1fr,3fr,2fr,2fr,2fr,2fr] items-center border-t border-mineShaft border-opacity-10 pb-5 pl-5 pt-4 font-semibold">
      <div>#</div>
      <div className="justify-self-start">Verified Guardian</div>
      <div className="justify-self-center">Score</div>
      <div className="justify-self-center">KYCs Issued</div>
      <div className="justify-self-center text-center">
        Avg. Verification Time
      </div>
      <div />
    </div>
  );
};
