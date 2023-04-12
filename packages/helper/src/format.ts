export function numberFormat(val: any) {
  let num = 10000;
  let sizesValue = "";
  /**
   * 判断取哪个单位
   */
  if (val < 1000) {
    // 如果小于1000则直接返回
    return val;
  } else if (val > 1000 && val < 9999) {
    sizesValue = "千";
  } else if (val > 10000 && val < 99999999) {
    sizesValue = "万";
  } else if (val > 100000000 && val < 999999999999) {
    sizesValue = "亿";
  } else if (val > 1000000000000) {
    sizesValue = "万亿";
  }
  /**
   * 大于一万则运行下方计算
   */
  const i = Math.floor(Math.log(val) / Math.log(num));
  return (val / Math.pow(num, i)).toFixed(2) + sizesValue; // 输出
}

export const replaceWithObj = (
  target: string,
  replace: Record<string, string | number>
) => target.replace(/{{([^}]+)}}/g, (ori, k) => `${replace[k] || ""}` || ori);
