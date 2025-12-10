const i18nPlugin = {
  // 使用方式 app.use(pluginName, options)
  install(app, options) {
    // 注册一个全局可用的 $t 方法
    app.config.globalProperties.$t = (key: string) => {
      //    使用key 作为索引， 获取 optoins 对象的深层属性
      return key.split('.').reduce((obj, key) => {
        if (obj) {
          return obj[key];
        }
      }, options);
    };

    // $t('greetings.hello') => '你好'
  },
};

export default i18nPlugin;
