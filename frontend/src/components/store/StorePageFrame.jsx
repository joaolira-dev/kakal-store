export default function StorePageFrame({ children }) {
  return (
    <div className="relative isolate min-h-[75vh] overflow-hidden bg-kakal-cream">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-28 h-56 w-[350px] rounded-br-[90%] bg-kakal-yellow sm:-left-24 sm:-top-36 sm:h-72 sm:w-[460px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-36 h-52 w-[350px] rounded-bl-[92%] bg-sky-400 sm:-right-32 sm:-top-44 sm:h-72 sm:w-[450px]"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
