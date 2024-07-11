SELECT employee.employee_name AS employee, departments.department
FROM departments
LEFT JOIN employee
ON departments.employee_id = employee.id
ORDER BY employee.employee_name;
