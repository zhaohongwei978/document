#mysql安装

mac选择对应版本，输入一定强度密码既可 下载安装 

https://dev.mysql.com/downloads/file/?id=501470

## navact安装（破解版）

- 下载客户端 http://www.pc6.com/mac/111878.html

- 解决软件无法打开问题

```
在终端中粘贴下面命令：sudo xattr -r -d com.apple.quarantine ,然后输入个空格，再将应用程序目录中的软件拖拽到命令后面，按回车后输入自己电脑密码执行，比如需要打开sketch应用的命令是：sudo xattr -r -d com.apple.quarantine /Applications/sketch.app/

```

# docker

- docker运行命令  docker run -d -p 80:80 docker/getting-started
- docker安装nginx docker pull nginx:latest   


# mac无法识别开发者身份解决办法 

先执行 sudo spctl --master-disable
此步骤也通常用来解决 mac打开软件时提示软件已损坏或无法验证 的错误

再执行以下命令
sudo xattr -r -d com.apple.quarantine /Applications/DevSidecar.app

