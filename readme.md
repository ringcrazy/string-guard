# 项目描述
    个人使用的“密码”保护系统，通过设置每天的登录次数和每天的登陆时段，起到“密码”保护功能。

# 如何运行
    前端 client: vue-cli 脚手架构建
        启动：
            npm run dev

    后端 server：express 脚手架构建
        启动mongodb数据库服务
            cd mongodb
            ./bin/mongod -f conf/mongod.conf
        
        启动网站服务
            DEBUG=server:* npm start

        启动apidoc
            apidoc -i routes/ -o apidoc/
            cd apidoc
            http-server

        
    部署：通过阿里云平台

# 业务介绍（功能模块）
    1.登录功能（默认用户admin)
    2.修改密码、重置密码功能
    3.设置有效时间、登录次数
    4.提取字符串、修改字符串功能

# 项目备注
    项目周期：一周
    git托管