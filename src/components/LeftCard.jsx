function Row({ label, value, valueClass }) {
  return (
    <div className="flex justify-between text-gray-400">
      <span>{label}:</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

export default function LeftCard() {
  return (
    <div className="col-span-3 bg-[#0f1012] rounded-xl border border-red-900/30 p-6 flex flex-col">
      <h3 className="text-white text-sm font-bold uppercase text-center mb-6">
        NUEVA INCIDENCIA
      </h3>

      <div className="text-2xl text-center mb-4">🔴</div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Fuego Activo</h2>
        <p className="text-gray-400 text-sm">Volcán de Colima</p>
      </div>

      <div className="bg-[#161719] rounded-lg p-4 text-sm space-y-2">
        <Row label="Gravedad" value="Alta" valueClass="text-orange-500 font-bold" />
        <Row label="Recursos" value="3 Unidades" valueClass="text-white font-mono" />
        <Row label="ETA" value="5 min" valueClass="text-white font-mono" />
      </div>

      <button className="mt-6 py-3 bg-red-800 hover:bg-red-700 text-red-100 rounded-lg text-sm font-medium">
        Nuevas incidencias
      </button>
    </div>
  );
}