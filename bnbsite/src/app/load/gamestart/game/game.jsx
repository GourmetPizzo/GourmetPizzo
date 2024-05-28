"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Bodies,
  Body,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from "matter-js";
import { FRUITS_BASE } from "./fruits";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCountStore } from "@/app/Store";
import {
  ContractTotalABI,
  TotalAddress,
  UserAddress,
} from "@/app/contractStore";
import Web3 from "web3";

const GameComponent = (props) => {
  const { GameInfo, setGameInfo } = props;
  const CRef = useRef();
  const router = useRouter();
  const { Address, MyData } = useCountStore();
  const [Game, setGame] = useState(false);

  let currentBody = null;
  let disableAction = false;
  let count = true;

  const sound = {
    sum: typeof Audio !== "undefined" && new Audio("/sounds/coin2.mp3"),
  };

  const SumPoint = (prev, Addpoint) => {
    let SubPoint = Math.floor(Addpoint * 0.5);
    const Combo = prev.combo > 4 ? SubPoint : 0;
    const FeverTime = prev.feverTime ? SubPoint : 0;
    const result = Addpoint + Combo + FeverTime;

    return result;
  };

  useEffect(() => {
    const handleUserUpdate = async () => {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        sound.sum?.pause();
        setGame(false);

        const data = {
          point: GameInfo.point,
          User_Address: Address,
        };

        alert("Game over");
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(ContractTotalABI, TotalAddress);
        try {
          await contract.methods
            .userGameEnd(UserAddress, data.point)
            .send({ from: Address });

          await axios.post("/api/gameplay", data).then((res) => {
            console.log(res);
            return res;
          });
          router.push("/load/gamestart/mainpage");
        } catch (error) {
          router.push("/load/gamestart/mainpage");
          console.log("error : ", error);
        }
      } else {
        router.push("/load/gamestart/mainpage");
        console.warn(
          "MetaMask is not installed or window.ethereum is not available"
        );
      }
    };

    if (Game && GameInfo.point !== undefined) {
      handleUserUpdate();
    }
  }, [Game, GameInfo.point, setGame, Address, router]);

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      engine,
      canvas: CRef.current,
      options: {
        wireframes: false,
        background: "#FFFFFF",
        width: 620,
        height: 850,
      },
    });
    const world = engine.world;
    const mouse = Mouse.create(render.canvas);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    render.mouse = mouse;

    const leftWall = Bodies.rectangle(15, 395, 30, 850, {
      isStatic: true,
      render: { fillStyle: "#000000" },
    });

    const rightWall = Bodies.rectangle(605, 395, 30, 850, {
      isStatic: true,
      render: { fillStyle: "#000000" },
    });

    const ground = Bodies.rectangle(310, 835, 620, 30, {
      name: "ground",
      isStatic: true,
      render: { fillStyle: "#000000" },
    });

    const topLine = Bodies.rectangle(310, 150, 620, 2, {
      name: "topLine",
      isStatic: true,
      isSensor: true,
      render: { fillStyle: "#000000" },
    });

    World.add(world, [leftWall, rightWall, ground, topLine]);

    Render.run(render);
    Runner.run(engine);

    let currentFruit = null;
    let interval = null;
    function addFruit(positionX) {
      const index = Math.floor(Math.random() * 5);
      const fruit = FRUITS_BASE[index];

      const body = Bodies.circle(
        positionX ? positionX : 300,
        50,
        fruit.radius,
        {
          index: index,
          isSleeping: true,
          render: {
            sprite: { texture: `/${fruit.name}.png` },
          },
          restitution: 0.2,
        }
      );

      currentBody = body;
      currentFruit = fruit;

      World.add(world, body);
    }

    const PointUpdate = (index) => {
      const Addpoint = 2 ** index;
      setGameInfo((prev) => ({
        feverTime: prev.fever === 29 ? true : prev.feverTime,
        fever:
          prev.feverTime === true || prev.fever >= 30
            ? prev.fever
            : prev.fever + 1,
        combo: prev.combo + 1,
        point: prev.point + SumPoint(prev, Addpoint),
      }));
      count = true;
      sound.sum?.play();
    };
    const Combodown = () => {
      setGameInfo((prev) => ({
        ...prev,
        combo: 0,
      }));
    };

    const addBallOnClick = () => {
      currentBody.isSleeping = false;
      disableAction = true;
      setTimeout(() => {
        addFruit();
        disableAction = false; // setTimeout 밖으로 이동
      }, 430);
    };
    window.onkeydown = (event) => {
      if (disableAction) {
        return;
      }

      switch (event.code) {
        case "KeyA":
          if (interval) return;

          interval = setInterval(() => {
            if (currentBody.position.x - currentFruit.radius > 35)
              Body.setPosition(currentBody, {
                x: currentBody.position.x - 1,
                y: currentBody.position.y,
              });
          }, 5);
          break;

        case "KeyD":
          if (interval) return;

          interval = setInterval(() => {
            if (currentBody.position.x + currentFruit.radius < 585)
              Body.setPosition(currentBody, {
                x: currentBody.position.x + 1,
                y: currentBody.position.y,
              });
          }, 5);
          break;

        case "KeyS":
          addBallOnClick();
          break;
      }
    };

    window.onkeyup = (event) => {
      switch (event.code) {
        case "KeyA":
        case "KeyD":
          clearInterval(interval);
          interval = null;
      }
    };
    const handleMouseMove = (e) => {
      if (
        e.mouse.position.x - currentFruit.radius > 35 &&
        e.mouse.position.x + currentFruit.radius < 585 &&
        currentBody.isSleeping
      ) {
        Body.setPosition(currentBody, {
          x: e.mouse.position.x,
          y: currentBody.position.y,
        });
      }
    };
    const handleClick = () => {
      if (!disableAction) {
        addBallOnClick();
      }
      if (!count) {
        Combodown();
      }
      count = false;
    };
    Events.on(engine, "collisionStart", (event) => {
      const collidedFruits = new Set(); // 충돌한 과일의 인덱스를 저장하는 집합(Set)

      // 각 충돌에 대해 처리
      for (const collision of event.pairs) {
        const indexA = collision.bodyA.index;
        const indexB = collision.bodyB.index;
        const nameA = collision.bodyA.name;
        const nameB = collision.bodyB.name;

        if (!disableAction && (nameA === "topLine" || nameB === "topLine")) {
          setGame(true);
        } // 충돌한 두 개의 과일이 같은 인덱스를 가지고 있는지 확인
        else if (indexA === indexB && !collidedFruits.has(indexA)) {
          collidedFruits.add(indexA); // 충돌한 과일의 인덱스 저장
          const index = indexA;

          if (index === FRUITS_BASE.length - 1) {
            return;
          }

          World.remove(world, [collision.bodyA, collision.bodyB]);

          const newFruit = FRUITS_BASE[index + 1];

          const newBody = Bodies.circle(
            collision.collision.supports[0].x,
            collision.collision.supports[0].y,
            newFruit.radius,
            {
              render: {
                sprite: { texture: `/${newFruit.name}.png` },
              },
              index: index + 1,
            }
          );

          const result = World.add(world, newBody);
          if (result) {
            PointUpdate(index);
          }
        }

        // GameOver 알람창
      }
    });

    Events.on(mouseConstraint, "mousemove", handleMouseMove);
    CRef.current.addEventListener("click", handleClick);

    addFruit();

    return () => {
      Events.off(mouseConstraint, "mousemove", handleMouseMove);
      CRef.current?.removeEventListener("click", handleClick);
    };
  }, [currentBody, disableAction, count]);

  return <canvas ref={CRef} />;
};

export default GameComponent;
