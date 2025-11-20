import { Test } from "./modules/test";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold px-12 m-4 py-8 border border-accent rounded-2xl text-red-400">
        Hello world!
      </h1>
      <h2 className="text-foreground">
        <a href="https://nextjs.org/docs">Documentation</a>
      </h2>
      <main>
        <Link href="/chat">Go to chat</Link>
      </main>
      <Test />
    </div>
  );
}
