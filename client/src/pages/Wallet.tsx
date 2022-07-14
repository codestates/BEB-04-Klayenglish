import React from "react";

type walProps = {
  account: string;
  onClickConnect: any;
};

function Wallet({ account, onClickConnect }: walProps) {
  return (
    <div>
      {/* 3항 연산자를 이용 */}
      {/* account 가 있으면 (지갑연결이 되어있으면) disConnect 버튼이 나오고 */}
      {/* account 가 없으면 지갑 연결하라는 버튼이 나온다 */}
      {account ? (
        <div>
          <button>Wallet Connected</button>
          {account}
        </div>
      ) : (
        <div>
          <button onClick={onClickConnect}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
}

export default Wallet;
