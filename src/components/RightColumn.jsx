import { useEffect, useState } from 'react';
import { TriangleAlert, MoreHorizontal } from 'lucide-react';
import AlertRow from './AlertRow';
import SensorRow from './SensorRow';

export default function RightColumn() {
  const [alerts, setAlerts] = useState([]);
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/alerts')
      .then((r) => r.json())
      .then(setAlerts)
      .catch(() => setAlerts([]));

    fetch('http://localhost:3001/api/sensors')
      .then((r) => r.json())
      .then(setSensors)
      .catch(() => setSensors([]));
  }, []);

  return (
    <div className="col-span-4 flex flex-col gap-6">
      <Section title="REAL TIME DATA" action={<MoreHorizontal size={16} className="text-gray-500" />}>
        {alerts.map((a) => (
          <AlertRow key={a.id} icon={TriangleAlert} {...a} />
        ))}
      </Section>

      <Section title="Sensors" className="h-1/3">
        {sensors.map((s) => (
          <SensorRow key={s.id} {...s} />
        ))}
      </Section>
    </div>
  );
}

function Section({ title, action, className = '', children }) {
  return (
    <div className={`bg-[#0f1012] rounded-xl border border-gray-800 p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-200">{title}</h3>
        {action}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
