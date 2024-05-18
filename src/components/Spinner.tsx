import isNumber from "lodash/isNumber";

interface Props {
  size: number;
}

export default function Spinner({ size = 16 }: Props) {
  const actualSize = isNumber(size) ? size : 16;

  if (1 == 1)
    return (
      <div className="">
        <div className="spinner-border text-primary h-20 w-20">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  else
    return (
      <svg
        className={`animate-spin h-${actualSize} w-${actualSize}`}
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          fill="white"
          stroke="blue"
          stroke-width="4"
        ></circle>
        <path
          className="opacity-75"
          fill="blue"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>{" "}
      </svg>
    );
}
