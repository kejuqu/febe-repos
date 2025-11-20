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

export function Test() {
  const items = [
    {
      label: "SSE",
      value: "sse",
      content: <SSEDemo />,
    },
    {
      label: "websocket",
      value: "tab2",
      content: "Tab 2 content",
    },
    {
      label: "Tab 3",
      value: "tab3",
      content: "Tab 3 content",
    },
  ];

  return <TabsPro items={items} defaultValue="sse" />;
}
