import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Mariyappan',
    phone: '1111111111',
    password: bcrypt.hashSync('123456', 10),
    empId: 1000,
    isAdmin: true,
   
  },
  {
    name: 'Ramesh',
    phone: '2222222222',
    password: bcrypt.hashSync('123456', 10),
    empId: 1001,
    isAdmin: false,
    
  },
  {
    name: 'Suresh',
    phone: '3333333333',
    password: bcrypt.hashSync('123456', 10),
    empId: 1002,
    isAdmin: false,
    
  },
   {
    name: 'Geetha',
    phone: '4444444444',
    password: bcrypt.hashSync('123456', 10),
    empId: 1003,
    isAdmin: false,
    
  },
   {
    name: 'Velu',
    phone: '5555555555',
    password: bcrypt.hashSync('123456', 10),
    empId: 1004,
    isAdmin: false,
    
  },
  {
    name: 'Veena',
    phone: '6666666666',
    password: bcrypt.hashSync('123456', 10),
    empId: 1005,
    isAdmin: false,
    
  },
  {
    name: 'Guna',
    phone: '7777777777',
    password: bcrypt.hashSync('123456', 10),
    empId: 1006,
    isAdmin: false,
    
  },
  {
    name: 'Janaki',
    phone: '8888888888',
    password: bcrypt.hashSync('123456', 10),
    empId: 1007,
    isAdmin: false,
    
  },
  {
    name: 'Sutheesh',
    phone: '8888888888',
    password: bcrypt.hashSync('123456', 10),
    empId: 1008,
    isAdmin: false,
    
  },
];

export default users;
