import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { WaitingSection } from "../components/index";
import { exit_white, copy_icon } from "../assets/icon/index";
import { useWebSocketContext } from "../context/WebSocketContext";
import type { Participant } from "../api/websocket.types";
import Swal from "sweetalert2";

export const WaitingRoom = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [canFinishLoading, setCanFinishLoading] = useState(false);
  const [isGameStarting, setIsGameStarting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const { isConnected, lastMessage, sendMessage } = useWebSocketContext();

  useEffect(() => {
    console.log("========== WaitingRoom useEffect ==========");
    console.log("isConnected:", isConnected);
    console.log("roomCode:", roomCode);

    if (!isConnected) {
      console.log("연결 안됨, return");
      return;
    }

    if (roomCode) {
      console.log("이미 방 코드 있음, return");
      return;
    }

    const savedRoomCode = localStorage.getItem("gameRoomCode");
    if (savedRoomCode) {
      console.log("저장된 방 코드로 재입장:", savedRoomCode);
      setIsLoading(true);
      setCanFinishLoading(false);
      setTimeout(() => setCanFinishLoading(true), 1000);
      sendMessage({ type: "JOIN_ROOM", room_code: savedRoomCode });
      return;
    }

    const action = searchParams.get("action");
    const code = searchParams.get("roomCode");
    console.log("action:", action);
    console.log("code:", code);

    if (action === "create") {
      console.log("create_room 메시지 전송 시도");
      setIsLoading(true);
      setCanFinishLoading(false);
      setTimeout(() => setCanFinishLoading(true), 1000);
      sendMessage({ type: "CREATE_ROOM" });
      setSearchParams({});
    } else if (code) {
      console.log("join_room 메시지 전송 시도, 코드:", code);
      setIsLoading(true);
      setCanFinishLoading(false);
      setTimeout(() => setCanFinishLoading(true), 1000);
      sendMessage({ type: "JOIN_ROOM", room_code: code });
      setSearchParams({});
    }
  }, [isConnected, searchParams, roomCode, sendMessage, setSearchParams]);

  useEffect(() => {
    if (canFinishLoading && isLoading) {
      console.log("최소 로딩 시간 경과, 로딩 종료 가능");
      setIsLoading(false);
    }
  }, [canFinishLoading, isLoading]);

  useEffect(() => {
    if (!lastMessage) return;

    console.log("받은 메시지 처리:", lastMessage);

    switch (lastMessage.type) {
      case "ROOM_CREATED":
        console.log("방 생성 성공:", lastMessage.room_code);
        console.log("참가자 데이터:", lastMessage.data);
        setRoomCode(lastMessage.room_code);
        setParticipants(lastMessage.data || []);
        localStorage.setItem("gameRoomCode", lastMessage.room_code);
        setCanFinishLoading(true);
        break;

      case "USER_JOINED":
        console.log("참가자 입장/업데이트 (USER_JOINED)");
        console.log("방 코드:", lastMessage.room_code);
        console.log("전체 목록:", lastMessage.data);

        if (!roomCode && lastMessage.room_code) {
          console.log("처음 입장 - roomCode 설정 및 localStorage 저장");
          setRoomCode(lastMessage.room_code);
          localStorage.setItem("gameRoomCode", lastMessage.room_code);
          setCanFinishLoading(true);
        }

        setParticipants(lastMessage.data || []);
        break;

      case "ROOM_EXIT":
        console.log("ROOM_EXIT 메시지:", lastMessage);

        if (lastMessage.message?.includes("Successfully")) {
          console.log("방 나가기 성공");
          setCanFinishLoading(true);
          setRoomCode(null);
          setParticipants([]);
          localStorage.removeItem("gameRoomCode");
          navigate("/", { replace: true });
        } else if (lastMessage.data) {
          console.log("다른 참가자 퇴장:", lastMessage.data.nickname);
          setParticipants((prev) =>
            prev.filter((p) => p.user_id !== lastMessage.data?.user_id),
          );
        }
        break;

      case "GAME_READY":
        console.log(
          "게임 준비 완료! 4명 모임:",
          lastMessage.data?.participants,
        );
        setIsGameStarting(true);
        break;

      case "ERROR":
        console.error("에러:", lastMessage.message);
        setCanFinishLoading(true);

        if (lastMessage.message === "User is Already in This Room") {
          console.log("이미 방에 있음 (새로고침), localStorage에서 복구");
          const savedRoomCode = localStorage.getItem("gameRoomCode");
          if (savedRoomCode) {
            setRoomCode(savedRoomCode);
            setParticipants([]);
          }
          return;
        }

        Swal.fire({ icon: "error", title: "오류", text: lastMessage.message });
        localStorage.removeItem("gameRoomCode");
        navigate("/");
        break;
    }
  }, [lastMessage, navigate]);

  const handleCopyCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      Swal.fire({ icon: "success", title: "코드가 복사되었습니다!", timer: 1500, showConfirmButton: false });
    }
  };

  const handleExit = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "정말 방에서 나가시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "나가기",
      cancelButtonText: "취소",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    if (roomCode) {
      console.log("ROOM_EXIT 메시지 전송:", roomCode);
      sendMessage({ type: "ROOM_EXIT", room_code: roomCode });
    }

    localStorage.removeItem("gameRoomCode");
    navigate("/");
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      const savedGameRoomCode = localStorage.getItem("gameRoomCode");
      if (savedGameRoomCode) {
        console.log(
          "브라우저 닫기/새로고침 시 localStorage 정리:",
          savedGameRoomCode,
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      const savedGameRoomCode = localStorage.getItem("gameRoomCode");
      if (savedGameRoomCode) {
        console.log(
          "페이지 이탈 시 ROOM_EXIT 전송 및 localStorage 정리:",
          savedGameRoomCode,
        );
        if (isConnected) {
          sendMessage({ type: "ROOM_EXIT", room_code: savedGameRoomCode });
        }
        localStorage.removeItem("gameRoomCode");
      }
    };
  }, [isConnected, sendMessage]);

  useEffect(() => {
    if (!isGameStarting) return;

    if (countdown === 0) {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("access_token이 없습니다!");
        Swal.fire({ icon: "error", title: "로그인 정보가 없습니다", text: "다시 로그인해주세요." });
        navigate("/");
        return;
      }

      navigate("/game");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isGameStarting, countdown, roomCode, navigate]);

  if (isLoading) {
    return (
      <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[#FFFBEF]">
        <div className="text-3xl">로딩 중...</div>
      </div>
    );
  }

  if (isGameStarting) {
    return (
      <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[#FFFBEF]">
        <div className="flex flex-col items-center gap-12">
          <div className="text-2xl text-gray-700">3초 후 게임이 시작됩니다</div>
          <div
            key={countdown}
            className="text-9xl font-bold text-main-2 animate-[bounce_0.8s_ease-in-out]"
          >
            {countdown}
          </div>
          <div className="text-4xl font-bold text-main-2">준비하세요!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[#FFFBEF]">
      <div className="flex flex-col gap-[100px] items-center">
        <div className="w-[500px] h-[80px] flex justify-center items-center gap-5 rounded-[20px] border-4 border-main-2 bg-white text-3xl">
          초대코드: {roomCode || "생성 중..."}
          <img
            src={copy_icon}
            onClick={handleCopyCode}
            className="cursor-pointer"
          />
        </div>

        <WaitingSection participants={participants} />

        <button
          onClick={handleExit}
          disabled={isLoading}
          className="w-[280px] h-[80px] flex justify-center items-center bg-system-error text-3xl text-white gap-[10px] rounded-[20px] disabled:opacity-50"
        >
          탈출하기
          <img src={exit_white} />
        </button>
      </div>
    </div>
  );
};
