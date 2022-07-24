import React, { useState } from "react";
import erc721Abi from "../erc721Abi";

function Erc721({ newErc721addr, web3, account, erc721list }) {
  const [to, setTo] = useState("");
  const sendToken = async (tokenId) => {
    const tokenContract = await new web3.eth.Contract(
      erc721Abi,
      newErc721addr,
      { from: account }
    );
    tokenContract.methods
      .transferFrom(account, to, tokenId)
      .send({ from: account })
      .on("receipt", (receipt) => {
        setTo("");
      });
  };
  return (
    <div className="erc721list">
      {erc721list.map((token) => {
        return (
          <div className="erc721Token" key={token.tokenId}>
            Name: <span className="name">{token.name}</span>(
            <span className="symbol">{token.symbol}</span>)
            <div className="nft">id: {token.tokenId}</div>
            <img src={token.tokenURI} width={300} />
            <div className="tokenTransfer">
              To:
              <input
                type="text"
                value={to}
                onChange={(event) => {
                  setTo(event.target.value);
                }}
              />
              <button
                className="sendTokenBtn"
                onClick={sendToken.bind(this, token.tokenId)}
              >
                sendToken
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Erc721;
