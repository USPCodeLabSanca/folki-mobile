import api from "../config/api";
import Absence from "../types/Absence";
import Activity from "../types/Activity";
import Campus from "../types/Campus";
import DriveItem from "../types/DriveItem";
import Group from "../types/Group";
import Institute from "../types/Institute";
import Subject from "../types/Subject";
import User from "../types/User";

const apiClient = {
  sendAuthCode: (email: string) => {
    return new Promise<{ userId: number }>(async (resolve, reject) => {
      const body = JSON.stringify({ email });

      try {
        const call = await fetch(`${api.apiUrl}/auth/email/`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body,
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  verifyAuthCode: (userId: number, authCode: string) => {
    return new Promise<{ token: string; user: User }>(
      async (resolve, reject) => {
        const body = JSON.stringify({ userId, authCode });

        try {
          const call = await fetch(`${api.apiUrl}/auth/verify/`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body,
          });

          const response = await call.json();

          if (!call.ok) {
            reject(response);
          }

          resolve(response);
        } catch (error) {
          reject(error);
        }
      }
    );
  },

  getMe: (token: string) => {
    return new Promise<{ user: User }>(async (resolve, reject) => {
      try {
        const call = await fetch(`${api.apiUrl}/users/me/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  getUserSubjects: (token: string) => {
    return new Promise<{ userSubjects: any[] }>(async (resolve, reject) => {
      try {
        const call = await fetch(`${api.apiUrl}/users/me/subjects`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  updateMe: (update: User, token: string) => {
    return new Promise<{ successful: boolean }>(async (resolve, reject) => {
      const body = JSON.stringify({ ...update });

      try {
        const call = await fetch(`${api.apiUrl}/users/me/`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  getCampuses: () => {
    return new Promise<Campus[]>(async (resolve, reject) => {
      try {
        const call = await fetch(`${api.apiUrl}/campuses/`, {
          method: "GET",
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  getInstitutes: (campusId: string) => {
    return new Promise<Institute[]>(async (resolve, reject) => {
      try {
        const call = await fetch(
          `${api.apiUrl}/campuses/${campusId}/institutes`,
          {
            method: "GET",
          }
        );

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  getCourses: (instituteId: string) => {
    return new Promise<any[]>(async (resolve, reject) => {
      try {
        const call = await fetch(
          `${api.apiUrl}/institutes/${instituteId}/courses`,
          {
            method: "GET",
          }
        );

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  getDefaultSubjects: (courseId: string, period: string) => {
    return new Promise<Subject[]>(async (resolve, reject) => {
      try {
        const call = await fetch(
          `${api.apiUrl}/courses/${courseId}/defaultSubjects/?period=${period}`,
          {
            method: "GET",
          }
        );

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  searchSubjects: (query: string, preferenceCampus: string) => {
    return new Promise<Subject[]>(async (resolve, reject) => {
      try {
        const call = await fetch(
          `${api.apiUrl}/subjects/?search=${query}&preferenceCampus=${preferenceCampus}`,
          {
            method: "GET",
          }
        );

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  updateMeSubjects: (subjectClassIds: number[], token: string) => {
    return new Promise<{ successful: boolean }>(async (resolve, reject) => {
      const body = JSON.stringify({ subjectClassIds });

      try {
        const call = await fetch(`${api.apiUrl}/users/me/subjects`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  getUserActivities: (token: string) => {
    return new Promise<{ activities: Activity[] }>(async (resolve, reject) => {
      try {
        const call = await fetch(`${api.apiUrl}/activities`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  createActivity: (
    name: string,
    type: string,
    date: Date,
    value: number,
    subjectId: string,
    token: string
  ) => {
    return new Promise<Activity>(async (resolve, reject) => {
      const body = JSON.stringify({
        name,
        description: "",
        value,
        type,
        finishDate: date,
        subjectId: parseInt(subjectId),
      });

      try {
        const call = await fetch(`${api.apiUrl}/activities`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response.activity);
      } catch (error) {
        reject(error);
      }
    });
  },

  getAbsences: (subjectId: string, token: string) => {
    return new Promise<{ absences: Absence[] }>(async (resolve, reject) => {
      try {
        const call = await fetch(
          `${api.apiUrl}/subjects/${subjectId}/absences`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  createAbsence: (subjectId: string, date: Date, token: string) => {
    return new Promise<{ successful: boolean }>(async (resolve, reject) => {
      const body = JSON.stringify({ date });

      try {
        const call = await fetch(
          `${api.apiUrl}/subjects/${subjectId}/absences`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body,
          }
        );

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteAbsence: (absenceId: string, token: string) => {
    return new Promise<{ successful: boolean }>(async (resolve, reject) => {
      try {
        const call = await fetch(`${api.apiUrl}/absences/${absenceId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  getGroups: (campusId: string, token: string) => {
    return new Promise<Group[]>(async (resolve, reject) => {
      try {
        const call = await fetch(`${api.apiUrl}/groups/?campusId=${campusId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response.groups);
      } catch (error) {
        reject(error);
      }
    });
  },

  getDriveItems: (subjectId: string, token: string) => {
    return new Promise<DriveItem[]>(async (resolve, reject) => {
      try {
        const call = await fetch(`${api.apiUrl}/subjects/${subjectId}/drive`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response.driveItems);
      } catch (error) {
        reject(error);
      }
    });
  },

  createDriveItem: (
    subjectId: string,
    name: string,
    link: string,
    token: string
  ) => {
    return new Promise<DriveItem>(async (resolve, reject) => {
      const body = JSON.stringify({ subjectId: Number(subjectId), name, link });

      try {
        const call = await fetch(`${api.apiUrl}/drive`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        });

        const response = await call.json();

        if (!call.ok) {
          reject(response);
        }

        resolve(response.driveItem);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default apiClient;
