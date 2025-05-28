'use client';

import React,{ useState } from 'react';
import { Button } from '../ui/button';
import { roboto } from '../ui/fonts';
import { AtSymbolIcon, UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { Employee, SessionUser } from '../lib/definitions';

const BusinessView = ({user}: {user: SessionUser}) => {
  const [employees, setEmployees] = useState<Employee[]>(user?.employees || []  );
  const [newLicense, setNewLicense] = useState('');
  const [error, setError] = useState('');

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!newLicense.trim()) {
      setError('Please enter a license number.');
      return;
    }
    if (employees.some(emp => emp.license === newLicense.trim())) {
      setError('Employee already exists.');
      return;
    }
    // In a real app, fetch employee name from API
    setEmployees([...employees, { license: newLicense.trim(), name: 'New Employee' }]);
    setNewLicense('');
  };

  const handleRemoveEmployee = (license: string) => {
    setEmployees(employees.filter(emp => emp.license !== license));
  };

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h2 className={`${roboto.className} mb-3 text-xl text-blue-900`}>
        Employees
      </h2>
      <ul className="mb-4 space-y-2">
        {employees.map(emp => (
          <li key={emp.license} className="flex items-center justify-between bg-white rounded-md px-3 py-2 border border-gray-200">
            <span className="text-blue-900">{emp.name} <span className="text-xs text-gray-500">({emp.license})</span></span>
            <Button
              type="button"
              // variant="outline"
              className="ml-2 px-2 py-1 text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => handleRemoveEmployee(emp.license)}
              title="Remove employee"
            >
              <UserMinusIcon className="h-5 w-5" />
            </Button>
          </li>
        ))}
        {employees.length === 0 && (
          <li className="text-gray-500">No employees found.</li>
        )}
      </ul>
      <form onSubmit={handleAddEmployee} className="space-y-2">
        <label className="block text-xs font-medium text-gray-900" htmlFor="new-employee-license">
          Add Employee by License
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-blue-900 text-blue-900"
            id="new-employee-license"
            type="text"
            name="new-employee-license"
            placeholder="Enter license number"
            value={newLicense}
            onChange={e => setNewLicense(e.target.value)}
            required
          />
          <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <Button type="submit" className="w-full flex items-center justify-center">
          Add Employee <UserPlusIcon className="ml-2 h-5 w-5" />
        </Button>
        {error && <div className="flex items-center text-red-500 text-sm mt-1">{error}</div>}
      </form>
    </div>
  );
};

export default BusinessView;