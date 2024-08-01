import UserSubject from "../types/UserSubject";

const getSubjectFrequence = (
  userSubjects: UserSubject[],
  userSubject: UserSubject
) => {
  const userSubjectsWithSameSubjectId = userSubjects.filter(
    (subject) =>
      subject.subjectClass.subject.id === userSubject.subjectClass.subject.id
  );

  const totalAvailableDaysLength = userSubjectsWithSameSubjectId.reduce(
    (acc, subject) => acc + subject.subjectClass.availableDays.length,
    0
  );

  const totalClasses = totalAvailableDaysLength * 17;
  const totalAbsences = userSubject.absences!;
  return Math.round(((totalClasses - totalAbsences) / totalClasses) * 100);
};

export default getSubjectFrequence;
