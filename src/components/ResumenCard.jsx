export default function ResumenCard({ gastos = [] }) {
  // Calculamos el total consumido
  const total = gastos.reduce((acc, gasto) => acc + Number(gasto.monto || 0), 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-white shadow-xl mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Resumen de Gastos
        </span>
        <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full font-medium">
          {gastos.length} {gastos.length === 1 ? 'movimiento' : 'movimientos'}
        </span>
      </div>

      <div className="mt-1">
        <p className="text-3xl font-extrabold tracking-tight text-emerald-400">
          S/ {total.toFixed(2)}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Registrados automáticamente por la IA
        </p>
      </div>
    </div>
  );
}