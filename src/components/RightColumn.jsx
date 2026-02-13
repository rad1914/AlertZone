import React from 'react';
import { TriangleAlert, MoreHorizontal, Flame } from 'lucide-react';
import AlertRow from './AlertRow';
import SensorRow from './SensorRow';

export default function RightColumn() {
  return (
    <div className="col-span-4 flex flex-col gap-6">
      <div className="bg-[#0f1012] rounded-xl border border-gray-800 p-4 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-200">REAL TIME DATA</h3>
          <MoreHorizontal size={16} className="text-gray-500" />
        </div>

        <div className="space-y-1">
          <AlertRow icon={TriangleAlert} title="Fuego Activo" subtitle="Incomino en obeo 95 0:22..." />
          <AlertRow icon={TriangleAlert} title="Recurses Desplegados" subtitle="Incomino en obeo 93 0:22..." type="danger" active={true} />
          <AlertRow icon={TriangleAlert} title="Centie Eonssser" subtitle="Incomino en obeo 95 0:28..." />
          <AlertRow icon={TriangleAlert} title="Fasgo Active" subtitle="Incomino en obeo 03 0:22..." />
        </div>
      </div>

      <div className="bg-[#0f1012] rounded-xl border border-gray-800 p-4 h-1/3">
        <h3 className="font-semibold text-gray-200 mb-3">Sensors</h3>
        <div className="flex flex-col">
          <SensorRow color="bg-red-500" label="Incering Baquitify" value="-2 bda" />
          <SensorRow color="bg-red-500" label="Sensor Fligh" value="-3? ccm" />
          <SensorRow color="bg-green-500" label="Sensor Aoavnita" value="75 °C" />
          <SensorRow color="bg-green-500" label="Sensor Pralbeit" value="69 °C" />
          <SensorRow color="bg-blue-500" label="Sensor Reading" value="+38 min" />
        </div>
      </div>
    </div>
  );
}