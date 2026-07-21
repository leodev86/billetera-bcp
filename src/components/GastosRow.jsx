export default function GastosRow({ gasto }) {
  const { comercio, monto, fecha, categoria } = gasto;

  // Función para asignar un ícono según el comercio/categoría
  const obtenerIcono = (texto = '') => {
    const t = texto.toLowerCase();
    if (t.includes('yape') || t.includes('transferencia')) return '📱';
    if (t.includes('plaza vea') || t.includes('wong') || t.includes('tottus') || t.includes('metro') || t.includes('super')) return '🛒';
    if (t.includes('starbucks') || t.includes('restaurante') || t.includes('kf') || t.includes('bembos') || t.includes('comida')) return '🍔';
    if (t.includes('grifo') || t.includes('primax') || t.includes('uber') || t.includes('cabify') || t.includes('pasaje')) return '🚗';
    if (t.includes('farma') || t.includes('inkafarma') || t.includes('mifarma')) return '💊';
    return '💳'; // Ícono por defecto
  };

  const icono = obtenerIcono(`${comercio} ${categoria || ''}`);

  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl mb-3 hover:bg-slate-800/50 transition-colors">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-xl shadow-inner">
          {icono}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-100 capitalize">
            {comercio || 'Consumo BCP'}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {fecha ? new Date(fecha).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' }) : 'Hoy'}
          </p>
        </div>
      </div>

      <div className="text-right">
        <span className="text-base font-bold text-slate-100">
          - S/ {Number(monto || 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}