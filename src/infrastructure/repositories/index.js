const User = require("./user");
const UserAddress = require("./userAddress");
const UserContacts = require("./userContacts");
const Kindergarten = require("./kindergarten");
const Student = require("./student");
const StudentClass = require("./studentsClass");
const ClassSchoolYear = require("./classSchoolYear");
const Calendar = require("./calendar");
const MenuClass = require("./menuClass");
const UserStudent = require("./userStudent");
const Notification = require("./notification");
const UserNotification = require("./userNotification");
const StudentsClassSchoolYear = require("./studentsClassSchoolYear");
const MenuClassSchoolYear = require("./menuClassSchoolYear");
const StudentDaily = require("./studentDaily");
const StudentDailyMenu = require("./StudentDailyMenu");
const StudentDailyNotification = require("./studentDailyNotification");
const StudentDailyRoutine = require("./studentDailyRoutine");
const StudentMedicament = require("./studentMedicament");
const Classroom = require("./classroom");
const ClassroomClassSchoolYear = require("./classroomClassSchoolYear");
const ConsumedTypeMenu = require("./consumedTypeMenu");
const RoutineType = require("./routineType");
const RoutineTypeDetail = require("./routineTypeDetail");

module.exports = ({ dbContext }) => ({
  userRepository: User(dbContext),
  userAddressRepository: UserAddress(dbContext),
  userContactsRepository: UserContacts(dbContext),
  kindergartenRepository: Kindergarten(dbContext),
  studentRepository: Student(dbContext),
  studentClassRepository: StudentClass(dbContext),
  classSchoolYearRepository: ClassSchoolYear(dbContext),
  calendarRepository: Calendar(dbContext),
  menuClassRepository: MenuClass(dbContext),
  userStudentRepository: UserStudent(dbContext),
  notificationRepository: Notification(dbContext),
  userNotificationRepository: UserNotification(dbContext),
  studentsClassSchoolYearRepository: StudentsClassSchoolYear(dbContext),
  menuClassSchoolYearRepository: MenuClassSchoolYear(dbContext),
  studentDailyRepository: StudentDaily(dbContext),
  studentDailyNotificationRepository: StudentDailyNotification(dbContext),
  studentDailyRoutineRepository: StudentDailyRoutine(dbContext),
  studentDailyMenuRepository: StudentDailyMenu(dbContext),
  studentMedicamentRepository: StudentMedicament(dbContext),
  classroomRepository: Classroom(dbContext),
  classroomClassSchoolYearRepository: ClassroomClassSchoolYear(dbContext),
  consumedTypeMenuRepository: ConsumedTypeMenu(dbContext),
  routineTypeRepository: RoutineType(dbContext),
  routineTypeDetailRepository: RoutineTypeDetail(dbContext),
});
