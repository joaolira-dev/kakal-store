export default function StorePageFrame({ children }) {
  return (
    <div className="relative isolate min-h-[75vh] overflow-hidden bg-kakal-cream">
      <span
        aria-hidden="true"
        className="kakal-corner-left pointer-events-none absolute -left-14 -top-16 block h-48 w-[300px] rounded-br-[90%] bg-kakal-yellow sm:-left-24 sm:-top-36 sm:h-72 sm:w-[460px]"
      />
      <span
        aria-hidden="true"
        className="kakal-corner-right pointer-events-none absolute -right-14 -top-14 block h-40 w-[250px] rounded-bl-[92%] bg-sky-400 sm:-right-32 sm:-top-44 sm:h-72 sm:w-[450px]"
      />

      <div className="kakal-page-enter relative z-10">{children}</div>
    </div>
  );
}
