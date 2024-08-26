"use client";

import NFTList, { NFT } from "@/components/NFTList";
import { ethers } from "ethers";
import { abi } from "./abi";
import { useEffect, useState } from "react";

export default function Mint() {
  // const nfts: NFT[] = [
  //   {
  //     id: 1,
  //     title: "Card 1",
  //     imageUrl:
  //       "https://cdn.dribbble.com/userupload/3253308/file/original-539dc1d012b5bc54a37499c4cd73fecd.png?resize=1200x900",
  //   },
  //   {
  //     id: 2,
  //     title: "Card 2",
  //     imageUrl:
  //       "https://cdn.dribbble.com/userupload/3253308/file/original-539dc1d012b5bc54a37499c4cd73fecd.png?resize=1200x900",
  //   },
  //   {
  //     id: 3,
  //     title: "Card 3",
  //     imageUrl:
  //       "https://cdn.dribbble.com/userupload/3253308/file/original-539dc1d012b5bc54a37499c4cd73fecd.png?resize=1200x900",
  //   },
  //   // Add more cards as needed
  // ];
  const [fetchNFT, setFetchNFT] = useState<NFT[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      setIsFetching(true);
      const networkUrl = `https://sepolia.infura.io/v3/${
        process.env.NEXT_PUBLIC_INFURA_API_KEY as string
      }`;
      const provider = new ethers.JsonRpcProvider(networkUrl);
      const contractAddress = "0x8233A20B56fdDB8258Da950802a752C71A6afb2D";

      const contract = new ethers.Contract(contractAddress, abi, provider);
      console.log(`contract: ${contract}`);
      // const ownerAddress = "0x340A618d86507467a070DdF3D51A3F51A9d4Fb86";
      const tokenURI = await contract.tokenURI(0);
      console.log(`tokenURI: ${tokenURI}`);
      const nfts = [{ id: 0, imageUrl: tokenURI, title: "" }];
      setFetchNFT(nfts);
      // const response = await fetch(tokenURI);
      // console.log(`response: ${response}`);
      // const metadata = await response.json();
      // console.log(`metadata: ${metadata}`);

      // const balance = await contract.balanceOf(ownerAddress);

      // const nfts: NFT[] = [];

      // // Loop through each token ID and fetch the metadata
      // for (let i = 0; i < balance; i++) {
      //   const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i);
      //   const tokenURI = await contract.tokenURI(tokenId);

      //   // Fetch the metadata from the token URI (optional)
      //   const response = await fetch(tokenURI);
      //   const metadata = await response.json();

      //   nfts.push({
      //     id: tokenId.toNumber(),
      //     title: metadata.name,
      //     imageUrl: metadata.image,
      //   });
      // }

      // console.log("NFTs:", nfts);
      // setFetchNFT(nfts);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      <NFTList nfts={fetchNFT} isFetching={isFetching} />
    </div>
  );
}
