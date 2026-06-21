export default function Toast({ children }) {
  return children ? <div className="toast">{children}</div> : null;
}
