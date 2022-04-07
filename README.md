### 注意事项！！！
代码拉下来不要提交，根据tag切换版本build，初始版本为Element 2.15.7

### 默认主题
我们默认提供一套主题，主题色如下：
```
$--color-primary: #1677FF !default;
$--color-success: #19B366 !default;
$--color-warning: #FFBF11 !default;
$--color-danger: #FF3B30 !default;
```

### 生成自定义主题
#### 1. 安装
```shell
npm i
```
#### 2. 直接修改`src/common/var.scss`中的主题色
```
$--color-primary: #xxx !default;
$--color-success: #xxx !default;
$--color-warning: #xxx !default;
$--color-danger: #xxx !default;
```
#### 3. build
```shell
npm run build
```
#### 4. 使用
##### 4.1 全局引入
将生成的lib文件下的index.css拷贝至你当前的项目下，可改名为`nh-element-theme.css`文件,然后在main.js中引入即可
```js
import NhElement from 'nh-element-ui';
import './assets/style/nh-element-theme.css'; // 或者你放置的其他文件夹位置

Vue.use(NhElement);
```
##### 4.2 按需引入
将生成的lib文件下的css全部拷贝至你当前的项目下，改名为`theme`文件夹,搭配 `babel-plugin-component` 一起使用，只需要修改 `.babelrc` 的配置，指定 `styleLibraryName` 路径为自定义主题相对于 `.babelrc` 的路径，注意要加 `~`。
```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "nh-element-ui",
        "styleLibraryName": "~theme"
      }
    ]
  ]
}
```