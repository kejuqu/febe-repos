self.onmessage = ({ data }) => {
  console.log("data: ", data);
  const { type, payload } = data;

  switch (type) {
    case "generateAndAggregate": {
      const { count } = payload;
      const data = Array.from({ length: count }, () => ({
        value: Math.random() * 100,
      }));
      const sum = data.reduce((acc, d) => acc + d.value, 0);
      const avg = sum / data.length;
      self.postMessage({ sum, avg });
      break;
    }
    case "aggregate": {
      const { listData } = payload;
      const sum = listData.reduce((acc, d) => acc + d.value, 0);
      const avg = sum / listData.length;
      self.postMessage({ sum, avg });
      break;
    }

    case "filterHighValue":
      self.postMessage(payload.filter((x) => x.value > 90));
      break;

    case "unique":
      self.postMessage([...new Set(payload)]);
      break;

    default:
      self.postMessage({ error: "Unknown task" });
  }
};
