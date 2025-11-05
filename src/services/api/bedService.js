import { getApperClient } from "@/services/apperClient";
import React from "react";

class BedService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('bed_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "number_c"}},
          {"field": {"Name": "ward_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "is_occupied_c"}},
          {"field": {"Name": "patient_id_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching beds:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('bed_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "number_c"}},
          {"field": {"Name": "ward_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "is_occupied_c"}},
          {"field": {"Name": "patient_id_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching bed ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(bedData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Name: bedData.Name || `Bed ${bedData.number_c}`,
        number_c: bedData.number_c || bedData.number,
        ward_c: bedData.ward_c || bedData.ward,
        department_c: bedData.department_c || bedData.department,
        type_c: bedData.type_c || bedData.type,
        is_occupied_c: bedData.is_occupied_c !== undefined ? bedData.is_occupied_c : (bedData.isOccupied || false),
        patient_id_c: bedData.patient_id_c || bedData.patientId || null
      }];

      const response = await apperClient.createRecord('bed_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} beds:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating bed:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, bedData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Id: parseInt(id),
        ...(bedData.Name && { Name: bedData.Name }),
        ...(bedData.number_c && { number_c: bedData.number_c }),
        ...(bedData.ward_c && { ward_c: bedData.ward_c }),
        ...(bedData.department_c && { department_c: bedData.department_c }),
        ...(bedData.type_c && { type_c: bedData.type_c }),
        ...(bedData.is_occupied_c !== undefined && { is_occupied_c: bedData.is_occupied_c }),
        ...(bedData.patient_id_c && { patient_id_c: bedData.patient_id_c })
      }];

      const response = await apperClient.updateRecord('bed_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} beds:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating bed:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord('bed_c', { 
        RecordIds: [parseInt(id)] 
      });

      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} beds:`, failed);
        }
        return response.results.some(r => r.success);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting bed:", error?.response?.data?.message || error);
      return false;
    }
  }

  async getByDepartment(department) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('bed_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "number_c"}},
          {"field": {"Name": "ward_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "is_occupied_c"}},
          {"field": {"Name": "patient_id_c"}}
        ],
        where: [{
          "FieldName": "department_c",
          "Operator": "EqualTo",
          "Values": [department]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching beds for department ${department}:`, error?.response?.data?.message || error);
      return [];
    }
  }

  async getAvailable() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('bed_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "number_c"}},
          {"field": {"Name": "ward_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "is_occupied_c"}},
          {"field": {"Name": "patient_id_c"}}
        ],
        where: [{
          "FieldName": "is_occupied_c",
          "Operator": "EqualTo",
          "Values": [false]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching available beds:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getOccupied() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('bed_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "number_c"}},
          {"field": {"Name": "ward_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "is_occupied_c"}},
          {"field": {"Name": "patient_id_c"}}
        ],
        where: [{
          "FieldName": "is_occupied_c",
          "Operator": "EqualTo",
          "Values": [true]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching occupied beds:", error?.response?.data?.message || error);
      return [];
    }
}
  }