export default function FullPageSpinner() {
  return (
    <div className="card fixed top-0 left-0 w-full h-full opacity-50 grid grid-cols-1">
      <div className="place-self-center">
        <div className="spinner-border m-8 text-primary w-16 h-16" />
      </div>
    </div>
  );
}
