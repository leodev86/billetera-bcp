import React from "react";

export default function GastosRow({ gasto}) {
    return(
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-white">
            <div>
                <span className="text-xs font-bold text-[#002A61] bg-[#E3EDFC] px-2 py-1 rounded-full mr-2.5">
                    {gasto.tipo}
                </span>
                <strong className="text-gray-800">{gasto.comercio}</strong>
                <div className="text-xs text-gray-400 mt-1">{gasto.hora}</div>
            </div>
            <div className="font-bold text-emerald-500 text-base">
                - S/ {gasto.monto.toFixed(2)}
            </div>
        </div>
    );
}