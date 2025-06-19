type ButtonProps = {
    label: string;
    onClick: () => void;
};

export function Button({ label, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full h-full bg-fuchsia-700 text-white rounded-lg hover:bg-fuchsia-900 bg-opacity-90 transition-colors text-2xl font-bold"
        >
            {label}
        </button>
    );
}