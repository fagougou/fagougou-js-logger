# fagougou-js-logger
A Winston wrapper for Fagougou projects

## Getting Started

可以通过在根目录配置 `logger.yml` 写入 appName，如果程序没有找到配置文件，则会读取 `package.json` 中的 `name` 字段作为 appName 的值。

**logger.yml**
```yaml
//example
appName: fagougou-backend



```

启动项目后，将在项目根目录自动生成 `logs/${appName}.log` 文件，后续就可以使用用 ELK 等日志系统来抓取日志文件中的内容了

Dependency: [Winston](https://github.com/winstonjs/winston)

`npm install -S fagougou-js-logger`

```javascript
const logger = require('fagougou-js-logger')

// Error
logger.error('Something wrong')

// Info
logger.info('Make some noise')

// Debug (debug message will not save to log file but shows in console when !production)
logger.debug("I'm watching you")

```
