import { useSearchParams } from "react-router-dom";

import PrintableQuote from "../components/quotes/PrintableQuote";

export default function PrintQuote() {
  const [searchParams] = useSearchParams();
  const currencyRate = searchParams.get("currencyRate") || "";
  const laborRate = searchParams.get("laborRate") || "";

  return <PrintableQuote currencyRate={currencyRate} laborRate={laborRate} />;
}
