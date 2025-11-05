import { getApperClient } from "@/services/apperClient";
import React from "react";

class DepartmentService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('department_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "head_doctor_c"}},
          {"field": {"Name": "total_beds_c"}},
          {"field": {"Name": "occupied_beds_c"}},
          {"field": {"Name": "staff_count_c"}},
          {"field": {"Name": "floor_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching departments:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('department_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "head_doctor_c"}},
          {"field": {"Name": "total_beds_c"}},
          {"field": {"Name": "occupied_beds_c"}},
          {"field": {"Name": "staff_count_c"}},
          {"field": {"Name": "floor_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching department ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(departmentData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Name: departmentData.Name || departmentData.name_c || departmentData.name,
        name_c: departmentData.name_c || departmentData.name,
        head_doctor_c: departmentData.head_doctor_c || departmentData.headDoctor,
        total_beds_c: departmentData.total_beds_c || departmentData.totalBeds || 0,
        occupied_beds_c: departmentData.occupied_beds_c || departmentData.occupiedBeds || 0,
        staff_count_c: departmentData.staff_count_c || departmentData.staffCount || 0,
        floor_c: departmentData.floor_c || departmentData.floor
      }];

      const response = await apperClient.createRecord('department_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} departments:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating department:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, departmentData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Id: parseInt(id),
        ...(departmentData.Name && { Name: departmentData.Name }),
        ...(departmentData.name_c && { name_c: departmentData.name_c }),
        ...(departmentData.head_doctor_c && { head_doctor_c: departmentData.head_doctor_c }),
        ...(departmentData.total_beds_c !== undefined && { total_beds_c: departmentData.total_beds_c }),
        ...(departmentData.occupied_beds_c !== undefined && { occupied_beds_c: departmentData.occupied_beds_c }),
        ...(departmentData.staff_count_c !== undefined && { staff_count_c: departmentData.staff_count_c }),
        ...(departmentData.floor_c && { floor_c: departmentData.floor_c })
      }];

      const response = await apperClient.updateRecord('department_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} departments:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating department:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord('department_c', { 
        RecordIds: [parseInt(id)] 
      });

      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} departments:`, failed);
        }
        return response.results.some(r => r.success);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting department:", error?.response?.data?.message || error);
      return false;
return false;
    }
  }
}

export default new DepartmentService();