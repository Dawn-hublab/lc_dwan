module.exports = {
  pages: [
    {
      path: 'pages/index/index',
      style: {
        navigationBarTitleText: '%index.title%',
      },
    },
    {
      path: 'pages/component/component',
      style: {
        navigationBarTitleText: '%index.component%',
        enablePullDownRefresh: false,
      },
    },
    {
      path: 'pages/api/api',
      style: {
        navigationBarTitleText: '%index.api%',
        enablePullDownRefresh: false,
      },
    },
    {
      path: 'pages/schema/schema',
      style: {
        navigationBarTitleText: '%index.schema%',
        enablePullDownRefresh: false,
      },
    },
    {
      path: 'pages/schema/authentication',
      style: {
        navigationBarTitleText: '%index.schema%',
      },
    },
    {
      path: 'pages/signature/signature',
      style: {
        navigationBarTitleText: '%index.schema%',
      },
    },
  ],
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#007AFF',
    borderStyle: 'black',
    backgroundColor: '#F8F8F8',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '%index.home%',
      },
      {
        pagePath: 'pages/component/component',
        text: '%index.component%',
      },
      {
        pagePath: 'pages/api/api',
        text: '%index.api%',
      },
      {
        pagePath: 'pages/schema/schema',
        text: '%index.schema%',
      },
    ],
  },
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uni-app',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
  },
}
