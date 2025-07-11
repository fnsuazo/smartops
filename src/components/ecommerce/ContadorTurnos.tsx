import { useState, useEffect, useRef } from "react";
import { ClipboardList } from "lucide-react";
import { useCounter } from "@/hooks/useCounter";
import LoadingDots from "@/components/common/LoadingDots";

export default function ContadorTurnos({ className = "" }: { className?: string }) {
    /* 1) React-Query */
    const {
        data: total,
        isLoading,
        isFetching,
        isError,
    } = useCounter(
        "https://testzone.cvx-r.cl/backend/backend.php?action=total_turnos"
    );

    /* 2) Animación 0 → total */
    const [display, setDisplay] = useState(0);
    const startRef = useRef<number | null>(null);

    useEffect(() => {
        if (total == null) return;

        setDisplay(0);
        startRef.current = null;

        const dur  = 800;
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);

        const step = (ts: number) => {
            if (startRef.current === null) startRef.current = ts;
            const pct = Math.min((ts - startRef.current!) / dur, 1);
            setDisplay(Math.floor(ease(pct) * total));
            if (pct < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [total]);

    /* 3) Render */
    return (
        <div
            className={`
        bg-white dark:bg-gray-800 rounded-xl ring-1 ring-gray-200/60 dark:ring-gray-700
        p-4 flex flex-col gap-1 hover:shadow-lg hover:-translate-y-0.5 transition
        ${className}
      `}
        >
            <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-brand-500 shrink-0" />

                {isLoading || isError || total === undefined ? (
                    <LoadingDots />
                ) : (
                    <span className="text-2xl font-bold text-brand-600 dark:text-brand-400 tabular-nums">
            {display.toLocaleString("es-CL")}
          </span>
                )}

                {isFetching && !isLoading && (
                    <span className="h-2 w-2 rounded-full bg-brand-500 animate-ping ml-1" />
                )}
            </div>

            <span className="text-sm text-gray-500 dark:text-gray-400">Turnos</span>
        </div>
    );
}
