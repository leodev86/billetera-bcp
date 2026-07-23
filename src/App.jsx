import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import ResumenCard from "./components/ResumenCard";
import GastosRow from "./components/GastosRow";

const sonidoNotificacion = new Audio("/sounds/notificacion.mp3")

export default function App() {
  const [gastos, setGastos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerGastosHoy = async () => {
    try {
      // 1. Obtenemos el inicio del día local en formato YYYY-MM-DD
      const hoy = new Date();
      const año = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, "0");
      const dia = String(hoy.getDate()).padStart(2, "0");
      const inicioDelDiaLocal = `${año}-${mes}-${dia}T00:00:00`;

      // 2. Consultamos a Supabase
      const { data, error } = await supabase
        .from("gastos")
        .select("*")
        .gte("fecha", inicioDelDiaLocal)
        .order("fecha", { ascending: false });

      if (error) throw error;

      setGastos(data || []);
    } catch (error) {
      console.error("Error consultando Supabase:", error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const cargarGastos = async () => {
      try {
        await obtenerGastosHoy();
      } catch (error) {
        console.error("Error en carga inicial:", error);
      }
    };

    cargarGastos();

    // ⚡ TIEMPO REAL: Si Make inserta algo nuevo en Supabase, la app se actualiza sola
    const canal = supabase
      .channel("cambios-gastos")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "gastos" },
        () => {

          sonidoNotificacion.play().catch((e) =>{
            console.log("El navegador bloqueo la reproduccion automatica de audio:", e);
          })
          obtenerGastosHoy(); // Vuelve a cargar si hay registros nuevos
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  return (
    <div className="max-w-[480px] mx-auto p-5 font-sans bg-gray-50 min-h-screen">
      <h2 className="text-[#002A61] mb-5 text-left font-black text-2xl tracking-tight">
        📱 Mi Billetera
      </h2>

      <ResumenCard gastos={gastos} />

      <h3 className="text-sm text-gray-500 mb-2.5 pl-1 font-medium">
        Mis Consumos de Hoy
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