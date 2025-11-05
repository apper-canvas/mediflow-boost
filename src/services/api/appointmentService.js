import { getApperClient } from "@/services/apperClient";
class AppointmentService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('appointment_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "patient_id_c"}},
          {"field": {"Name": "doctor_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "time_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching appointments:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('appointment_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "patient_id_c"}},
          {"field": {"Name": "doctor_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "time_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(appointmentData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Name: appointmentData.Name || `Appointment ${appointmentData.patient_id_c}`,
        patient_id_c: appointmentData.patient_id_c || appointmentData.patientId,
        doctor_id_c: appointmentData.doctor_id_c || appointmentData.doctorId,
        date_c: appointmentData.date_c || appointmentData.date,
        time_c: appointmentData.time_c || appointmentData.time,
        duration_c: appointmentData.duration_c || appointmentData.duration,
        type_c: appointmentData.type_c || appointmentData.type,
        status_c: appointmentData.status_c || appointmentData.status || "scheduled",
        notes_c: appointmentData.notes_c || appointmentData.notes
      }];

      const response = await apperClient.createRecord('appointment_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} appointments:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating appointment:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, appointmentData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Id: parseInt(id),
        ...(appointmentData.Name && { Name: appointmentData.Name }),
        ...(appointmentData.patient_id_c && { patient_id_c: appointmentData.patient_id_c }),
        ...(appointmentData.doctor_id_c && { doctor_id_c: appointmentData.doctor_id_c }),
        ...(appointmentData.date_c && { date_c: appointmentData.date_c }),
        ...(appointmentData.time_c && { time_c: appointmentData.time_c }),
        ...(appointmentData.duration_c && { duration_c: appointmentData.duration_c }),
        ...(appointmentData.type_c && { type_c: appointmentData.type_c }),
        ...(appointmentData.status_c && { status_c: appointmentData.status_c }),
        ...(appointmentData.notes_c && { notes_c: appointmentData.notes_c })
      }];

      const response = await apperClient.updateRecord('appointment_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} appointments:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating appointment:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord('appointment_c', { 
        RecordIds: [parseInt(id)] 
      });

      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} appointments:`, failed);
        }
        return response.results.some(r => r.success);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting appointment:", error?.response?.data?.message || error);
      return false;
    }
  }

  async getByDate(date) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('appointment_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "patient_id_c"}},
          {"field": {"Name": "doctor_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "time_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}}
        ],
        where: [{
          "FieldName": "date_c",
          "Operator": "EqualTo",
          "Values": [date]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching appointments for date ${date}:`, error?.response?.data?.message || error);
      return [];
    }
  }

  async getByPatient(patientId) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('appointment_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "patient_id_c"}},
          {"field": {"Name": "doctor_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "time_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}}
        ],
        where: [{
          "FieldName": "patient_id_c",
          "Operator": "EqualTo",
          "Values": [patientId]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching appointments for patient ${patientId}:`, error?.response?.data?.message || error);
      return [];
    }
  }

  async getByDoctor(doctorId) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('appointment_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "patient_id_c"}},
          {"field": {"Name": "doctor_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "time_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}}
        ],
        where: [{
          "FieldName": "doctor_id_c",
          "Operator": "EqualTo",
          "Values": [doctorId]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching appointments for doctor ${doctorId}:`, error?.response?.data?.message || error);
      return [];
    }
  }

  async getByStatus(status) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('appointment_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "patient_id_c"}},
          {"field": {"Name": "doctor_id_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "time_c"}},
          {"field": {"Name": "duration_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}}
        ],
        where: [{
          "FieldName": "status_c",
          "Operator": "EqualTo",
          "Values": [status]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching appointments with status ${status}:`, error?.response?.data?.message || error);
      return [];
    }
}
}

export default new AppointmentService();