import API from "../api/axios";

/* ===========================
   ADMIN USERS
=========================== */

export const getAllUsers = () => API.get("/admin/users");

export const createUser = (data) => API.post("/admin/users", data);

export const verifyUser = (id) =>
  API.put(`/admin/users/${id}/verify`);

export const updateUser = (id, data) =>
  API.put(`/admin/users/${id}`, data);

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);


/* ===========================
   PROFILE
=========================== */

export const getMyProfile = () =>
  API.get("/profile/me");

export const updateProfile = (data) =>
  API.put("/profile/me", data);

export const getProfileByAdmin = (id) =>
  API.get(`/profile/admin/${id}`);


/* ===========================
   EVENTS
=========================== */

export const getEvents = () =>
  API.get("/events");

export const createEvent = (data) =>
  API.post("/events", data);

export const updateEvent = (id, data) =>
  API.put(`/events/${id}`, data);

export const deleteEvent = (id) =>
  API.delete(`/events/${id}`);

export const registerEvent = (id) =>
  API.post(`/events/${id}/register`);

export const getMyRegistrations = () =>
  API.get("/events/my-registrations");


/* ===========================
   ANNOUNCEMENTS
=========================== */

export const getAnnouncements = () =>
  API.get("/announcements");

export const createAnnouncement = (data) =>
  API.post("/announcements", data);

export const deleteAnnouncement = (id) =>
  API.delete(`/announcements/${id}`);
export const filterAnnouncements = (category, priority) =>
  API.get("/announcements/filter", {
    params: { category, priority }
  });

/* ===========================
   FORUM
=========================== */

export const getPosts = () =>
  API.get("/forum");

export const getSinglePost = (id) =>
  API.get(`/forum/${id}`);

export const createPost = (data) =>
  API.post("/forum", data);

export const likePost = (id) =>
  API.put(`/forum/${id}/like`);

export const deletePost = (id) =>
  API.delete(`/forum/${id}`);

export const addComment = (content, postId) =>
  API.post(`/posts/${postId}/comments`, {
    content: content
  });

export const filterByCategory = (category) =>
  API.get(`/forum/category/${category}`);

/* ===========================
   MENTORSHIP
=========================== */

// get all mentors
export const getMentors = () =>
  API.get("/mentorship/mentors");

// send mentorship request
export const sendMentorshipRequest = (mentorId, data) =>
  API.post(`/mentorship/request/${mentorId}`, data);

// accept / reject request
export const updateMentorshipStatus = (requestId, status) =>
  API.put(`/mentorship/status/${requestId}?status=${status}`);

// get requests sent by me
export const getMyMentorshipRequests = () =>
  API.get("/mentorship/my-requests");

// get requests received by mentor
export const getReceivedRequests = () =>
  API.get("/mentorship/received");

// provide solution
export const provideMentorSolution = (requestId, data) =>
  API.put(`/mentorship/solve/${requestId}`, data);

export const becomeMentor = (data) =>
  API.post("/mentorship/become", data);

export const getAlumni = () =>
API.get("/alumni");

//connections

export const getMyConnections = () =>
API.get("/connections/my");

export const sendConnection = (receiverId) =>
  API.post(`/connections/${receiverId}`);
//alumni verification and mentor management (admin)
export const verifyAlumni = (id) =>
  API.put(`/alumni/${id}/verify`);

export const unverifyAlumni = (id) =>
  API.put(`/alumni/${id}/unverify`);

export const makeMentor = (id) =>
  API.put(`/alumni/${id}/mentor`);

export const removeMentor = (id) =>
  API.put(`/alumni/${id}/remove-mentor`);