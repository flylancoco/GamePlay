enum LogType
{
    normal= 1,
    info,
    warn,
    err
}
export class LogWrap
{
    private static instance: LogWrap;

    public static getInstance(): LogWrap
    {
        if (this.instance === null)
        {
            this.instance = new LogWrap();
        }
        return this.instance;
    }
    public  static getDateString(): string
    {
        let d = new Date();
        let str = d.getHours().toString();
        let timeStr = '';
        timeStr += (str.length == 1 ? '0' + str : str) + ':';
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? '0' + str : str) + ':';
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? '0' + str : str) + ':';
        str = d.getMilliseconds().toString();
        if (str.length == 1) str = '00' + str;
        if (str.length == 2) str = '0' + str;
        timeStr += str;

        timeStr = '[' + timeStr + ']';
        return timeStr;
    }

    public  static stack(index): string
    {
        let e = new Error();
        let lines = e.stack.split('\n');
        lines.shift();
        let result = [];
        lines.forEach((lineArg: string) => {
            let line = lineArg.substring(7);
            let lineBreak = line.split(' ');
            if (lineBreak.length < 2) {
                result.push(lineBreak[0]);
            } else {
                result.push({[lineBreak[0]] : lineBreak[1]});
            }
        });

        let list = [];
        if (index < result.length - 1) {
            for (let a in result[index]) {
                if (result.hasOwnProperty(a))list.push(a);
            }
        }

        let splitList = list[0].split('.');
        return (splitList[0] + '.js->' + splitList[1] + ': ');
    }
    private curLogLevel: LogType = LogType.normal;
    private  log(...args)
    {
        let backLog = console.log || cc.log; // || log;
        if (this.curLogLevel <= LogType.normal) {
            backLog.call(this, '%s%s:' + cc.js.formatStr.apply(cc, arguments), LogWrap.stack(2), LogWrap.getDateString());
        }
    }

    private  info(...args)
    {
        let backLog = console.log || cc.log; // || log;
        if (this.curLogLevel <= LogType.info) {
            backLog.call(this, '%c%s%s:' + cc.js.formatStr.apply(cc, arguments), 'color:#00CD00;', LogWrap.stack(2), LogWrap.getDateString());
        }
    }

    private  warn(...args)
    {
        let backLog = console.log || cc.log; // || log;
        if (this.curLogLevel <= LogType.warn) {
            backLog.call(this, '%c%s%s:' + cc.js.formatStr.apply(cc, arguments), 'color:#ee7700;', LogWrap.stack(2), LogWrap.getDateString());
            // cc.warn
        }
    }

    private  err(...args)
    {
        let backLog = console.log || cc.log; // || log;
        if (this.curLogLevel <= LogType.err) {
            backLog.call(this, '%c%s%s:' + cc.js.formatStr.apply(cc, arguments), 'color:red', LogWrap.stack(2), LogWrap.getDateString());
        }
    }
}
