import { onlyNumbers, strToFloat } from "../utils/Utils";

export type Worker = {
  id: string;
  name: string;
  hourlyRate: string;
  hoursOverride?: string;
};

export function hasHoursOverride(co: Worker) {
  return typeof co.hoursOverride !== "undefined";
}

export function getHoursOverride(worker: Worker, defaultHours: string): string {
  return hasHoursOverride(worker) ? worker.hoursOverride! : defaultHours;
}

export function totalWorkerRate(co: Worker, defaultHours: string) {
  const coHours = getHoursOverride(co, defaultHours);
  const rate = parseFloat(onlyNumbers(co.hourlyRate)) * parseFloat(coHours);
  return strToFloat(rate.toString());
}

