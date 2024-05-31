import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import CurrencyDropdown from "../components/quotes/CurrencyDropdown";
import Labor from "../components/quotes/Labor";
import { GET_TIPO_DE_CAMBIO_QUERY } from "../queries/tipoDeCambioQueries";
import { formatCurrency } from "../utils/Utils";

export default function Quotes() {
  const [currency, setCurrency] = useState("CRC");
  const [currencyRate, setCurrencyRate] = useState("0.00");
  const [laborRate, setLaborRate] = useState("0.00");
  const { data: tipoDeCambio } = useQuery(GET_TIPO_DE_CAMBIO_QUERY);

  useEffect(() => {
    if (tipoDeCambio) {
      setCurrencyRate(tipoDeCambio.tipoDeCambio.venta.toString());
    }
  }, [tipoDeCambio]);

  function resetCurrencyRate() {
    if (tipoDeCambio) {
      setCurrencyRate(tipoDeCambio.tipoDeCambio.venta.toString());
    }
  }

  function laborRateChanged(value: number) {
    setLaborRate(value.toFixed(2));
  }

  function printQuote() {
    const iframe = document.getElementById(
      "printableQuote",
    ) as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  }

  return (
    <div className="tw-m-8 tw-flex tw-flex-col tw-gap-4">
      <div className="tw-flex tw-justify-between">
        <div></div>
        <div className="tw-flex">
          <CurrencyDropdown
            currency={currency}
            currencyRate={currencyRate}
            onCurrencyChange={setCurrency}
            onRateChange={setCurrencyRate}
            onReset={resetCurrencyRate}
          ></CurrencyDropdown>
          <button
            type="button"
            className="btn btn-primary"
            onClick={printQuote}
          >
            Print
          </button>
        </div>
      </div>

      <iframe
        style={{ display: "none" }}
        id="printableQuote"
        src={`/quotes/printQuote?currencyRate=${currencyRate}&laborRate=${laborRate}`}
      ></iframe>

      <div className="accordion" id="accordion">
        <div className="accordion-item">
          <div className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Mano de Obra: {formatCurrency(laborRate, "₡")}
            </button>
          </div>
          <div
            id="collapseOne"
            className="accordion-collapse show"
            data-bs-parent="#accordion"
          >
            <div className="accordion-body">
              <Labor onTotalChanged={laborRateChanged}></Labor>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
