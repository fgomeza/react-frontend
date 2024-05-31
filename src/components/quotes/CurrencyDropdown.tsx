import { isFunction } from "lodash";
import { onlyNumbers, strToFloat } from "../../utils/Utils";

interface Props {
  currency: string;
  currencyRate: string;
  onCurrencyChange: (value: string) => void;
  onRateChange: (value: string) => void;
  onReset: () => void;
}

export default function CurrencyDropdown({
  currency,
  currencyRate,
  onCurrencyChange,
  onRateChange,
  onReset,
}: Props) {
  function setCurrencyRate(value: string) {
    if (isFunction(onRateChange)) {
      onRateChange(value);
    }
  }

  function setCurrency(value: string) {
    if (isFunction(onCurrencyChange)) {
      onCurrencyChange(value);
    }
  }

  function resetCurrencyRate() {
    if (isFunction(onReset)) {
      onReset();
    }
  }

  return (
    <div className="dropdown">
      <button
        type="button"
        className="btn dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        {currency}
      </button>
      <div className="dropdown-menu">
        <div className="tw-flex tw-flex-col tw-px-2 tw-py-2 tw-gap-2">
          <div className="tw-flex tw-justify-end">
            <input
              type="radio"
              id="usdInput"
              name="currency"
              className="btn-check"
              value={"USD"}
              onChange={(e) => setCurrency(e.target.value)}
              checked={currency === "USD"}
            />
            <label htmlFor="usdInput" className="btn">
              USD
            </label>

            <input
              type="radio"
              id="crcInput"
              name="currency"
              className="btn-check"
              value={"CRC"}
              onChange={(e) => setCurrency(e.target.value)}
              checked={currency === "CRC"}
            />
            <label htmlFor="crcInput" className="btn">
              CRC
            </label>
          </div>
          <div className="tw-flex tw-w-52 tw-gap-1">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                value={currencyRate}
                onChange={(e) => setCurrencyRate(onlyNumbers(e.target.value))}
                onBlur={(e) => setCurrencyRate(strToFloat(e.target.value))}
                onFocus={(e) => e.target.select()}
              />
              <label>Tipo de cambio</label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={resetCurrencyRate}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
