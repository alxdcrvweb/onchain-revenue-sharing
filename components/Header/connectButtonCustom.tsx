import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { SeparatedConnect } from "./separatedConnect";
import style from "./connect.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import { Web3Store } from "../../stores/Web3Store";
import { useAccount } from "wagmi";

const ConnectButtonCustom = observer(
  ({ isHeader, isAuth }: { isHeader?: boolean; isAuth?: boolean }) => {
    const {
      setCorrectChain,
      setProvider,
      isInitConnect,
      address
    } = useInjection(Web3Store);

    const router = useRouter();
    useEffect(() => {
      if (router.asPath.includes("connect") && (address)) {
        router.push("/");
      }
    }, [address, router.asPath]);

    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openChainModal,
          authenticationStatus,
          mounted,
        }) => {
          // const connect = useConnect()
          // console.log(connect, window.ethereum);
          const { connector } = useAccount();

          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");
          // useEffect(()=>{
          //   if(claim!==0) {
          //     setReward(Number(Number(fromWei(claim.toString())).toFixed(2)))
          //   }
          // },[claim])
          useEffect(() => {
            if (connector) {
              // console.log("connector", connector, account);
              getProvider();
            }
          }, [connector]);
          useEffect(()=>{
            if(!chain?.unsupported) {
              setCorrectChain(true)
            } else {
              setCorrectChain(false)
            }
          },[chain])
          const getProvider = async () => {
            try {
              if (!isInitConnect) {
                const res = await connector?.getProvider();
                setProvider(res, account?.address);
              }
            } catch (e) {
              console.log(e);
            }
          };
          // useEffect(() => {
          //   setConnected(connected as boolean);
          //   console.log("account:", account);
          //   // if (
          //   //   user?.account?.address.toLowerCase() !== account?.address?.toLowerCase()
          //   // ) {
          //   //   setNeedChangeWallet(true);
          //   // } else {
          //   //   setNeedChangeWallet(false);
          //   // }
          //   if (connected) {
          //     setAddress(account);
          //   } else {
          //     disconnected();
          //   }
          // }, []);
          // useEffect(() => {
          //   if (account?.address ) {
          //     setAddress(walletClient?.transport, account?.address);
          //   }
          // }, [account?.address]);
          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (chain?.unsupported) {
                  return (
                    <SeparatedConnect />
                  );
                }

                return <SeparatedConnect />;
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  }
);
export default ConnectButtonCustom;
