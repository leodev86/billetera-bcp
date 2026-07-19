import React from "react";

export default function ResumenCard({ total}) {
    return (
        <div className="bg-[#002A61] text-white p-5 rounded-xl mb-5 shadow-sm">
            <p className="text-xs opacity-80 m-0 uppercase tracking-wider font-semibold">
                Gastos Totales de Hoy
            </p>
            <h1 className="text-3xl font-bold mt-1.5 m-0">
                S/ {total.toFixed(2)}
            </h1>
        </div>
    );
}