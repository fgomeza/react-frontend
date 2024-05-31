import { cloneDeep, isNaN } from "lodash";

export const CRC_SYMBOL = "₡"
export const USD_SYMBOL = "$"

export function isNumeric(str: string): boolean {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

export function onlyNumbers(str: string): string {
  return isNumeric(str) ? str.replace(/[^0-9.]+/, "") : "";
}

export function strToFloat(value?: string | number, decimals: number = 2): string {
  const str = String(value)
  return isNumeric(str)
    ? parseFloat(str).toFixed(decimals)
    : Number(0).toFixed(decimals);
}

export function formatCurrency(value: string, symbol: string = ""): string {
  let [whole, decimals] = value.split(".");
  if (whole) {
    whole = whole.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }
  return `${symbol}${[whole, decimals].join(".")}`
}

export function debounce<T>(
  callBack: () => T | void,
  delay = 2000,
): () => T | void {
  let timeOfLastInvoke = null as number | null;
  let lastResult = null as T | void;

  function debounced(): T | void {
    const timeOfThisInvocation = new Date().getTime();
    if (
      timeOfLastInvoke === null ||
      timeOfThisInvocation - timeOfLastInvoke >= delay
    ) {
      timeOfLastInvoke = timeOfThisInvocation;
      lastResult = callBack();
    }

    return lastResult;
  }

  return debounced;
}

export function printContent(content: HTMLElement) {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  if (iframe.contentWindow) {
    const newContent = cloneDeep(content)
    iframe.contentWindow.document.body.appendChild(newContent)
    // iframe.contentWindow.document.open();
    // iframe.contentWindow.document.write(content.innerHTML);
    // iframe.contentWindow.document.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    iframe.contentWindow.onafterprint = () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.document.body.removeChild(content)
      }
      document.body.removeChild(iframe);
    }
  }
}

export function printIframe(iframe: HTMLIFrameElement) {
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    iframe.contentWindow.onafterprint = () => {
    }
  }
}

