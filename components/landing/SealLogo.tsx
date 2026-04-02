export default function SealLogo() {
    return (
        <svg className="seal-logo" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="45" strokeDasharray="4 4" />
            <path d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M25 75 L75 25" strokeWidth="0.5" opacity="0.5" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
        </svg>
    );
}
