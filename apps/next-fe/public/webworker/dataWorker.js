import { generateMockData } from "./gen-bigdata"; // 这一步需要 new Worker 的时候指定 type: module

self.onmessage = ({ data }) => {
  const { type, payload } = data;

  switch (type) {
    case "generateAndAggregate": {
      const { count } = payload;
      const bigData = generateMockData(count);
      console.log("bigData::: ", bigData);
      const sum = bigData.reduce((acc, d) => acc + d.amount, 0);
      const avg = sum / bigData.length;
      self.postMessage({ sum, avg });
      break;
    }
    case "aggregate": {
      const { listData } = payload;
      const sum = listData.reduce((acc, d) => acc + d.amount, 0);
      const avg = sum / listData.length;
      self.postMessage({ sum, avg });
      break;
    }

    case "filterHighValue":
      self.postMessage(payload.filter((x) => x.amount > 9000)); // Adjusted for new data structure
      break;

    case "unique":
      self.postMessage([...new Set(payload)]);
      break;

    default:
      self.postMessage({ error: "Unknown task" });
  }
};
