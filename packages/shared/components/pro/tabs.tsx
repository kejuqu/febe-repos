"use client";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/shared/components/ui/tabs";
import { cn } from "@repo/shared/lib/utils";

type TabItem = React.ComponentProps<typeof TabsTrigger> & {
  label: React.ReactNode;
  content: React.ReactNode;
};

type TabProProps = {
  listProps?: React.ComponentProps<typeof TabsList>;
  contentProps?: Omit<React.ComponentProps<typeof TabsContent>, "value">;
  items: TabItem[];
} & React.ComponentProps<typeof Tabs>;

export function TabsPro({
  listProps = {},
  contentProps = {},
  items = [],
  ...tabsProps
}: TabProProps) {
  return (
    <Tabs {...tabsProps}>
      <TabsList {...listProps}>
        {items.map(({ label, value, className = "", ...item }) => (
          <TabsTrigger
            key={value}
            className={cn("cursor-pointer", className)}
            value={value}
            {...item}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value} {...contentProps}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
