
interface StringConstructor
{
    format(...param);
}
String.format = (...param) => {
    let count = 0;
    // 通过正则替换%s
    return String.prototype.replace(/%s/g, (s, i) => {
        return param[count++];
    });
};
