"use client";

import { useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AccountContext } from "@/context/AccountContext";
import { Header } from "@/components/Header";

export default function Home() {
  const accountContext = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    if (accountContext?.accountData?.address) {
      router.push("/mint");
    }
  }, [accountContext?.accountData, router]);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    accountContext?.setMessage(e.target.value);
  };

  return (
    <div
      className={`h-full flex flex-col before:from-white after:from-sky-200 py-2`}
    >
      <Header {...accountContext?.accountData} />
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="grid gap-4">
          <Image
            src="https://images.ctfassets.net/9sy2a0egs6zh/4zJfzJbG3kTDSk5Wo4RJI1/1b363263141cf629b28155e2625b56c9/mm-logo.svg"
            alt="MetaMask"
            width={320}
            height={140}
            priority
          />
          {accountContext?.accountData?.address ? (
            <>
              <input
                type="text"
                onChange={_onChange}
                className="border-black border-2 rounded-lg p-2"
              />
              <button
                onClick={accountContext._sendMessageToMetaMask}
                className="bg-black text-white p-4 rounded-lg"
              >
                Send Message
              </button>
            </>
          ) : (
            <button
              onClick={accountContext?._connectToMetaMask}
              className="bg-black text-white p-4 rounded-lg"
            >
              Connect to MetaMask
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
