import { isFunction } from "lodash";

import { formatCurrency, onlyNumbers, strToFloat } from "../../utils/Utils";
import { Worker, getHoursOverride, hasHoursOverride, totalWorkerRate } from "../../models/Worker";

interface Props {
  workers: Worker[];
  defaultHours?: string;
  onWorkersChanged?: (workers: Worker[]) => void;
}

export default function WorkersList({
  workers,
  defaultHours = "0.00",
  onWorkersChanged,
}: Props) {
  function setWorkers(workers: Worker[]) {
    if (isFunction(onWorkersChanged)) {
      onWorkersChanged(workers);
    }
  }

  function onHoursOverrideBlur(worker: Worker, hours: string) {
    const newValue = strToFloat(hours)
    if (hours && newValue !== defaultHours) {
      setHoursOverride(worker, newValue);
    } else {
      removeHoursOverride(worker);
    }
  }

  function removeHoursOverride(worker: Worker) {
    setWorkers(
      workers.map((w) => {
        if (w.id !== worker.id) {
          return w;
        } else {
          const { hoursOverride, ...newWorker } = w;
          return {
            ...newWorker,
          };
        }
      }),
    );
  }

  function removeWorker(worker: Worker) {
    const newList = workers.filter(({ id }) => id !== worker.id);
    setWorkers(newList);
  }

  function setHourlyRate(worker: Worker, rate: string) {
    setWorkers(
      workers.map((w) => {
        return w.id !== worker.id
          ? w
          : {
              ...w,
              hourlyRate: rate,
            };
      }),
    );
  }

  function setHoursOverride(worker: Worker, hours: string) {
    setWorkers(
      workers.map((w) => {
        if (w.id !== worker.id) {
          return w;
        } else {
          const { hoursOverride, ...newWorker } = w;
          return {
            ...newWorker,
            hoursOverride: hours,
          };
        }
      }),
    );
  }

  async function onHourlyRateFocus(worker: Worker, e: React.FocusEvent<HTMLInputElement, Element>) {
    await setHourlyRate(worker, strToFloat(onlyNumbers(e.target.value)))
    e.target.select()
  }

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      {workers.map((worker) => (
        <div
          key={worker.id}
          className="tw-gap-4 card tw-flex-row tw-p-1 tw-w-fit"
        >
          <span className="my-auto">{worker.name}</span>
          <div className="input-group tw-w-40">
            <input
              type="text"
              className="form-control"
              value={worker.hourlyRate}
              onChange={(e) =>
                setHourlyRate(worker, onlyNumbers(e.target.value))
              }
              onBlur={(e) => setHourlyRate(worker, formatCurrency(strToFloat(e.target.value)))}
              onFocus={(e) => onHourlyRateFocus(worker, e)}
            />
            <span className="input-group-text">/Hora</span>
          </div>
          <div className="input-group tw-w-36">
            <input
              type="text"
              className={`form-control ${hasHoursOverride(worker) ? "tw-text-blue-500" : ""}`}
              value={getHoursOverride(worker, defaultHours)}
              onChange={(e) =>
                setHoursOverride(worker, onlyNumbers(e.target.value))
              }
              onBlur={(e) => onHoursOverrideBlur(worker, e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <span className="input-group-text">Horas</span>
          </div>
          <span className="my-auto">{formatCurrency(totalWorkerRate(worker, defaultHours), "₡")}</span>
          <i
            className="bi bi-x my-auto hover:tw-text-red-500 tw-cursor-pointer"
            onClick={() => removeWorker(worker)}
          ></i>
        </div>
      ))}
    </div>
  );
}
