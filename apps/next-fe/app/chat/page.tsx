"use client";

import React, { useState, useEffect, useRef } from "react";
import "./index.css";

interface SSEEvent {
  type: string;
  data: any;
  timestamp: number;
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

const SSEComponent: React.FC = () => {
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

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

      // 使用 Fetch API 发送 POST 请求
      const response = await fetch("http://localhost:8080/sse", {
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

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");

            // 保留最后一行不完整的消息
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("event:")) {
                const eventType = line.substring(6).trim();

                // 读取下一行（数据行）
                const { value: nextValue, done: nextDone } =
                  await reader.read();
                if (nextDone) break;

                const dataLine = decoder.decode(nextValue, { stream: false });
                if (dataLine.startsWith("data:")) {
                  const jsonData = dataLine.substring(5).trim();

                  try {
                    const data = JSON.parse(jsonData);
                    const newEvent: SSEEvent = {
                      type: eventType,
                      data,
                      timestamp: Date.now(),
                    };

                    setEvents((prev) => [...prev, newEvent]);
                  } catch (e) {
                    console.error("Error parsing JSON:", e);
                  }
                }
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

  const disconnectSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsConnected(false);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "connected":
        return "#10b981"; // green
      case "start":
        return "#3b82f6"; // blue
      case "chunk":
        return "#6b7280"; // gray
      case "end":
        return "#8b5cf6"; // purple
      case "error":
        return "#ef4444"; // red
      default:
        return "#6b7280"; // gray
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="sse-container">
      <div className="sse-header">
        <h1>SSE 客户端</h1>
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
          {isLoading ? "连接中..." : "连接 SSE"}
        </button>

        <button
          onClick={disconnectSSE}
          disabled={!isConnected}
          className="btn btn-secondary"
        >
          断开连接
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
          <div className="empty-state">
            <p>暂无事件，点击"连接 SSE"开始接收数据</p>
          </div>
        ) : (
          <div className="events-list">
            {events.map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-header">
                  <span
                    className="event-type"
                    style={{ backgroundColor: getEventColor(event.type) }}
                  >
                    {event.type}
                  </span>
                  <span className="event-time">
                    {formatTimestamp(event.timestamp)}
                  </span>
                </div>

                <div className="event-data">
                  <pre>{JSON.stringify(event.data, null, 2)}</pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="request-info">
        <details>
          <summary>请求数据</summary>
          <pre>{JSON.stringify(requestData, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
};

export default SSEComponent;
