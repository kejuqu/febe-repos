export function generateMockData(count) {
  const data = [];
  const statuses = ["pending", "processing", "success", "failed"];
  for (let i = 0; i < count; i++) {
    data.push({
      id: Math.random().toString(36).substring(2, 10),
      amount: Math.floor(Math.random() * 10000) + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      email: `user${i}@example.com`,
    });
  }

  return data;
}
