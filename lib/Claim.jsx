import React from "react";
import { Button } from "react-bootstrap";
import { useEthers, ChainId } from "@usedapp/core";
import { toast } from "react-toastify";
import {
  merkleDistibutor_abi,
  merkleDistibutor_address_mainnet,
  merkleDistibutor_address_rinkeby,
} from "../abis/MerkleDistributor";
import merkleTree from "../assets/merkle_tree";
import { fetchIsClaimed } from "./fetchIsClaimed";
import { callClaim } from "./callClaim";

import "react-toastify/dist/ReactToastify.css";
import { Catoshi_Mainnet, Catoshi_Testnet } from "../shared/config";
import axios from "axios";

export const Claim = () => {
  const { account, chainId, library } = useEthers();


  const Catoshi_Network = chainId === Catoshi_Mainnet.chainID
  ? Catoshi_Mainnet
  : chainId === Catoshi_Testnet.chainID
  ? Catoshi_Testnet
  : "";

  const handleClaimClick = async () => {
    const merkleData = await axios.get(Catoshi_Network.ipfs).then((res) => {
      return res.data
    })

    if (!merkleData.claims[account.toLocaleLowerCase()]) {
      toast.warn("Sorry, no claim available for this address..", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { background: "rgb(255,166,76,1)", color: "black" },
      });
      return null;
    }
    
    const proof = merkleData.claims[account.toLocaleLowerCase()];

    const MERKEL_ADDRESS = Catoshi_Network.claim_Contract

    const t = async () => {
      const isClaimed = await fetchIsClaimed(
        library.getSigner(),
        MERKEL_ADDRESS,
        Catoshi_Network.abi,
        proof.index
      );
      console.log("response claimed", isClaimed)

      if (isClaimed.retroPoolV2) {
        toast.info("Drop has already been claimed for this address.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return null;
      }

      const params = [proof.index, account, proof.amount, proof.proof];
      await callClaim(
        library.getSigner(),
        MERKEL_ADDRESS,
        Catoshi_Network.abi,
        params
      );
    };
    t().then((res) => {
      console.log("response res", res)
    }).catch((error) => {
      console.log("response error", error)
    });
  };

  return (
    <>
      <Button
        variant="dark"
        style={{ background: "rgb(255,166,76,1)", color: "black", fontSize:"18px", border:"none" }}
        onClick={handleClaimClick}
        block
      >
        Claim
      </Button>
    </>
  );
};
