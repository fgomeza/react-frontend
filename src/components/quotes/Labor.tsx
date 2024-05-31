import { debounce, isFunction } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { v1 as uuid } from "uuid";

import { Worker, totalWorkerRate } from "../../models/Worker";
import { formatCurrency, onlyNumbers, strToFloat } from "../../utils/Utils";
import WorkersList from "./WorkersList";

interface Props {
  onTotalChanged: (value: number) => void;
}

export default function Labor({ onTotalChanged }: Props) {
  const [hours, setHours] = useState("0.00");
  const [ccssPercentage, setCcssPercentage] = useState("37%");
  const [workers, setWorkers] = useState([] as Worker[]);

  useEffect(() => {
    if (workers.length === 0) {
      addWorker()
    }
  }, [workers])

  useEffect(() => {
    if (isFunction(onTotalChanged)) {
      onTotalChanged(workersSubtotal() + getCcssDeduction());
    }
  }, [workers, hours, ccssPercentage]);

  function addWorker() {
    const newWorker: Worker = {
      id: uuid(),
      name: `Colaborador ${workers.length + 1}`,
      hourlyRate: "0.00",
    };
    setWorkers([...workers, newWorker]);
  }

  function workersSubtotal() {
    return workers
      .map((co) => parseFloat(totalWorkerRate(co, hours)))
      .reduce((a, b) => a + b, 0);
  }

  function getCcssDeduction() {
    return (workersSubtotal() * parseFloat(ccssPercentage)) / 100;
  }

  function onPercentageChange(value: string) {
    const masked = onlyNumbers(value);
    setCcssPercentage(masked);
  }

  function onPercentageBlur(value: string) {
    const DEFAULT_PERCENTAGE = 37;
    const number = value ? parseFloat(value) : DEFAULT_PERCENTAGE;
    const masked = `${number}%`;
    setCcssPercentage(masked);
  }

  async function onPercentageFocus(
    ev: React.FocusEvent<HTMLInputElement, Element>,
  ) {
    const masked = parseFloat(ev.target.value).toString();
    await setCcssPercentage(masked);
    ev.target.select();
  }

  function saveForm() {}

  const debouncedSaveForm = useCallback(debounce(saveForm, 5000), []);

  return (
    <div className="">
      <form>
        <fieldset onChange={debouncedSaveForm}>
          <div className="tw-flex tw-flex-col tw-w-fit tw-p-1 tw-gap-2">
            <div className="tw-flex tw-gap-4">
              <div className="input-group tw-w-36">
                <span className="input-group-text">Horas</span>
                <input
                  type="text"
                  className="form-control"
                  value={hours}
                  onChange={(e) => setHours(onlyNumbers(e.target.value))}
                  onBlur={(e) => setHours(strToFloat(e.target.value))}
                  onFocus={(e) => e.target.select()}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm tw-w-fit"
                onClick={addWorker}
              >
                Agregar colaborador
              </button>
            </div>

            <WorkersList
              workers={workers}
              onWorkersChanged={setWorkers}
              defaultHours={hours}
            />

            <div className="tw-flex tw-justify-between">
              <div>
                <div className="input-group tw-w-32">
                  <span className="input-group-text">CCSS</span>
                  <input
                    type="text"
                    className="form-control"
                    value={ccssPercentage}
                    onChange={(e) => onPercentageChange(e.target.value)}
                    onBlur={(e) => onPercentageBlur(e.target.value)}
                    onFocus={onPercentageFocus}
                  />
                </div>
              </div>
              <div className="tw-grid tw-grid-cols-2 tw-gap-x-2">
                <span>Subtotal:</span>
                <span className="tw-flex tw-justify-between">
                  <span>₡</span>
                  <span>
                    {formatCurrency(strToFloat(workersSubtotal().toString()))}
                  </span>
                </span>
                <span>CCSS:</span>
                <span className="tw-flex tw-justify-between">
                  <span>₡</span>
                  <span>{formatCurrency(getCcssDeduction().toFixed(2))}</span>
                </span>
                <span>Total:</span>
                <span className="tw-flex tw-justify-between">
                  <span>₡</span>
                  <span>
                    {formatCurrency(
                      strToFloat(workersSubtotal() + getCcssDeduction()),
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
