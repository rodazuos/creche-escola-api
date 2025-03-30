const koaRouter = require("koa-router");

module.exports = ({
  userController,
  userAddressController,
  userContactsController,
  loginController,
  kindergartenController,
  studentController,
  studentClassController,
  classSchoolYearController,
  calendarController,
  menuClassController,
  userStudentController,
  notificationController,
  userNotificationController,
  studentsClassSchoolYearController,
  menuClassSchoolYearController,
  classroomController,
  classroomClassSchoolYearController,
  consumedTypeMenuController,
  routineTypeController,
  routineTypeDetailController,
  studentDailyController,
  studentDailyMenuController,
  studentDailyRoutineController,
  studentDailyNotificationController,
  studentMedicamentController,
  verifyAuthenticationMiddleware,
  adminAuthorizationMiddleare,
}) => {
  const router = new koaRouter();

  router.get("/healthcheck", (ctx) => {
    ctx.body = "Healthcheck ok!";
  });

  router.post("/login", loginController.login);
  router.get("/authorization", loginController.authorization);

  router.get("/user/me", verifyAuthenticationMiddleware, userController.getUserAccount);
  router.put("/user/me", verifyAuthenticationMiddleware, userController.updateUserAccount);
  router.post("/user/me/updatePassword", verifyAuthenticationMiddleware, userController.updatePassword);

  router.post("/user", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, userController.create);
  router.put("/user/:id", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, userController.update);
  router.delete("/user/:id", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, userController.deleteLogic);
  router.get("/user/:id", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, userController.getUserById);
  router.get(
    "/user/cpf/:cpf",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userController.getUserByCpf
  );
  router.get("/user", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, userController.getUsers);
  router.put(
    "/user/resetPassword/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userController.resetPassword
  );

  router.get("/user/:idUser/address", verifyAuthenticationMiddleware, userAddressController.getAll);
  router.get("/user/address/:id", verifyAuthenticationMiddleware, userAddressController.getById);
  router.post(
    "/user/address",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userAddressController.create
  );
  router.put(
    "/user/address/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userAddressController.update
  );
  router.delete(
    "/user/address/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userAddressController.deleteLogic
  );

  router.get("/user/:idUser/contacts", verifyAuthenticationMiddleware, userContactsController.getAll);
  router.get("/user/contacts/:id", verifyAuthenticationMiddleware, userContactsController.getById);
  router.post(
    "/user/contacts",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userContactsController.create
  );
  router.put(
    "/user/contacts/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userContactsController.update
  );
  router.delete(
    "/user/contacts/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userContactsController.deleteLogic
  );

  router.get(
    "/kindergarten/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    kindergartenController.getById
  );
  router.put(
    "/kindergarten/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    kindergartenController.update
  );

  router.get("/student/:id", verifyAuthenticationMiddleware, studentController.getById);
  router.post("/student", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, studentController.create);
  router.put("/student/:id", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, studentController.update);
  router.get("/student", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, studentController.getStudents);
  router.delete(
    "/student/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentController.deleteLogic
  );

  router.get("/studentClass/:id", verifyAuthenticationMiddleware, studentClassController.getById);
  router.post(
    "/studentClass",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentClassController.create
  );
  router.put(
    "/studentClass/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentClassController.update
  );
  router.get(
    "/studentClass",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentClassController.getAll
  );
  router.delete(
    "/studentClass/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentClassController.deleteLogic
  );

  router.get("/schoolYear/:id", verifyAuthenticationMiddleware, classSchoolYearController.getById);
  router.post(
    "/schoolYear",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classSchoolYearController.create
  );
  router.put(
    "/schoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classSchoolYearController.update
  );
  router.get(
    "/schoolYear",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classSchoolYearController.getAll
  );
  router.delete(
    "/schoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classSchoolYearController.deleteLogic
  );

  router.get("/calendar/:id", verifyAuthenticationMiddleware, calendarController.getById);
  router.post("/calendar", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, calendarController.create);
  router.put("/calendar/:id", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, calendarController.update);
  router.get("/calendar", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, calendarController.getAll);
  router.delete(
    "/calendar/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    calendarController.deleteLogic
  );

  router.get("/menuClass/:id", verifyAuthenticationMiddleware, menuClassController.getById);
  router.post("/menuClass", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, menuClassController.create);
  router.put("/menuClass/:id", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, menuClassController.update);
  router.get("/menuClass", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, menuClassController.getAll);
  router.delete(
    "/menuClass/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    menuClassController.deleteLogic
  );

  router.get(
    "/userStudent/students/:idUser",
    verifyAuthenticationMiddleware,
    userStudentController.getStudentsByIdUser
  );
  router.post(
    "/userStudent",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userStudentController.create
  );
  router.put(
    "/userStudent/:idStudent/:idUser",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userStudentController.update
  );
  router.get(
    "/userStudent/users/:idStudent",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userStudentController.getUsersByIdStudent
  );
  router.delete(
    "/userStudent/:idStudent/:idUser",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userStudentController.deleteLogic
  );

  router.get("/notification/:id", verifyAuthenticationMiddleware, notificationController.getById);
  router.post(
    "/notification",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    notificationController.create
  );
  router.put(
    "/notification/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    notificationController.update
  );
  router.get(
    "/notification",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    notificationController.getAll
  );
  router.delete(
    "/notification/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    notificationController.deleteLogic
  );

  router.get("/userNotification/:id", verifyAuthenticationMiddleware, userNotificationController.getById);
  router.post(
    "/userNotification",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userNotificationController.create
  );
  router.put("/userNotification/:id", verifyAuthenticationMiddleware, userNotificationController.update);
  router.get(
    "/userNotification/user/:idUser",
    verifyAuthenticationMiddleware,
    userNotificationController.getAllByIdUser
  );
  router.get(
    "/userNotification/notification/:idNotification",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userNotificationController.getAllByidNotification
  );
  router.delete(
    "/userNotification/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    userNotificationController.deleteLogic
  );

  router.post(
    "/studentsClassSchoolYear",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentsClassSchoolYearController.create
  );
  router.put(
    "/studentsClassSchoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentsClassSchoolYearController.update
  );
  router.get(
    "/studentsClassSchoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentsClassSchoolYearController.getById
  );
  router.get(
    "/studentsClassSchoolYear/student/:idStudent",
    verifyAuthenticationMiddleware,
    studentsClassSchoolYearController.getAllByIdStudent
  );
  router.get(
    "/studentsClassSchoolYear",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentsClassSchoolYearController.getAll
  );
  router.delete(
    "/studentsClassSchoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentsClassSchoolYearController.deleteLogic
  );

  router.get(
    "/menuClassSchoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    menuClassSchoolYearController.getById
  );
  router.get(
    "/menuClassSchoolYear/studentClass/:idStudentsClass",
    verifyAuthenticationMiddleware,
    menuClassSchoolYearController.getAllByidStudentsClass
  );
  router.post(
    "/menuClassSchoolYear",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    menuClassSchoolYearController.create
  );
  router.put(
    "/menuClassSchoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    menuClassSchoolYearController.update
  );
  router.delete(
    "/menuClassSchoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    menuClassSchoolYearController.deleteLogic
  );

  router.get(
    "/classroom/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classroomController.getById
  );
  router.post("/classroom", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, classroomController.create);
  router.put("/classroom/:id", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, classroomController.update);
  router.get("/classroom", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, classroomController.getAll);
  router.delete(
    "/classroom/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classroomController.deleteLogic
  );

  router.get(
    "/classroomClassSchoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classroomClassSchoolYearController.getById
  );
  router.post(
    "/classroomClassSchoolYear",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classroomClassSchoolYearController.create
  );
  router.put(
    "/classroomClassSchoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classroomClassSchoolYearController.update
  );
  router.get(
    "/classroomClassSchoolYear",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classroomClassSchoolYearController.getAll
  );
  router.get(
    "/classroomClassSchoolYear/studentsClass/:idStudentsClass",
    verifyAuthenticationMiddleware,
    classroomClassSchoolYearController.getAllByIdStudentsClass
  );
  router.delete(
    "/classroomClassSchoolYear/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    classroomClassSchoolYearController.deleteLogic
  );

  router.get("/studentMedicament/:id", verifyAuthenticationMiddleware, studentMedicamentController.getById);
  router.post("/studentMedicament", verifyAuthenticationMiddleware, studentMedicamentController.create);
  router.put("/studentMedicament/:id", verifyAuthenticationMiddleware, studentMedicamentController.update);
  router.get("/studentMedicament", verifyAuthenticationMiddleware, studentMedicamentController.getAll);
  router.delete("/studentMedicament/:id", verifyAuthenticationMiddleware, studentMedicamentController.deleteLogic);

  router.get(
    "/studentDailyNotification/:id",
    verifyAuthenticationMiddleware,
    studentDailyNotificationController.getById
  );
  router.post("/studentDailyNotification", verifyAuthenticationMiddleware, studentDailyNotificationController.create);
  router.put(
    "/studentDailyNotification/:id",
    verifyAuthenticationMiddleware,
    studentDailyNotificationController.update
  );
  router.get("/studentDailyNotification", verifyAuthenticationMiddleware, studentDailyNotificationController.getAll);
  router.delete(
    "/studentDailyNotification/:id",
    verifyAuthenticationMiddleware,
    studentDailyNotificationController.deleteLogic
  );

  router.get(
    "/routineType/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    routineTypeController.getById
  );
  router.post(
    "/routineType",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    routineTypeController.create
  );
  router.put(
    "/routineType/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    routineTypeController.update
  );
  router.get("/routineType", verifyAuthenticationMiddleware, adminAuthorizationMiddleare, routineTypeController.getAll);
  router.delete(
    "/routineType/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    routineTypeController.deleteLogic
  );

  router.get(
    "/routineTypeDetail/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    routineTypeDetailController.getById
  );
  router.post(
    "/routineTypeDetail",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    routineTypeDetailController.create
  );
  router.put(
    "/routineTypeDetail/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    routineTypeDetailController.update
  );
  router.get(
    "/routineTypeDetail",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    routineTypeDetailController.getAll
  );
  router.delete(
    "/routineTypeDetail/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    routineTypeDetailController.deleteLogic
  );

  router.get(
    "/studentDailyRoutine/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyRoutineController.getById
  );
  router.post(
    "/studentDailyRoutine",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyRoutineController.create
  );
  router.put(
    "/studentDailyRoutine/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyRoutineController.update
  );
  router.get(
    "/studentDailyRoutine",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyRoutineController.getAll
  );
  router.delete(
    "/studentDailyRoutine/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyRoutineController.deleteLogic
  );

  router.get(
    "/studentDaily/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyController.getById
  );
  router.post(
    "/studentDaily",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyController.create
  );
  router.put(
    "/studentDaily/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyController.update
  );
  router.get(
    "/studentDaily",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyController.getAll
  );
  router.delete(
    "/studentDaily/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyController.deleteLogic
  );

  router.get(
    "/consumedTypeMenu/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    consumedTypeMenuController.getById
  );
  router.post(
    "/consumedTypeMenu",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    consumedTypeMenuController.create
  );
  router.put(
    "/consumedTypeMenu/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    consumedTypeMenuController.update
  );
  router.get(
    "/consumedTypeMenu",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    consumedTypeMenuController.getAll
  );
  router.delete(
    "/consumedTypeMenu/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    consumedTypeMenuController.deleteLogic
  );

  router.get(
    "/studentDailyMenu/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyMenuController.getById
  );
  router.post(
    "/studentDailyMenu",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyMenuController.create
  );
  router.put(
    "/studentDailyMenu/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyMenuController.update
  );
  router.get(
    "/studentDailyMenu",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyMenuController.getAll
  );
  router.delete(
    "/studentDailyMenu/:id",
    verifyAuthenticationMiddleware,
    adminAuthorizationMiddleare,
    studentDailyMenuController.deleteLogic
  );

  return router;
};
