# 项目说明
这是一个用来替换ABP 免费模板中前端部分的项目，因ABP免费模板的前端框架实在是太难用了。
### 后台框架：[ABP](https://aspnetboilerplate.com/)
### 前端框架：依赖组件库 [ng-Zorro](https://github.com/NG-ZORRO/ng-zorro-antd)

## 演示地址

[ABP&Ng-zorro-antd Demo](http://abp-zorro.woow.site/) 渣服务器，请轻撸！

登录帐号密码为ABP默认帐号密码admin/123qwe

angular文件较大，服务器带宽较小，需要多等待一下！！！

# 改动说明
ABP core免费版的默认angular工程组件框架替换成 ng-Zorro，无其他前端框架依赖，无ng-alain依赖。

由于有代码迁移，因此大量复制了[delon](https://github.com/cipchk/delon)的代码，在此向delon作者 [cipchk](https://github.com/cipchk) 赠送小红花 :hibiscus: 表示感谢！

## 改动原则
保持ABP免费版默认模板结构和设计的前提尽可能多的迁移ng-alain与delon，现在的迁移方式是将使用到ng-alain与delon的代码直接复制到本项目下，并不直接依赖ng-alain与delon。

绝大部分改动保持ng-alain与delon相同使用接口，除非ng-alain与delon的原则与ABP相违背则会采用ABP设计方案

## 与ng-alain不同之处
本项目与ABP代码结构基本一致，因部分小伙伴是从ng-alain看到这的，因此在这描述一下重要的不同点。

- 项目采用了类似区域的概念（我也不知道该叫什么名字，暂时就叫区域吧，如果你知道官方的说法麻烦告诉我一声）即可以有多个app，本项目内`src/account`与`src/app`两个是同级别的模块，各自都有自己的layout、MenuService实例等，使用时可自行增加更多区域。
- 项目使用到的国际化、ACL等都采用ABP的方案。

## 具体改动内容
1. 前端主题采用ng-alain，代码存放在 src/theme
2. 保持默认模板代码结构，而非ng-alain代码结构
3. 移除了SignalR相关代码（因为我不用，如果需要请自行添加相关代码）
4. 增加MenuService用于管理应用程序菜单数据（此服务功能与delon/theme的MenuService实现有所不同）
5. 从delon迁移的组件存放在 src/shared/components下


# 使用方法
现在本项目还没有项目生成器（我暂时也没打算写这个），要正确运行，需要替换从ABP官方创建的项目中angular所有代码需要针对你的项目名称内容进行一些修改。

## 与abp后端配对运行需要修改的文件
- src/shared/AppConsts.ts 这个文件的 defaultLocalizationSourceName 的值，如果你不知道填什么，那么参考你从ABP那创建的模板这个文件的值。
- src/app/layout/default/sidebar/sidebar-nav.component.ts 的菜单项目。
- src/app/pages/* 从别处copy来的代码，暂时占位用，代码写法上还未修改成ng-Zorro规格，暂时未添加abp模板中的全部内容。

# 其它
已引入大部分ng-alain的示例代码

主题切换功能暂只支持顶部颜色切换，因ng-zorro-antd本身没有主题，所以左侧导航栏无法切换颜色，ng-alain的sidebar-nav组件没有进行迁移

# delon 组件迁移信息
从delon/abc迁移的组件存放在src/shared/components/*下，组件的使用方法参见[delon 文档](http://ng-alain.com/components/)。

**组件并非进行完整迁移，部分组件可能不会迁移或则迁移方式有所不同，具体参见组件迁移信息。** 

|   组件名称  | 是否迁移    |   说明  |
| ------------- | ------------- | ------------- |
|	avatar-list	|	已迁移	|	用法一致	|
|	charts	    |	已迁移	|	用法一致	|
|	count-down	|	已迁移	|	用法一致	|
|	desc-list	|	已迁移	|	用法一致	|
|	down-file	|	_暂无计划_	|	ABP默认后台并无与之匹配的功能	|
|	ellipsis	|	已迁移	|	用法一致	|
|	error-collect	|	_暂无计划_	|	没想好	|
|	exception	|	_不迁移_	|	ABP模板暂无此需求	|
|	footer-toolbar	|	_不迁移_	|	交由各区域在layout层面去实现	|
|	full-content	|	_不迁移_	|	交由各区域在layout层面去实现	|
|	global-footer	|	_不迁移_	|	交由各区域在layout层面去实现	|
|	image	    |	_不迁移_	|	计划改写新的image组件	|
|	notice-icon	|	已迁移	|	用法一致	|
|	number-info	|	已迁移	|	用法一致	|
|	number-to-chinese	|	已迁移	|	用法一致	|
|	pro-header	|	已迁移	|	用法一致	|
|	result	    |	已迁移	|	用法一致	|
|	reuse-tab	|	已迁移	|	无Menu相关内容(无menu和mode)，其余与delon相同	|
|	sidebar-nav	|	_不迁移_	|	交由各区域在layout层面去实现	|
|	simple-table	|	_不迁移_	|	每个人对于simple的理解不同，暂不迁移	|
|	standard-form-row	|	已迁移	|	用法一致	|
|	tag-select	|	已迁移	|	用法一致	|
|	trend	    |	已迁移	|	用法一致	|
|	utils	    |	_不迁移_	|	与呈现相关的写pipe，与逻辑相关的写service，不迁移万能类	|
|	xlsx	    |	_不迁移_	|	此功能交由后端完成	|
|	zip	        |	_不迁移_	|	此功能交由后端完成	|


# 鸣谢
[ABP](https://aspnetboilerplate.com/) ASP.NET Boilerplate是一个用最佳实践和流行技术开发现代WEB应用程序的新起点，它旨在成为一个通用的WEB应用程序框架和项目模板。

[ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd) admin panel front-end framework.

[ng-alain](http://github.com/cipchk/ng-alain) 基于 Ng-zorro-antd 的解决方案

[delon](https://github.com/cipchk/delon) cipchk/delon是ng-alain的业务组件库

[DonaldTdz/photostory](https://github.com/DonaldTdz/photostory) 部分代码来源