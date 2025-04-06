"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../contract_data/AcademicNFT.json";
import contractAddress from "../contract_data/AcademicNFT-address.json";
import { title } from "framer-motion/client";

export default function Page() {
  const [value, setValue] = useState(""); 
  const [retrievedValue, setRetrievedValue] = useState(null);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [userBalance, setUserBalance] = useState(null);

  const funcParams = {
    student: "0x4799CC4983a60DFe11233871c6E0D380179A056D",
    title: "test certi",
    issuer: "teacher",
    grade: 7,
    tokenURI: "ipfs://HASH_"
  }

  // Initialize Provider, Signer, and Contract
  const initializeEthers = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }
    
    try {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      const _contract = new ethers.Contract(contractAddress.address, contractABI.abi, _signer);

      setProvider(_provider);
      setSigner(_signer);
      setContract(_contract);

      const accounts = await _provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error initializing ethers:", error);
    }
  };

  // Set value in contract
  const setContractValue = async () => {
    if (!contract) return alert("Please connect wallet first!");
    try {
      const tx = await contract.set(BigInt(value)); // Convert string to BigInt
      await tx.wait(); // Wait for transaction confirmation
      alert("Value set successfully!");
    } catch (error) {
      console.error("Error setting value:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      initializeEthers();
    }
  }, []);

  const issueCerti = async () => {
    if (!contract) return alert("Please connect wallet first!");
  
    try {
      const { student, title, issuer, grade, tokenURI } = funcParams;
  
      const tx = await contract.issueCertificate(
        student,          // address
        title,            // string
        issuer,           // string
        Number(grade),    // uint256 (make sure it's a number)
        tokenURI          // string (usually an IPFS URI)
      );
  
      await tx.wait();
      console.log("Transaction successful:", tx);
    } catch (error) {
      console.error("Error issuing certificate:", error);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button onClick={issueCerti}>Button</button>
    </div>
  );
}
