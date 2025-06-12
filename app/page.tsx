"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  return (
    <main className="grid grid-rows-[110px_1fr_70px] items-center justify-items-center min-h-screen ">
      <section className="bg-slate-800 w-full  flex items-center justify-center row-start-1 h-full">
        <p> header</p>
      </section>
      <section className="grid grid-cols-3 grid-rows-6 w-full bg-blue-200  row-start-2 h-full">
        <div className="flex flex-col bg-white row-start-2 col-start-2 row-end-5 text-black shadow rounded-3xl items-center justify-between">
          <h1 className="pb-3 pt-10">Bienvenue !</h1>
          <div className="flex flex-row gap-2 w-[80%] items-center justify-between">
            <input
              placeholder="name"
              className="border-2 rounded-3xl p-3 border-neutral-300 w-[50%]"
            ></input>
            <input
              placeholder="nickname"
              className="border-2 rounded-3xl p-3 border-neutral-300 w-[50%]"
            ></input>
          </div>
          <input
            placeholder="email"
            className="border-2 rounded-3xl p-3 border-neutral-300 mt-1 w-[80%]"
          ></input>
          <div className="grid grid-cols-2 w-full row-start-2 h-16">
            <button
              onClick={(): void =>
                console.log("L'utilisateur veut s'inscrire.")
              }
              className="flex col-start-1 bg-blue-500 w-full justify-center items-center rounded-bl-3xl font-bold text-white "
            >
              S'inscrire
            </button>
            <p className="flex col-start-2 bg-slate-800 w-full justify-center text-white items-center rounded-br-3xl font-bold">
              Se connecter
            </p>
          </div>
        </div>
      </section>
      <section className="flex w-full bg-neutral-800  items-center justify-center row-start-3 h-full">
        <p>footer</p>
      </section>
    </main>
  );
}
