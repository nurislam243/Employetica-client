import React, { useState } from 'react';
import WorkSheetForm from './WorkSheetForm';
import WorkSheetTable from './WorkSheetTable';
import EditWorkModal from './EditWorkModal';

const WorkSheet = () => {
  const [editingData, setEditingData] = useState(null); // for edit modal

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee Work Sheet</h2>

      {/* Form to add new work */}
      <WorkSheetForm />

      {/* Table to show work data */}
      <WorkSheetTable setEditingData={setEditingData} />

      {/* Modal to edit work entry */}
      {editingData && (
        <EditWorkModal
          editingData={editingData}
          closeModal={() => setEditingData(null)}
        />
      )}
    </div>
  );
};

export default WorkSheet;
