// mock/api/products.js
import Mock from 'mockjs';

// 模拟商品列表接口
Mock.mock('/api/products', 'post', (options: any) => {
  // 解析请求参数（如果有的话）
  let page = 1;
  let pageSize = 10;
  let keyword = '';

  try {
    const body = JSON.parse(options.body || '{}');
    page = body.page || 1;
    pageSize = body.pageSize || 10;
    keyword = body.keyword || '';
  } catch (e) {
    // 如果解析失败，使用默认值
  }

  // 生成模拟数据
  const data = Mock.mock({
    'data|10': [
      {
        'id|+1': 1,
        name: '@ctitle(2, 4)', // 商品名称
        desc: '@cparagraph(1, 2)', // 商品描述
        category: '@pick(["水果", "蔬菜", "肉类", "海鲜", "零食"])', // 种类
        price: '@float(5, 100, 2, 2)', // 价格
        stock: '@integer(0, 500)', // 库存
        status: '@pick([0, 1])', // 状态：0-下架，1-上架
        image: '@image(80x80, #f0f9eb, #67c23a, product)',
        createTime: '@datetime',
      },
    ],
  });

  // 根据关键词过滤数据（简单实现）
  if (keyword) {
    data.data = data.data.filter(
      (item) => item.name.includes(keyword) || item.desc.includes(keyword)
    );
  }

  // 添加状态文字
  data.data.forEach((item) => {
    item.statusText = item.status === 1 ? '已上架' : '已下架';
    item.priceText = `¥${item.price}/斤`;
    item.stockText = `${item.stock}斤`;

    // 为商品添加图标和描述
    item.icon = item.image;
    item.fullDescription = `${item.name}\n${item.desc}`;
  });

  return {
    code: 200,
    message: 'success',
    data: data.data,
  };
});
