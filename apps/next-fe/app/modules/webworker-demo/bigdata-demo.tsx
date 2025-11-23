import { useState } from "react";
import useWorker from "./use-worker";
import { Input } from "@repo/shared/components/ui/input";

interface MockDataItem {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

// Helper function to generate large data
const generateMockData = (count: number): MockDataItem[] => {
  const data: MockDataItem[] = [];
  const statuses: MockDataItem["status"][] = [
    "pending",
    "processing",
    "success",
    "failed",
  ] as const;
  for (let i = 0; i < count; i++) {
    data.push({
      id: Math.random().toString(36).substring(2, 10),
      amount: Math.floor(Math.random() * 10000) + 1,
      status: statuses[
        Math.floor(Math.random() * statuses.length)
      ] as MockDataItem["status"],
      email: `user${i}@example.com`,
    });
  }
  return data;
};

export function BigDataDemo() {
  const [result, setResult] = useState<{
    sum: number;
    avg: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [useWebWorker, setUseWebWorker] = useState(true);
  const [processingTime, setProcessingTime] = useState<number | null>(null);
  const runWorker = useWorker("/webworker/dataWorker.js");

  const bigCount = 1_000_000; // Increased for substantial comparison
  const handleProcess = async () => {
    setLoading(true);
    setResult(null);
    setProcessingTime(null);
    const startTime = performance.now();

    try {
      let res;
      if (useWebWorker) {
        res = await runWorker({
          type: "generateAndAggregate",
          payload: {
            count: bigCount,
          },
        });
      } else {
        // Main thread processing for comparison
        const bigData = generateMockData(bigCount);
        const sum = bigData.reduce((acc, d) => acc + d.amount, 0);
        const avg = sum / bigData.length;
        res = { sum, avg };
      }
      setResult(res);
    } catch (error) {
      console.log(error);
    } finally {
      const endTime = performance.now();
      setProcessingTime(endTime - startTime);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <div className="flex items-center space-x-2">
        <label htmlFor="inputText" className="text-foreground">
          interaction:
        </label>
        <Input type="text" id="inputText" />
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="checkbox"
          id="useWorker"
          checked={useWebWorker}
          onChange={() => setUseWebWorker(!useWebWorker)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
        />
        <label htmlFor="useWorker" className="text-foreground">
          使用 Web Worker
        </label>
      </div>

      <button
        onClick={handleProcess}
        className="bg-blue-600 text-foreground px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "处理中..." : "处理 100 万条数据"}
      </button>

      {loading && (
        <p className="text-gray-500 text-lg animate-pulse">
          数据处理中，请稍候…
        </p>
      )}

      {result && (
        <div className="bg-accent rounded-xl shadow p-6 text-center w-full max-w-sm">
          <p className="text-xl font-bold">总数: {result.sum.toFixed(2)}</p>
          <p className="text-lg opacity-80 mt-2">
            平均值: {result.avg.toFixed(2)}
          </p>
        </div>
      )}

      {processingTime !== null && (
        <div className="mt-4 text-center text-foreground">
          <p>
            处理方式:{" "}
            <span className="font-semibold">
              {useWebWorker ? "Web Worker" : "主线程"}
            </span>
          </p>
          <p>
            处理耗时:{" "}
            <span className="font-semibold">
              {processingTime.toFixed(2)} ms
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
