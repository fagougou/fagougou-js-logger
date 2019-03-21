# fagougou-js-logger
A Winston wrapper for Fagougou projects

## Getting Started

1. 根目录配置文件 `logger.yml` 

通过写入 appName，如果程序没有找到配置文件，则会读取 `package.json` 中的 `name` 字段作为 appName 的值

logger.yml 长这样：

```yaml
//example
appName: fagougou-backend

```


2. 安装 npm

`npm install -S fagougou-js-logger`

3. 在代码中使用

```javascript
const logger = require('fagougou-js-logger')

// Error
logger.error('Something wrong')

// Warn
logger.warn('Please attention')

// Info
logger.info('Make some noise')

// Debug (debug message will not save to log file but shows in console when !production)
logger.debug("I'm watching you")

```

4. 启动项目后，将在项目根目录自动生成 `logs/${appName}.log` 文件

_注意: Debug 级别的消息是不会写入到日志文件的，但是会在非 production 环境中在 console 中显示_

logs/fagougou-backend.log 长这样：

```
{"message": "Something wrong", "level":"error", "app":"fagougou-backend", "timestamps":"March 21st 2019, 17:35:26.859"}
{"message": "Please attention", "level":"warn", "app":"fagougou-backend", "timestamps":"March 21st 2019, 17:35:26.859"}
{"message": "Make some noise", "level":"info", "app":"fagougou-backend", "timestamps":"March 21st 2019, 17:35:26.859"}

```

5. (optional)后续可以使用 ELK 等日志系统来抓取日志文件中的内容作为进一步的分析


Dependency: [Winston](https://github.com/winstonjs/winston)
