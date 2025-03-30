const { asFunction, createContainer } = require("awilix");

const serverFactory = require("./application/server");
const routerFactory = require("./application/router");

const dbContextFactory = require("./infrastructure/database");
const repositories = require("./infrastructure/repositories");

const loginController = require("./application/api/controllers/loginController");
const userController = require("./application/api/controllers/userController");
const kindergartenController = require("./application/api/controllers/kindergartenController");
const studentController = require("./application/api/controllers/studentController");
const studentClassController = require("./application/api/controllers/studentClassController");
const classSchoolYearController = require("./application/api/controllers/classSchoolYearController");
const calendarController = require("./application/api/controllers/calendarController");
const userAddressController = require("./application/api/controllers/userAddressController");
const userContactsController = require("./application/api/controllers/userContactsController");
const menuClassController = require("./application/api/controllers/menuClassController");
const userStudentController = require("./application/api/controllers/userStudentController");
const notificationController = require("./application/api/controllers/notificationController");
const userNotificationController = require("./application/api/controllers/userNotificationController");
const studentsClassSchoolYearController = require("./application/api/controllers/studentsClassSchoolYearController");
const menuClassSchoolYearController = require("./application/api/controllers/menuClassSchoolYearController");
const classroomController = require("./application/api/controllers/classroomController");
const classroomClassSchoolYearController = require("./application/api/controllers/classroomClassSchoolYearController");
const consumedTypeMenuController = require("./application/api/controllers/consumedTypeMenuController");
const routineTypeController = require("./application/api/controllers/routineTypeController");
const routineTypeDetailController = require("./application/api/controllers/routineTypeDetailController");
const studentDailyController = require("./application/api/controllers/studentDailyController");
const studentDailyMenuController = require("./application/api/controllers/studentDailyMenuController");
const studentDailyRoutineController = require("./application/api/controllers/studentDailyRoutineController");
const studentDailyNotificationController = require("./application/api/controllers/studentDailyNotificationController");
const studentMedicamentController = require("./application/api/controllers/studentMedicamentController");

const verifyAuthenticationMiddleware = require("./application/api/middlewares/verifyAuthentication");
const adminAuthorizationMiddleare = require("./application/api/middlewares/adminAutorization");
const userAuthorizationMiddleare = require("./application/api/middlewares/userAutorization");

const container = createContainer();

container.register({
  server: asFunction(serverFactory).singleton(),
  router: asFunction(routerFactory).singleton(),

  dbContext: asFunction(dbContextFactory).singleton(),
  repository: asFunction(repositories).singleton(),

  loginController: asFunction(loginController).singleton(),
  userController: asFunction(userController).singleton(),
  kindergartenController: asFunction(kindergartenController).singleton(),
  studentController: asFunction(studentController).singleton(),
  studentClassController: asFunction(studentClassController).singleton(),
  classSchoolYearController: asFunction(classSchoolYearController).singleton(),
  calendarController: asFunction(calendarController).singleton(),
  userAddressController: asFunction(userAddressController).singleton(),
  userContactsController: asFunction(userContactsController).singleton(),
  menuClassController: asFunction(menuClassController).singleton(),
  userStudentController: asFunction(userStudentController).singleton(),
  notificationController: asFunction(notificationController).singleton(),
  userNotificationController: asFunction(userNotificationController).singleton(),
  studentsClassSchoolYearController: asFunction(studentsClassSchoolYearController).singleton(),
  menuClassSchoolYearController: asFunction(menuClassSchoolYearController).singleton(),
  classroomController: asFunction(classroomController).singleton(),
  classroomClassSchoolYearController: asFunction(classroomClassSchoolYearController).singleton(),
  consumedTypeMenuController: asFunction(consumedTypeMenuController).singleton(),
  routineTypeController: asFunction(routineTypeController).singleton(),
  routineTypeDetailController: asFunction(routineTypeDetailController).singleton(),
  studentDailyController: asFunction(studentDailyController).singleton(),
  studentDailyMenuController: asFunction(studentDailyMenuController).singleton(),
  studentDailyRoutineController: asFunction(studentDailyRoutineController).singleton(),
  studentDailyNotificationController: asFunction(studentDailyNotificationController).singleton(),
  studentMedicamentController: asFunction(studentMedicamentController).singleton(),

  verifyAuthenticationMiddleware: asFunction(verifyAuthenticationMiddleware).singleton(),
  adminAuthorizationMiddleare: asFunction(adminAuthorizationMiddleare).singleton(),
  userAuthorizationMiddleare: asFunction(userAuthorizationMiddleare).singleton(),
});

module.exports = container;
