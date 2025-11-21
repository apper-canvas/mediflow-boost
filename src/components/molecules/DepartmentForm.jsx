import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import departmentService from "@/services/api/departmentService";

const DepartmentForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name_c: "",
    head_doctor_c: "",
    total_beds_c: "",
    occupied_beds_c: "",
    staff_count_c: "",
    floor_c: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name_c?.trim()) {
      newErrors.name_c = "Department name is required";
    }

    if (!formData.head_doctor_c?.trim()) {
      newErrors.head_doctor_c = "Head doctor is required";
    }

    if (!formData.total_beds_c || formData.total_beds_c < 0) {
      newErrors.total_beds_c = "Total beds must be a positive number";
    }

    if (formData.occupied_beds_c < 0) {
      newErrors.occupied_beds_c = "Occupied beds cannot be negative";
    }

    if (formData.occupied_beds_c > formData.total_beds_c) {
      newErrors.occupied_beds_c = "Occupied beds cannot exceed total beds";
    }

    if (!formData.staff_count_c || formData.staff_count_c < 0) {
      newErrors.staff_count_c = "Staff count must be a positive number";
    }

    if (!formData.floor_c?.trim()) {
      newErrors.floor_c = "Floor information is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numeric fields to appropriate types
    let processedValue = value;
    if (name === 'total_beds_c' || name === 'occupied_beds_c' || name === 'staff_count_c') {
      processedValue = value === '' ? '' : parseInt(value) || 0;
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    setLoading(true);
    
    try {
      // Prepare data with only non-empty values and proper types
      const departmentData = {};
      
      if (formData.name_c?.trim()) departmentData.name_c = formData.name_c.trim();
      if (formData.head_doctor_c?.trim()) departmentData.head_doctor_c = formData.head_doctor_c.trim();
      if (formData.total_beds_c !== '') departmentData.total_beds_c = parseInt(formData.total_beds_c);
      if (formData.occupied_beds_c !== '') departmentData.occupied_beds_c = parseInt(formData.occupied_beds_c);
      if (formData.staff_count_c !== '') departmentData.staff_count_c = parseInt(formData.staff_count_c);
      if (formData.floor_c?.trim()) departmentData.floor_c = formData.floor_c.trim();

      await departmentService.create(departmentData);
      
      toast.success("Department created successfully!");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Error creating department:", error);
      toast.error(error.message || "Failed to create department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add New Department</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={loading}
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department Name *
              </label>
              <Input
                name="name_c"
                value={formData.name_c}
                onChange={handleInputChange}
                placeholder="e.g., Cardiology"
                error={errors.name_c}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Head Doctor *
              </label>
              <Input
                name="head_doctor_c"
                value={formData.head_doctor_c}
                onChange={handleInputChange}
                placeholder="e.g., Dr. Smith"
                error={errors.head_doctor_c}
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Beds *
                </label>
                <Input
                  type="number"
                  name="total_beds_c"
                  value={formData.total_beds_c}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  error={errors.total_beds_c}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupied Beds
                </label>
                <Input
                  type="number"
                  name="occupied_beds_c"
                  value={formData.occupied_beds_c}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  error={errors.occupied_beds_c}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Staff Count *
              </label>
              <Input
                type="number"
                name="staff_count_c"
                value={formData.staff_count_c}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                error={errors.staff_count_c}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor *
              </label>
              <Input
                name="floor_c"
                value={formData.floor_c}
                onChange={handleInputChange}
                placeholder="e.g., 2nd Floor"
                error={errors.floor_c}
                disabled={loading}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                    Create Department
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentForm;