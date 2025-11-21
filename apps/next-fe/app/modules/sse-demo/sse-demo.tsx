"use client";

import React, { useState, useEffect, useRef, use, useCallback } from "react";
import "./index.css";

interface SSEEvent {
  type: string;
  data: any;
  timestamp?: number;
}

interface SSERequest {
  chat_id: string;
  scenario: string;
  tools: Array<{ type: string; search: any }>;
  message: {
    parent_id: string;
    role: string;
    blocks: Array<{ message_id: string; text: { content: string } }>;
    scenario: string;
  };
  options: { thinking: boolean };
}

export const SSEDemo: React.FC = () => {
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [renderTxt, setRenderTxt] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 滚动到底部的函数
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  // 监听内容变化
  useEffect(() => {
    scrollToBottom();
  }, [renderTxt, scrollToBottom]);

  const requestData: SSERequest = {
    chat_id: "19a9a0a5-df82-8f0d-8000-09145e953ddf",
    scenario: "SCENARIO_CHAT",
    tools: [{ type: "TOOL_TYPE_SEARCH", search: {} }],
    message: {
      parent_id: "19a9a0a5-e3b2-857d-8000-0a1441a0b4e9",
      role: "user",
      blocks: [{ message_id: "", text: { content: "获取赤壁赋的内容" } }],
      scenario: "SCENARIO_K2",
    },
    options: { thinking: false },
  };

  const connectSSE = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setEvents([]);
      setRenderTxt("");

      // 使用 Fetch API 发送 POST 请求
      const response = await fetch("http://localhost:8080/chats/sse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      setIsConnected(true);
      setIsLoading(false);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const processStream = async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();

            if (done) {
              console.log("Stream completed");
              setIsConnected(false);
              break;
            }
            let event = "";
            let eventData = { content: "" };

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");

            // 保留最后一行不完整的消息
            buffer = lines.pop() || "";
            console.log("lines", lines);

            for (const item of lines) {
              const line = item.trim();

              if (line.startsWith("event:")) {
                event = line.substring(6).trim(); // 获取事件名称
              } else if (line.startsWith("data:")) {
                const jsonStr = line.split("data:")[1] || "{}"; // 获取数据部分
                try {
                  eventData = JSON.parse(jsonStr) as { content: string };
                } catch (e) {
                  console.error("JSON解析错误:", e);
                }
              } else if (line === "") {
                // 空行表示一个事件块结束
                if (event === "chunk" && eventData) {
                  setEvents((prev) => [
                    ...prev,
                    {
                      type: event,
                      data: eventData,
                    },
                  ]);

                  const { content } = eventData;
                  setRenderTxt((prev) => prev + content);
                }
                // 重置
                event = null;
                eventData = null;
              }
            }
          }
        } catch (error) {
          console.error("Stream reading error:", error);
          setError("读取流数据时发生错误");
          setIsConnected(false);
        }
      };

      processStream();
    } catch (error) {
      console.error("Connection error:", error);
      setError(`连接失败: ${error.message}`);
      setIsLoading(false);
      setIsConnected(false);
    }
  };

  console.log("events: ", events);

  const clearEvents = () => {
    setEvents([]);
  };

  return (
    <div className="sse-container">
      <div className="sse-header">
        <h1 className="!text-foreground">SSE 客户端</h1>
        <div className="status-indicator">
          <div
            className={`status-dot ${isConnected ? "connected" : "disconnected"}`}
          />
          <span>{isConnected ? "已连接" : "未连接"}</span>
        </div>
      </div>

      <div className="controls">
        <button
          onClick={connectSSE}
          disabled={isConnected || isLoading}
          className="btn btn-primary"
        >
          {isLoading ? "连接中..." : "模拟 SSE"}
        </button>

        <button onClick={clearEvents} className="btn btn-outline">
          清空记录
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>错误:</strong> {error}
        </div>
      )}

      <div className="events-container">
        <h3>事件流 ({events.length} 个事件)</h3>

        {events.length === 0 ? (
          <div className="empty-state h-[66dvh]">
            <p>暂无事件，点击"连接 SSE"开始接收数据</p>
          </div>
        ) : (
          <div className="text-background overflow-auto h-[66dvh]">
            {renderTxt}
            <div ref={scrollRef} />
          </div>
        )}
      </div>

      <div className="text-foreground">
        <details>
          <summary>请求数据</summary>
          <pre>{JSON.stringify(requestData, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
};
