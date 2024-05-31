import { DateTime } from "luxon"
import { CRC_SYMBOL, formatCurrency } from "../../utils/Utils"

interface Props {
  currencyRate: string
  laborRate: string
}

export default function PrintableQuote({ currencyRate, laborRate }: Props) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-16 tw-m-4">
      <div className="tw-flex tw-justify-between">
        <div></div>
        <div className="tw-grid tw-grid-cols-2">
          <span>Fecha:</span>
          <span>{DateTime.now().setLocale("es").toLocaleString(DateTime.DATE_FULL)}</span>
          <span>Dólar:</span>
          <span>{formatCurrency(currencyRate, `${CRC_SYMBOL} `)}</span>
        </div>
      </div>
      <div>
        <table className="table">
          <tbody>
            <tr className="tw-border-2">
              <td className="tw-border-2">Mano de Obra</td>
              <td className="tw-border-2">{formatCurrency(laborRate, CRC_SYMBOL)}</td>
            </tr>
            <tr className="tw-border-2">
              <td className="tw-border-2">Total</td>
              <td className="tw-border-2">{formatCurrency(laborRate, CRC_SYMBOL)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
