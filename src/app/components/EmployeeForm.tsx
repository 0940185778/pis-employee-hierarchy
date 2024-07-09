// "use client";
// import React, { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../redux/store';

// import { Employee } from '../utils/types';
// import { addEmployee, updateEmployee } from '../redux/slices/employeeSlice';
// import { addEmployeeApi, updateEmployeeApi } from '../utils/api';

// interface EmployeeFormProps {
//   employee?: Employee;
//   parentId?: number;
// }

// const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, parentId }) => {
//   const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<Employee>({
//     defaultValues: {
//       parentId,
//       name: employee?.name || '',
//       description: employee?.description || '',
//     },
//   });
//   const dispatch = useDispatch<AppDispatch>();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   React.useEffect(() => {
//     if (employee) {
//       setValue('name', employee.name);
//       setValue('description', employee.description || '');
//     }
//   }, [employee, setValue]);

//   const onSubmit: SubmitHandler<Employee> = async (data) => {
//     console.log('Form Data:', data); // Debugging log
//     setIsSubmitting(true);
//     setSuccessMessage(null);
//     try {
//       if (employee) {
//         await updateEmployeeApi({ ...data, id: employee.id });
//         dispatch(updateEmployee(data)); // Update locally in Redux store
//         setSuccessMessage('Employee updated successfully!');
//       } else {
//         const newEmployee = await addEmployeeApi({ ...data, parentId });
//         console.log('New Employee:', newEmployee); // Debugging log
//         dispatch(addEmployee(newEmployee)); // Add new employee to Redux store
//         setSuccessMessage('Employee added successfully!');
//         reset(); // Clear form after adding a new employee
//       }
//     } catch (error) {
//       console.error('Error while adding/updating employee:', error);
//       // Handle error if needed
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="mb-4">
//           <label htmlFor="parentId" className="block text-gray-700 font-bold mb-2">Parent ID</label>
//           <input {...register("parentId", { valueAsNumber: true })} id="parentId" type="number" className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none" defaultValue={parentId || ''} />
//           {errors.parentId && <span className="text-red-500 text-sm">Parent ID is required</span>}
//         </div>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
//           <input {...register("name", { required: "Name is required" })} id="name" type="text" className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" placeholder="Enter name" />
//           {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
//         </div>
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
//           <textarea {...register("description", { required: "Description is required" })} id="description" className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" placeholder="Enter description"></textarea>
//           {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
//         </div>
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : employee ? 'Update' : 'Add'} Employee
//         </button>
//       </form>
//       {successMessage && <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">{successMessage}</div>}
//     </div>
//   );
// };

// export default EmployeeForm;


"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

import { Employee } from '../utils/types';
import { addEmployeeThunk, updateEmployeeThunk } from '../redux/slices/employeeSlice';

interface EmployeeFormProps {
  employee?: Employee;
  parentId?: number;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, parentId }) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<Employee>({
    defaultValues: {
      parentId,
      name: employee?.name || '',
      description: employee?.description || '',
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (employee) {
      setValue('name', employee.name);
      setValue('description', employee.description || '');
    }
  }, [employee, setValue]);

  const onSubmit: SubmitHandler<Employee> = async (data) => {
    console.log('Form Data:', data); // Debugging log
    setIsSubmitting(true);
    setSuccessMessage(null);
    try {
      if (employee) {
        await dispatch(updateEmployeeThunk({ ...data, id: employee.id })).unwrap();
        setSuccessMessage('Employee updated successfully!');
      } else {
        await dispatch(addEmployeeThunk({ ...data, parentId })).unwrap();
        setSuccessMessage('Employee added successfully!');
        reset();
      }
    } catch (error) {
      console.error('Error while adding/updating employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="parentId" className="block text-gray-700 font-bold mb-2">Parent ID</label>
          <input {...register("parentId", { valueAsNumber: true })} id="parentId" type="number" className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none" defaultValue={parentId || ''} />
          {errors.parentId && <span className="text-red-500 text-sm">Parent ID is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input {...register("name", { required: "Name is required" })} id="name" type="text" className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" placeholder="Enter name" />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea {...register("description", { required: "Description is required" })} id="description" className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" placeholder="Enter description"></textarea>
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : employee ? 'Update' : 'Add'} Employee
        </button>
      </form>
      {successMessage && <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">{successMessage}</div>}
    </div>
  );
};

export default EmployeeForm;
