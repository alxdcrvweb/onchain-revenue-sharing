import React from "react";
import ConnectButtonCustom from "./connectButtonCustom";
import style from "./connect.module.scss";
import Link from "next/link";
import {isMobile} from 'react-device-detect'
import { toast } from "react-toastify";
const Header: React.FC = () => {
  // const [hover, setHover] = React.useState(false);'

  const changeNetwork = async () => {
    if (!isMobile && window.ethereum) {
      try {
        //@ts-ignore
        await window?.ethereum?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x" + (27563).toString(16) }],
        });
      } catch (switchError: any) {
        if (switchError?.code === 4902) {
          try {
            //@ts-ignore
            await window?.ethereum?.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x" + (27563).toString(16),
                  chainName: "Onchain",
                  nativeCurrency: {
                    name: "Onchain",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: ["https://mainnet.onchaincoin.io/"],
                },
              ],
            });
          } catch (e) {
            console.log("%cWalletStore.ts line:212 e", "color: #007acc;", e);
          }
        }
        
        if (!window?.ethereum) {
          toast.warning('Change network on your wallet')
        }
      }
    }
  };

  return (
      <header className={style.header}>
        <Link href="/">
          <img src="/newLogo.png" alt="logo" />
        </Link>
        <div className={style.headerLinks}>
          <a
            className={style.link}
            href="#"
            target="_blank"
          >
            Roadmap
          </a>
          <a
            className={style.link}
            href="#"
            target="_blank"
          >
            Airdrop
          </a>
          <a
            className={style.link}
            href="https://t.me/onchaincoin_bot"
            target="_blank"
          >
            Onchain game
          </a>
          <a
            className={style.link}
            href="https://warpcast.com/~/channel/onchaincoin"
            target="_blank"
          >
            Warpcast
          </a>
          <a
            className={style.link}
            href="https://x.com/onchaincoin"
            target="_blank"
          >
            X
          </a>
          {/* <a
            className={style.link}
            ref="https://warpcast.com/~/channel/onchaincoin"
            target="_blank"
          >
            Add onchain
          </a> */}
          {/* <a
            className={style.link}
            href="https://warpcast.com/~/channel/onchaincoin"
            target="_blank"
          >
            WARPCAST
          </a> */}
          {/* <button onClick={changeNetwork} type="button" className={style.connect}>
            ADD ONCHAIN
          </button> */}
          <ConnectButtonCustom/>
        </div>
      </header>
  );
};

export default Header;
