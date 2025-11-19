"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/shared/components/ui/card";
import { Input } from "@repo/shared/components/ui/input";
import { Label } from "@repo/shared/components/ui/label";
import { TabsPro } from "@repo/shared/components/pro/tabs";
import { Button } from "@repo/shared/components/ui/button";

export function Test() {
  const items = [
    {
      label: "Tab 1",
      value: "tab1",
      content: (
        <Card>
          <CardHeader>
            <CardTitle className=" text-foreground">Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-name">Name</Label>
              <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-username">Username</Label>
              <Input id="tabs-demo-username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      label: "Tab 2",
      value: "tab2",
      content: "Tab 2 content",
    },
    {
      label: "Tab 3",
      value: "tab3",
      content: "Tab 3 content",
    },
  ];

  return <TabsPro items={items} />;
}
