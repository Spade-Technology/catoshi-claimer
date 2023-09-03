import React from 'react'
import { Button } from 'react-bootstrap'
import { useEthers, ChainId } from '@usedapp/core'
import { toast } from 'react-toastify';
import {merkleDistibutor_abi, merkleDistibutor_address_mainnet, merkleDistibutor_address_rinkeby} from '../abis/MerkleDistributor'
import merkleTree from '../assets/merkle_tree'
import { fetchIsClaimed } from './fetchIsClaimed'
import { callClaim } from './callClaim'

import 'react-toastify/dist/ReactToastify.css';

export const Claim = () => {

  const { account, chainId, library } = useEthers()

  
  const handleClaimClick = () => {
    console.log({account}, ">>", account.toLocaleLowerCase(),  merkleTree.claims[account.toLocaleLowerCase()])
    if (!merkleTree.claims[account.toLocaleLowerCase()]){
      toast.warn('Sorry, no claim available for this address..', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return null;
    }

    const proof = merkleTree.claims[account.toLocaleLowerCase()];

    console.log({proof})
    const MERKEL_ADDRESS = chainId === ChainId.Mainnet ? merkleDistibutor_address_mainnet : chainId === 97 ? merkleDistibutor_address_rinkeby : '';
  
    const t = async () => {
      const isClaimed = await fetchIsClaimed(library.getSigner(), MERKEL_ADDRESS, merkleDistibutor_abi, proof.index)
  
      if (isClaimed.retroPoolV2){
        toast.info('Drop has already been claimed for this address.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return null;
      }

      const params = [proof.index, account, proof.amount, proof.proof]
      await callClaim(library.getSigner(), MERKEL_ADDRESS, merkleDistibutor_abi, params)
    }
    t()
  }

  return (
    <>
      <Button variant="dark" onClick={handleClaimClick} block>Claim</Button>
    </>
  )
}