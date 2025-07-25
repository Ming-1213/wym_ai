# react 旅游 App
Readme.md 很重要，可以方便面试官了解项目
- 移动App
- 模仿 App
    - 喜欢的、国外的
    - 不要一模一样，要有点改变
    - 都适用于任何App

## 技术栈
- React 全家桶
    React组件开发
    组件的封装
    第三方组件库
    受控组件和非受控组件
    hooks编程 自定义的hooks
    React-Router-Dom
        SPA
        路由守卫
        懒加载
    Zustand
- mock 接口模拟
- axios 请求拦截和代理
- JWT 登录
- module css
- vite 配置
- 性能优化
    防抖节流
    useCallback useDemo ......
- css 预处理器 stylus
    flex transition transform...
- LLM
    - COZE、ChatGPT
    - 生图
    - 语言
    - coze 工作流 调用
    - 流式输出
- 移动端适配
    rem 
- 单例模式 体现我们对设计模式的理解
- git 提交等编程风格
## 项目的架构
- components
- pages
- store
- hooks
- api
- mock

## 开发前的准备
- 安装的包
    react-router-dom zustand axios react-vant（UI组件库）
    lib-flexible（移动端适配）
    开发期间的依赖
    vite-plugin-mock jwt 
- vite 配置
    - alias
    - mock
    - .env.local
    LLM apiKey
    - user-scalable
    - css 预处理
        index.css reset
        box-sizing font-family:-apply-system
        App.css 全局通用样式
        module.css 模块化样式
    - 移动端适配 rem
        不能用px，相对单位rem，针对的是html
        不同设备上体验要一致
        不同尺寸手机 等比例缩放 
        设计师设计稿 750px iphone 4 375pt *2 = 750
        小米 
        css 一行代码 手机的不同尺寸 html font-size 等比例的、动态的
        layout 
        flexible.js 阿里 在任何设备上
        1rem = 屏幕宽度/10
- lib-flexible
    阿里开源 
    设置html font- size= window.innerWidth / 10
    css 像素宽度 = 手机设备宽度 = 375
    1px = 2发光源
    750px 设计稿

- 设计稿上一个盒子的大小？
    - 1像素不差的还原设计稿
    - 设计稿中像素单位
    - /75 

## 项目亮点
- 移动端适配
    - lib-flexible 1rem = 屏幕宽度/10
    - 设计稿 尺寸是iphone 标准尺寸 750px
    - 1rem = 750px/10 = 750px
    - 前端的职责是还原设计稿
    - 频繁的单位换算 260/75 换算
    - 自动化？
        postcss + postcss-pxtorem
        postcss 是 css预编译器，很强大
        vite 自动读取postcss.config.js 将css文件编译
        px => rem
## git 提交规范
- 项目初始化
## 功能模块
- UI 组件库
    - react-vant 第三方组件库 70%的组件已经有了，不用写
    - 选择一个适合业务的UI组件库 或者公司内部的组件库
- 配置路由及懒加载
    - 懒加载
    - 路由守卫
    - Layout 组件
        - 嵌套路由Outlet 分组路由配置
        - 网页有几个模板 Layout
            - Route 不加path 对应的路由自动选择
            - tabbar 模板
            - blank 模板
        - tabbar
            - react-vant + @react-vant/icons
            - value + onChange 响应式
            - 直接点击链接分享 active 的设置
-chatbot 模块
   - LLM 模块 chat 封装
   - 迭代chat，支持任意模型 
## 项目亮点和难点
- 前端智能
    - chat 函数
    - 对各家模型比较感兴趣，升级为kimiChat,doubaoChat... 灵活
        各家大模型有性能、能力、性价比的差异
        随意切换大模型，通过参数抽象
- 原子css
    - App.css 里面添加了通用样式
    - 各自模块里module.css 不影响别的组件
    - lib-flexible 移动端适配
    - postcss pxtorem 插件 快速还原设计稿
    - 原子类的css，
        一个元素按功能逻辑拆分成多个类，和原子一样
        元素的样式就可以由这些原子类组合而成
        样式复用的更好，以后几乎可以不用写样式
## 项目遇到过什么问题，怎么解决的
- chat messages 遇到message 覆盖问题
- 闭包陷阱问题
    一次事件里面，两次setMessages()


- 自定义Hooks
    - useTitle
    一定要设置

- es6 特性使用
    tabbar 的高亮
    - arr.findIndex
    - str.startsWith
    - promise

- 项目迭代
    - 功能由浅入深
    - chatbot deepseek 简单chat
    - deepseek-r1 推理模型 
    - 流式输出
    - 上下文
    - coze 工作流接口调用 