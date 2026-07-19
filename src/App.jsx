import React from "react";
import { useState, useEffect } from "react";
import ResumenCard from "./components/ResumenCard";
import GastosRow from "./components/GastosRow";

export default function App() {
  // 1. Empezamos con el estado totalmente vacío, listo para la data real
  const [gastos, setGastos] = useState([]);

  // 2. Traemos los datos de Make cuando se carga la aplicación
  useEffect(() => {
    const obtenerGastos = async () => {
      try {
        // Reemplaza esto con la URL real de tu webhook o escenario de Make
        const respuesta = await fetch("https://hook.us2.make.com/xosyk60h7l2ent6hb3akoeegyn2e8f52");
        const datos = await respuesta.json();
        
        // Asumiendo que Make te devuelve un array de gastos
        setGastos(datos);
      } catch (error) {
        console.error("Error obteniendo los gastos de Make:", error);
      }
    };

    obtenerGastos();
  }, []);

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
        {gastos.length === 0 ? (
          <p className="text-center text-gray-400 py-8 bg-white text-sm">
            Esperando notificaciones de Make...
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