import { gql } from "../__generated__";

export const GET_TIPO_DE_CAMBIO_QUERY = gql(`
  query TipoDeCambio {
    tipoDeCambio {
      compra
      venta
    }
  }
`);

