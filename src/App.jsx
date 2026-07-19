import React from "react";
import { useState } from "react";
import ResumenCard from './components/ResumenCard';
import GastoRow from './components/GastoRow';

export default function App() {
  const [gastos, setGastos] = useState([
    { id: 1, monto: 4.50, comercio: "Diego E Quintana C.", tipo: "Yape", hora: "20:07" },
    { id: 2, monto: 2.00, comercio: "Luis A Alva P.", tipo: "Yape", hora: "21:28" }
  ]);

  const totalDelDia = gastos.reduce((sum, item) => sum + item.monto, 0);

  return (
    <div className="max-w-[480px] mx-auto p-5 font-sans bg-gray-50 min-h-screen">
      <h2 className="text-[#002A61] mb-5 text-left font-black text-2xl tracking-tight">
        📱 Billetera BCP v1.0
      </h2>
      
      <ResumenCard total={totalDelDia} />

      <h3 className="text-sm text-gray-500 mb-2.5 pl-1 font-medium">
        Historial de Consumos
      </h3>

      <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {gastos.map((gasto) => (
          <GastoRow key={gasto.id} gasto={gasto} />
        ))}
      </div>
    </div>
  );
}
