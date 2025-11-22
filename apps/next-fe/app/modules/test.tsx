"use client";

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@repo/shared/components/ui/card";
import { TabsPro } from "@repo/shared/components/pro/tabs";
import { SSEDemo } from "./sse-demo/sse-demo";
import { WebSocketDemo } from "./websocket-demo/websocket-demo";
import { BigDataDemo } from "./webworker-demo/bigdata-demo";

export function Test() {
  const items = [
    {
      label: "SSE",
      value: "sse",
      content: <SSEDemo />,
    },
    {
      label: "websocket",
      value: "websocket",
      content: <WebSocketDemo />,
    },
    {
      label: "webworker",
      value: "webworker",
      content: <BigDataDemo />,
    },
  ];

  return <TabsPro items={items} defaultValue="sse" />;
}
