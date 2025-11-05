import { getApperClient } from "@/services/apperClient";

class StaffService {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('staff_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "specialization_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "shift_start_c"}},
          {"field": {"Name": "shift_end_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching staff:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('staff_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "specialization_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "shift_start_c"}},
          {"field": {"Name": "shift_end_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching staff member ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(staffData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Name: staffData.Name || `${staffData.first_name_c} ${staffData.last_name_c}`,
        first_name_c: staffData.first_name_c || staffData.firstName,
        last_name_c: staffData.last_name_c || staffData.lastName,
        role_c: staffData.role_c || staffData.role,
        specialization_c: staffData.specialization_c || staffData.specialization,
        department_c: staffData.department_c || staffData.department,
        phone_c: staffData.phone_c || staffData.phone,
        email_c: staffData.email_c || staffData.email,
        status_c: staffData.status_c || staffData.status || "off-duty",
        shift_start_c: staffData.shift_start_c || staffData.shiftStart,
        shift_end_c: staffData.shift_end_c || staffData.shiftEnd
      }];

      const response = await apperClient.createRecord('staff_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} staff members:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating staff member:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, staffData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const records = [{
        Id: parseInt(id),
        ...(staffData.Name && { Name: staffData.Name }),
        ...(staffData.first_name_c && { first_name_c: staffData.first_name_c }),
        ...(staffData.last_name_c && { last_name_c: staffData.last_name_c }),
        ...(staffData.role_c && { role_c: staffData.role_c }),
        ...(staffData.specialization_c && { specialization_c: staffData.specialization_c }),
        ...(staffData.department_c && { department_c: staffData.department_c }),
        ...(staffData.phone_c && { phone_c: staffData.phone_c }),
        ...(staffData.email_c && { email_c: staffData.email_c }),
        ...(staffData.status_c && { status_c: staffData.status_c }),
        ...(staffData.shift_start_c && { shift_start_c: staffData.shift_start_c }),
        ...(staffData.shift_end_c && { shift_end_c: staffData.shift_end_c })
      }];

      const response = await apperClient.updateRecord('staff_c', { records });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} staff members:`, failed);
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating staff member:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord('staff_c', { 
        RecordIds: [parseInt(id)] 
      });

      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} staff members:`, failed);
        }
        return response.results.some(r => r.success);
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting staff member:", error?.response?.data?.message || error);
      return false;
    }
  }

  async getByDepartment(department) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('staff_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "specialization_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "shift_start_c"}},
          {"field": {"Name": "shift_end_c"}}
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
      console.error(`Error fetching staff for department ${department}:`, error?.response?.data?.message || error);
      return [];
    }
  }

  async getByRole(role) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('staff_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "specialization_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "shift_start_c"}},
          {"field": {"Name": "shift_end_c"}}
        ],
        where: [{
          "FieldName": "role_c",
          "Operator": "EqualTo",
          "Values": [role]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error(`Error fetching staff with role ${role}:`, error?.response?.data?.message || error);
      return [];
    }
  }

  async getByStatus(status) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('staff_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "specialization_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "shift_start_c"}},
          {"field": {"Name": "shift_end_c"}}
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
      console.error(`Error fetching staff with status ${status}:`, error?.response?.data?.message || error);
      return [];
    }
}
}

export default new StaffService();