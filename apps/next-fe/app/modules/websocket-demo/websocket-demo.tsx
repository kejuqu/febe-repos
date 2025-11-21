"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@repo/shared/components/ui/button";
import { Input } from "@repo/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shared/components/ui/card";

interface Message {
  id: number;
  username: string;
  content: string;
  created_at: string;
}

export function WebSocketDemo() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:8080"); // Adjust the URL to your NestJS backend
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
      newSocket.emit("requestAllMessages");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    newSocket.on("allMessages", (allMessages: Message[]) => {
      setMessages(allMessages);
    });

    newSocket.on("newMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && message.trim() && username.trim()) {
      socket.emit("sendMessage", { username, content: message });
      setMessage("");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>WebSocket Chat</span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              isConnected
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.username === username ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${
                msg.username === username
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <p className="font-bold text-sm">{msg.username}</p>
              <p>{msg.content}</p>
              <p className="text-xs text-right opacity-75">
                {new Date(msg.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-4 flex gap-2">
        <Input
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-1/4"
        />
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </CardFooter>
    </Card>
  );
}
