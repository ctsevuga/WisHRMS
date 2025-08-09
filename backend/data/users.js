import bcrypt from 'bcryptjs';

const users = [
  {
    "_id": "6845b8a4e253d504190f32f1",
    "name": "Admin User",
    "phone": "1111111111",
    "password": "$2a$10$W8xN8oDH8zUy.OPCZ9yY/u1awKG8GdGc3Ff87Ce53j1UPPSM/1EO2",
    "isAdmin": true,
    "empId": 1000,
    "isHR": false,
    "isEmployee": true,
    "__v": 0,
    "createdAt": "2025-05-22 10:19:52",
    "updatedAt": "2025-05-22 10:19:52"
  },
  {
    "_id": "6845b8a4e253d504190f32f2",
    "name": "Ramesh",
    "phone": "2222222222",
    "password": "$2a$10$PBjVlL99Vc7gFMHfIZNzWuAy7VvU3hgBQxJas70D8siR8FIPh9mVK",
    "isAdmin": false,
    "empId": 1001,
    "isHR": true,
    "isEmployee": true,
    "__v": 0,
    "createdAt": "2025-05-22 10:19:52",
    "updatedAt": "2025-05-22 10:19:52"
  },
  {
    "_id": "6845b8a4e253d504190f32f3",
    "name": "Suresh",
    "phone": "3333333333",
    "password": "$2a$10$TpIIIlrd6FQ32sDv50.aSuhGJMX1MCod6qYHUZttNJugyjQ8yJDBC",
    "isAdmin": false,
    "empId": 1002,
    "isHR": false,
    "isEmployee": true,
    "__v": 0,
    "createdAt": "2025-05-22 10:19:52",
    "updatedAt": "2025-05-22 10:19:52"
  },
  {
    "_id": "6845b8a4e253d504190f32f4",
    "name": "Geetha",
    "phone": "4444444444",
    "password": "$2a$10$DINVSFYbLv5PUa41DYf6Qe7FeWvXezBUVWLfnW5tXDTcIjIf9nb9u",
    "isAdmin": false,
    "empId": 1003,
    "isHR": false,
    "isEmployee": true,
    "__v": 0,
    "createdAt": "2025-05-22 10:19:52",
    "updatedAt": "2025-05-22 10:19:52"
  },
  {
    "_id": "6845b8a4e253d504190f32f5",
    "name": "Velu",
    "phone": "5555555555",
    "password": "$2a$10$LJKFtEdQ3ZbY8UvqyFMGuu2m9G5J3gCCZIRfpYY1ksm9UPQoNFB1C",
    "isAdmin": false,
    "empId": 1004,
    "isHR": false,
    "isEmployee": true,
    "__v": 0,
    "createdAt": "2025-05-22 10:19:52",
    "updatedAt": "2025-05-22 10:19:52"
  },
  {
    "_id": "6845b8a4e253d504190f32f6",
    "name": "Veena",
    "phone": "6666666666",
    "password": "$2a$10$qCwDhtz1cNAMoH7f5f03aeg1F/q9vOgQ564cmWolMQOp2OAK9sfpe",
    "isAdmin": false,
    "empId": 1005,
    "isHR": false,
    "isEmployee": true,
    "__v": 0,
    "createdAt": "2025-05-22 10:19:52",
    "updatedAt": "2025-05-22 10:19:52"
  },
  {
    "_id": "6845b8a4e253d504190f32f7",
    "name": "Guna",
    "phone": "7777777777",
    "password": "$2a$10$HHeVZU6xQFHo3WDI/51ZYeYHl2zhGrJ7qmkLCEjpTPfpR3sPw.FYq",
    "isAdmin": false,
    "empId": 1006,
    "isHR": false,
    "isEmployee": true,
    "__v": 0,
    "createdAt": "2025-05-22 10:19:52",
    "updatedAt": "2025-05-22 10:19:52"
  },
  {
    "_id": "6845b8a4e253d504190f32f8",
    "name": "Janaki",
    "phone": "8888888888",
    "password": "$2a$10$PN0oR1FJX.qPuLF4LE6IBuTUnb30wh.ifrFLm3TzDQUtMc5J84VNi",
    "isAdmin": false,
    "empId": 1007,
    "isHR": false,
    "isEmployee": true,
    "__v": 0,
    "createdAt": "2025-05-22 10:19:52",
    "updatedAt": "2025-06-09 15:46:26"
  },
  {
    "_id": "6845b8a4e253d504190f32f9",
    "name": "Kannan",
    "phone": "9999999999",
    "password": "$2a$10$LnZflCjhYBZOuNkaHp0eJOMgdONCQpwdlX1vmcqKzFsXfnAm36tK.",
    "isAdmin": false,
    "empId": 1008,
    "isHR": false,
    "isEmployee": true,
    "__v": 0,
    "createdAt": "2025-05-28 08:45:17",
    "updatedAt": "2025-05-28 08:45:17"
  }
]
;

export default users;
