import { getApperClient } from "@/services/apperClient";
class PatientService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('patient_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "date_of_birth_c"}},
          {"field": {"Name": "gender_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}},
          {"field": {"Name": "blood_group_c"}},
          {"field": {"Name": "allergies_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "admission_date_c"}},
          {"field": {"Name": "assigned_doctor_c"}},
          {"field": {"Name": "bed_number_c"}},
          {"field": {"Name": "department_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching patients:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('patient_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "date_of_birth_c"}},
          {"field": {"Name": "gender_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}},
          {"field": {"Name": "blood_group_c"}},
          {"field": {"Name": "allergies_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "admission_date_c"}},
          {"field": {"Name": "assigned_doctor_c"}},
          {"field": {"Name": "bed_number_c"}},
          {"field": {"Name": "department_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching patient ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(patientData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Name: patientData.Name || `${patientData.first_name_c} ${patientData.last_name_c}`,
        first_name_c: patientData.first_name_c || patientData.firstName,
        last_name_c: patientData.last_name_c || patientData.lastName,
        date_of_birth_c: patientData.date_of_birth_c || patientData.dateOfBirth,
        gender_c: patientData.gender_c || patientData.gender,
        phone_c: patientData.phone_c || patientData.phone,
        email_c: patientData.email_c || patientData.email,
        address_c: patientData.address_c || patientData.address,
        emergency_contact_c: patientData.emergency_contact_c || patientData.emergencyContact,
        emergency_phone_c: patientData.emergency_phone_c || patientData.emergencyPhone,
        blood_group_c: patientData.blood_group_c || patientData.bloodGroup,
        allergies_c: patientData.allergies_c || patientData.allergies,
        status_c: patientData.status_c || patientData.status || "outpatient",
        admission_date_c: patientData.admission_date_c || patientData.admissionDate,
        assigned_doctor_c: patientData.assigned_doctor_c || patientData.assignedDoctor,
        bed_number_c: patientData.bed_number_c || patientData.bedNumber,
        department_c: patientData.department_c || patientData.department
      }];

      const response = await apperClient.createRecord('patient_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} patients:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating patient:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, patientData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Id: parseInt(id),
        ...(patientData.Name && { Name: patientData.Name }),
        ...(patientData.first_name_c && { first_name_c: patientData.first_name_c }),
        ...(patientData.last_name_c && { last_name_c: patientData.last_name_c }),
        ...(patientData.date_of_birth_c && { date_of_birth_c: patientData.date_of_birth_c }),
        ...(patientData.gender_c && { gender_c: patientData.gender_c }),
        ...(patientData.phone_c && { phone_c: patientData.phone_c }),
        ...(patientData.email_c && { email_c: patientData.email_c }),
        ...(patientData.address_c && { address_c: patientData.address_c }),
        ...(patientData.emergency_contact_c && { emergency_contact_c: patientData.emergency_contact_c }),
        ...(patientData.emergency_phone_c && { emergency_phone_c: patientData.emergency_phone_c }),
        ...(patientData.blood_group_c && { blood_group_c: patientData.blood_group_c }),
        ...(patientData.allergies_c && { allergies_c: patientData.allergies_c }),
        ...(patientData.status_c && { status_c: patientData.status_c }),
        ...(patientData.admission_date_c && { admission_date_c: patientData.admission_date_c }),
        ...(patientData.assigned_doctor_c && { assigned_doctor_c: patientData.assigned_doctor_c }),
        ...(patientData.bed_number_c && { bed_number_c: patientData.bed_number_c }),
        ...(patientData.department_c && { department_c: patientData.department_c })
      }];

      const response = await apperClient.updateRecord('patient_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} patients:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating patient:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord('patient_c', { 
        RecordIds: [parseInt(id)] 
      });

      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} patients:`, failed);
        }
        return response.results.some(r => r.success);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting patient:", error?.response?.data?.message || error);
      return false;
    }
  }

  async getByStatus(status) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('patient_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "date_of_birth_c"}},
          {"field": {"Name": "gender_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}},
          {"field": {"Name": "blood_group_c"}},
          {"field": {"Name": "allergies_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "admission_date_c"}},
          {"field": {"Name": "assigned_doctor_c"}},
          {"field": {"Name": "bed_number_c"}},
          {"field": {"Name": "department_c"}}
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
      console.error(`Error fetching patients with status ${status}:`, error?.response?.data?.message || error);
      return [];
    }
  }

  async search(query) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('patient_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "date_of_birth_c"}},
          {"field": {"Name": "gender_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}},
          {"field": {"Name": "blood_group_c"}},
          {"field": {"Name": "allergies_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "admission_date_c"}},
          {"field": {"Name": "assigned_doctor_c"}},
          {"field": {"Name": "bed_number_c"}},
          {"field": {"Name": "department_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {
                  "fieldName": "first_name_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "last_name_c",
                  "operator": "Contains", 
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "email_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "phone_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            }
          ]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error searching patients with query ${query}:`, error?.response?.data?.message || error);
      return [];
    }
  }
}

export default new PatientService();