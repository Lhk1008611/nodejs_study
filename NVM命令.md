## NVM命令

nvm是一个用于管理node.js版本的工具，通过以下命令可以对node.js进行安装或切换版本

1.  配置镜像

   nvm node_mirror https://npm.taobao.org/mirrors/node/

2. 下载node.js版本

   nvm install latest   	下载最新版node.js

   nvm install lts		      下载长期维护版node.js

3. 查看node.js版本

   nvm list

4. 切换node.js版本

   nvm use 18.12.0

   - 注意，切换node.js版本时需使用管理员权限打开cmd执行nvm命令

5. 查看node.js版本

   node -v