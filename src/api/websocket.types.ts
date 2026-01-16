export type WebSocketMessageType =
  | "CONNECTED"
  | "CREATE_ROOM"
  | "ROOM_CREATED"
  | "JOIN_ROOM"
  | "ROOM_JOINED"
  | "USER_JOINED"
  | "ROOM_EXIT"
  | "GAME_START"
  | "ERROR";

export interface WebSocketMessage {
  type: WebSocketMessageType;
  message?: string;
}

export interface CreateRoomMessage {
  type: "CREATE_ROOM";
}

export interface Participant {
  user_id: number;
  nickname: string;
  level: number;
  is_examiner?: boolean;
}

export interface RoomCreatedMessage {
  type: "ROOM_CREATED";
  roomCode: string;
  data: Participant[];
  message: string;
}

export interface JoinRoomMessage {
  type: "JOIN_ROOM";
  roomCode: string;
}

export interface RoomJoinedMessage {
  type: "ROOM_JOINED";
  roomCode: string;
  data: Participant[];
  message: string;
}

export interface UserJoinedMessage {
  type: "USER_JOINED";
  roomCode: string;
  data: Participant[];
  message: string;
}

export interface GameStartMessage {
  type: "GAME_START";
  roomCode: string;
  data: {
    participants: Participant[];
    question: {
      quizId: number;
      content: string;
    };
  };
  message: string;
}

export interface RoomExitMessage {
  type: "ROOM_EXIT";
  roomCode: string;
}

export interface RoomExitResponse {
  type: "ROOM_EXIT";
  roomCode: string;
  data?: {
    user_id: number;
    nickname: string;
    remaining_count: number;
  };
  message: string;
}

export interface ErrorMessage {
  type: "ERROR";
  message: string;
}

export interface ConnectedMessage {
  type: "CONNECTED";
  message: string;
}

export type WSMessage =
  | ConnectedMessage
  | RoomCreatedMessage
  | RoomJoinedMessage
  | UserJoinedMessage
  | RoomExitResponse
  | GameStartMessage
  | ErrorMessage;
