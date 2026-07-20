import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import ResumenCard from "./components/ResumenCard";
import GastosRow from "./components/GastosRow";

export default function App() {
  const [gastos, setGastos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerGastosHoy = async () => {
      try {
        const inicioDelDia = new Date();
        inicioDelDia.setHours(0, 0, 0, 0);

        const { data, error } = await supabase
          .from("gastos")
          .select("*")
          .gte("fecha", inicioDelDia.toISOString())
          .order("fecha", { ascending: false});

          if (error) throw error;

          setGastos(data || []);
      }   catch (error) {
        console.error("Error consultando Supabase:", error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerGastosHoy();
  }, []);

  const totalDelDia = gastos.reduce(
    (sum, item) => sum + Number(item.monto || 0),
    0
  );

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
        {cargando ? (
          <p className="text-center text-gray-400 py-8 bg-white text-sm">
            Cargando gastos...
          </p>
        ) : gastos.length === 0 ? (
          <p className="text-center text-gray-400 py-8 bg-white text-sm">
            No hay gastos para hoy.
          </p>
        ) : (
          gastos.map((gasto) => (
            <GastosRow key={gasto.id} gasto={gasto} />
          ))
        )}
      </div>
    </div>
  );
}

