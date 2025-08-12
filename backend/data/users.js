import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    phone: '1111111111',
    password: bcrypt.hashSync('123456', 10),
    empId: 1000,
    role: "admin"
  },
  {
    name: 'Ramesh',
    phone: '2222222222',
    password: bcrypt.hashSync('123456', 10),
    empId: 1001,
    role: "employee"
  },
  {
    name: 'Suresh',
    phone: '3333333333',
    password: bcrypt.hashSync('123456', 10),
    empId: 1002,
    role: "employee"
  },
   {
    name: 'Geetha',
    phone: '4444444444',
    password: bcrypt.hashSync('123456', 10),
    empId: 1003,
    role: "employee"
  },
   {
    name: 'Velu',
    phone: '5555555555',
    password: bcrypt.hashSync('123456', 10),
    empId: 1004,
    role: "employee"
  },
  {
    name: 'Veena',
    phone: '6666666666',
    password: bcrypt.hashSync('123456', 10),
    empId: 1005,
    role: "employee"
  },
  {
    name: 'Guna',
    phone: '7777777777',
    password: bcrypt.hashSync('123456', 10),
    empId: 1006,
    role: "employee"
  },
  {
    name: 'Janaki',
    phone: '8888888888',
    password: bcrypt.hashSync('123456', 10),
    empId: 1007,
    role: "employee"
  },
  {
    name: 'Sutheesh',
    phone: '8888888888',
    password: bcrypt.hashSync('123456', 10),
    empId: 1008,
    role: "employee"
  },
];

export default users;
