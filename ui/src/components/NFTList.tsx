import React from "react";
import Image from "next/image";

export type NFT = {
  id: number;
  title: string;
  imageUrl: string;
};

type NFTListProps = {
  nfts: NFT[];
  isFetching: boolean;
};

const NFTList = ({ nfts, isFetching }: NFTListProps) => {
  return (
    <div className="container mx-auto p-6 my-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        {isFetching ? "Is Fetching" : "NFT List"}
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="w-64 bg-white rounded-lg shadow-md overflow-hidden 
                       transition duration-300 ease-in-out transform 
                       hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-lg font-semibold bg-gray-100 p-3 text-center">
              {nft.title}
            </h2>
            <div className="relative h-48">
              <Image
                src={nft.imageUrl}
                alt={nft.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTList;
