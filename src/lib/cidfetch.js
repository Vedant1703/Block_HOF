import { uploadFile } from './ipfs_config';
import { ethers } from 'ethers';
import AcademicNFT from "../contract_data/AcademicNFT.json"

import contractAddress from "../contract_data/AcademicNFT-address.json"

export const mintCertificate = async (file, student, title, issuer, grade) => {
  try {
    const cid = await uploadFile(file);
    if (!cid) return;

    const tokenURI = `ipfs://${cid}`;

    // Set up ethers
    const provider = new ethers.BrowserProvider(window.ethereum); // if using MetaMask
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, AcademicNFT.abi, signer);

    const tx = await contract.issueCertificate(student, title, issuer, grade, tokenURI);
    await tx.wait();

    console.log("NFT minted with tokenURI:", tokenURI);
  } catch (err) {
    console.error("Error minting certificate:", err);
  }
};
