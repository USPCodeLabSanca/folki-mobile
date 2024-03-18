import UserSubject from "../types/UserSubject";

const getSubjectFrequence = (
  userSubjects: UserSubject[],
  userSubject: UserSubject
) => {
  const userSubjectsWithSameSubjectId = userSubjects.filter(
    (subject) => subject.subject.id === userSubject.subject.id
  );

  const totalAvailableDaysLength = userSubjectsWithSameSubjectId.reduce(
    (acc, subject) => acc + subject.availableDays.length,
    0
  );

  const totalClasses = totalAvailableDaysLength * 17;
  const totalAbsences = userSubject.absences!;
  return Math.round(((totalClasses - totalAbsences) / totalClasses) * 100);
};

export default getSubjectFrequence;
