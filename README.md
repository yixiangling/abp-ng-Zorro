# 后台框架：ABP
# 前端框架：前端组件库 ng-Zorro

# 改动说明
ABP core免费版的默认angular工程组件框架替换成 ng-Zorro，无其他前端框架依赖，无ng-alain依赖

前端主题采用ng-alain，代码存放在 src/theme

保持默认模板代码结构，而非ng-alain代码结构

移除了SignalR相关代码（因为我不用，如果需要请自行添加相关代码）

# 与abp后端配对运行需要修改的文件
src/shared/AppConsts.ts 这个文件的 defaultLocalizationSourceName 的值

src/app/layout/default/sidebar/sidebar-nav.component.ts 的菜单项目

src/app/pages/* 从别处copy来的代码，暂时占位用，代码写法上还未修改成ng-Zorro规格

# 其它
准备引入ng-alain的示例代码，发现大量使用了delon的acl，认证库，国际化等组件，决定放弃引入 @delon/abc

# 相关资料
ABP资料说明： https://aspnetboilerplate.com/

[Ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd) admin panel front-end framework.

[ng-alain](http://ng-alain.com/) 基于 Antd 中后台前端解决方案

[delon](https://github.com/cipchk/delon) cipchk/delon是ng-alain的业务组件库

[DonaldTdz/photostory](https://github.com/DonaldTdz/photostory) 部分代码来源