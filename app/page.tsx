"use client";

import { log } from "console";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [onlineStatus, setOnlineStatus] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const createUser = async () => {
    try {
      const addingUser = await fetch(
        "http://localhost:4444/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            nickname,
            email,
            password
          })
        }
      );
      const data = await addingUser.json();
      console.log("Utilisateur créé :", data);

      setName("");
      setNickname("");
      setEmail("");
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };

  const logUser = async () => {
    try {
      const loggedUser = await fetch("http://localhost:4444/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        }),
        credentials: "include"
      });
      if (loggedUser.ok) {
        const data = await loggedUser.json();
        setUser(data);
        console.log("Utilisateur connecté :", data);
      } else {
        console.error("Erreur lors de la connexion de l'utilisateur");
      }
    } catch {}
  };

  useEffect(() => {
    const updateOnlineStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:4444/api/users/checkuser",
          {
            credentials: "include"
          }
        );
        if (response.ok) {
          setOnlineStatus(true);
        } else {
          setOnlineStatus(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du statut en ligne :",
          error
        );
        setOnlineStatus(false);
      }
    };

    updateOnlineStatus();
  }, [logUser]);

  return (
    <main className="grid grid-rows-[110px_1fr_70px] items-center justify-items-center min-h-screen ">
      <section className="bg-slate-800 w-full  flex items-center justify-center row-start-1 h-full">
        <p> The perfumer's workbook</p>
        <div
          className={`h-2 w-2 ml-10 ${!onlineStatus ? "bg-red-500" : "bg-green-500"}`}
        ></div>
      </section>
      <section className="grid grid-cols-3 grid-rows-5 w-full bg-blue-200  row-start-2 h-full">
        <div className="grid grid-rows-[auto_auto_auto_auto_auto_1fr] gap-4 bg-white row-start-2 col-start-2 row-end-4 text-black shadow rounded-3xl items-center justify-items-center">
          <h1 className="pb-3 pt-10">Bienvenue !</h1>

          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            required
            onChange={(e): void => setEmail(e.target.value)}
            className="border-2 rounded-3xl p-3 border-neutral-300 mt-1 w-[80%]"
          ></input>
          <div className="flex flex-row gap-2 w-[80%] items-center justify-between">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              required
              onChange={(e): void => setName(e.target.value)}
              className="border-2 rounded-3xl p-3 border-neutral-300 w-[50%]"
            ></input>
            <input
              placeholder="Nickname"
              name="nickname"
              value={nickname}
              type="text"
              required
              onChange={(e): void => setNickname(e.target.value)}
              className="border-1 rounded-3xl p-3 border-neutral-400 w-[50%] focus:placeholder-neutral-600 focus:border-purple-500 focus:outline-none placeholder-blue-800
              "
            ></input>
          </div>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(e): void => setPassword(e.target.value)}
            className="border-2 rounded-3xl p-3 border-neutral-300 mt-1 w-[80%]"
          ></input>
          <div className="grid grid-cols-2 w-full row-start-6 h-16">
            <button
              type="submit"
              onClick={createUser}
              className="flex col-start-1 bg-blue-500 w-full justify-center items-center rounded-bl-3xl font-bold text-white "
            >
              S'inscrire
            </button>

            <button
              type="submit"
              onClick={logUser}
              className="flex col-start-2 bg-slate-800 w-full justify-center text-white items-center rounded-br-3xl font-bold"
            >
              Se connecter
            </button>
          </div>
        </div>
      </section>
      <section className="flex w-full bg-neutral-800  items-center justify-center row-start-3 h-full">
        <p>footer</p>
      </section>
    </main>
  );
}
