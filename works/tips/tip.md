## JavaScript字符串去空格

``` javascript
// 去除两边空格
function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g, '');
}
// or 
function trimAnother(str){
  return str.replace(/(^\s+)|(\s+$)/g, '');
}
// 去除左边空格
function triml(str){
  return str.replace(/^\s+/, '');
}
// 去除右边空格
function trimr(str){
  return str.replace(/\s+$/, '');
}
```

