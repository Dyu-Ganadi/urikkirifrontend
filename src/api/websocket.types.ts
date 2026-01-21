export type WebSocketMessageType =
  | "CONNECTED"
  | "CREATE_ROOM"
  | "ROOM_CREATED"
  | "JOIN_ROOM"
  | "USER_JOINED"
  | "ROOM_EXIT"
  | "GAME_READY"
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
  room_code: string;
  data: Participant[];
  message: string;
}

export interface JoinRoomMessage {
  type: "JOIN_ROOM";
  room_code: string;
}

export interface UserJoinedMessage {
  type: "USER_JOINED";
  room_code: string;
  data: Participant[];
  message: string;
}

export interface GameReadyMessage {
  type: "GAME_READY";
  room_code: string;
  data: {
    participants: Participant[];
    message: string;
  };
  message: string;
}

export interface GameStartMessage {
  type: "GAME_START";
  room_code: string;
  data: {
    participants: Participant[];
    question: {
      quiz_id: number;
      content: string;
    };
  };
  message: string;
}

export interface RoomExitMessage {
  type: "ROOM_EXIT";
  room_code: string;
}

export interface RoomExitResponse {
  type: "ROOM_EXIT";
  room_code: string;
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
  | UserJoinedMessage
  | RoomExitResponse
  | GameReadyMessage
  | GameStartMessage
  | ErrorMessage;
