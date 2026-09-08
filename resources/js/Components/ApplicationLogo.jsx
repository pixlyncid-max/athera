export default function ApplicationLogo({ className = "h-9 w-auto", ...props }) {
  return (
    <img
      src="/images/ATHERA%20FONT%20BESAR@300x.png"
      alt="Athera Nexus"
      className={`object-contain ${className}`}
      {...props}
    />
  );
}
