// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import ViewCourse from "./ViewCourse";
// import axios from "../../api/axiosInstance";
// import toast from "react-hot-toast";

// const CourseDialog = ({ open, onClose, course }) => {

//   const [loading, setLoading] = useState(false);
//   const [enrolled, setEnrolled] = useState(false);

//   // ✅ Check if already enrolled
//   useEffect(() => {
//     if (!course) return;

//     const checkEnroll = async () => {
//       try {
//         const res = await axios.post("/api/learner/check-enroll", {
//           courseId: course.course_id,
//         });

//         if (res.data.enrolled) {
//           setEnrolled(true);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     checkEnroll();
//   }, [course]);

//   // ✅ Enroll function
// const handleEnroll = async () => {
//   setLoading(true);

//   try {
//     const res = await axios.post("/learner/enroll", {
//       courseId: course.course_id, // ✅ only courseId
//     });

//     toast.success(
//       res.data.paymentStatus === "PAID"
//         ? "✅ Course Enrolled Successfully"
//         : "💳 Payment Required"
//     );

//     setEnrolled(true);

//   } catch (err) {
//     console.log(err.response?.data);
//     toast.error(err.response?.data?.message || "Enroll failed");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

//       <DialogTitle>Course Details</DialogTitle>

//       <DialogContent dividers>
//         {!course ? (
//           <p>Loading course...</p>
//         ) : (
//           <ViewCourse course={course} />
//         )}

//         <div className="flex justify-between flex-col ">
//           <h2 className="font-bold text-black ">Title: <span className="font-semibold text-yellow-950">{course.title}</span></h2>
//           <h2 className="font-bold text-black ">Description: <span className="font-semibold text-yellow-950">{course.description}</span></h2>
//           <h2 className="font-bold text-black ">Course Type: <span className="font-semibold text-yellow-950">{course.course_type}</span></h2>
//           <h2 className="font-bold text-black ">Course Language: <span className="font-semibold text-yellow-950">{course.language}</span></h2>
//           <h2 className="font-bold text-black ">Corse Fee: <span className="font-semibold text-yellow-950">{course.price}</span></h2>
//           <h2 className="font-bold text-black ">Instructor Name: <span className="font-semibold text-yellow-950">{course.instructor_name}</span></h2>
//         </div>
//       </DialogContent>
      

//       <DialogActions className="flex justify-between px-6">
//         <div className="flex gap-3">

//           {/* ✅ Dynamic Button */}
//           <Button
//             variant="contained"
//             color={enrolled ? "success" : "primary"}
//             onClick={handleEnroll}
//             disabled={loading || enrolled}
//           >
//             {enrolled ? "Enrolled ✅" : loading ? "Enrolling..." : "Enroll"}
//           </Button>

//           <Button variant="contained" color="primary">
//             Save
//           </Button>
//         </div>

//         <Button onClick={onClose} variant="contained" color="error">
//           Close
//         </Button>
//       </DialogActions>

//     </Dialog>
//   );
// };

// export default CourseDialog;


import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from "@mui/material";
import { useEffect, useState } from "react";
import ViewCourse from "./ViewCourse";
import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";

const CourseDialog = ({ open, onClose, course }) => {

  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // ✅ Check if already enrolled
  useEffect(() => {
    if (!course) return;

    const checkEnroll = async () => {
      try {
        const res = await axios.post("/learner/check-access", {
          courseId: course.course_id,
        });

        setEnrolled(res.data.enrolled || res.data.access);
      } catch (err) {
        console.log(err);
      }
    };

    checkEnroll();
  }, [course]);


  const purchaseClick = async () => {
    toast("We're working on the Purchased Courses feature. It will be available soon!")
  }

  // ✅ Enroll Course
  const handleEnroll = async () => {
    if (enrolled) return;

    setLoading(true);

    try {
      const res = await axios.post("/learner/enroll", {
        courseId: course.course_id,
      });

      toast.success(
        res.data.paymentStatus === "PAID"
          ? "✅ Course Enrolled Successfully"
          : "💳 Payment Required"
      );

      setEnrolled(true);

    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Enroll failed");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">

      <DialogTitle className="flex justify-between items-center">
        <span>📚 Course Details</span>

        {/* ✅ Status Badge */}
        {enrolled ? (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            ✅ Enrolled
          </span>
        ) : course.course_type === "FREE" ? (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            🎓 Free Course
          </span>
        ) : (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
            💰 Paid Course
          </span>
        )}
      </DialogTitle>

      <DialogContent dividers>

        {/* 🎥 Course Preview */}
        <ViewCourse course={course} enrolled={enrolled} />

        {/* 📄 Course Info */}
        <div className="mt-6 space-y-2 text-gray-800 text-[15px]">

          <h1 className="text-lg font-bold">
            {course.title}
          </h1>

          <h2 className="text-black font-semibold">
            Description: <span className="text-green-400 font-medium">{course.description}</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <h2 className="text-black font-semibold">Language: <span className="text-green-400 font-medium">{course.language}</span></h2>
            <h2 className="text-black font-semibold">Fee: <span className="text-green-400 font-medium">₹{course.price}</span></h2>
            <h2 className="text-black font-semibold">Instructor: <span className="text-green-400 font-medium">{course.instructor_name}</span></h2>
            <h2 className="text-black font-semibold">Type: <span className="text-green-400 font-medium">{course.course_type}</span></h2>
            <h2 className="text-black font-semibold">Language: <span className="text-green-400 font-medium">{course.language}</span></h2>
            <h2 className="text-black font-semibold">Launch Date: <span className="text-green-400 font-medium">{new Date(course.created_at).toLocaleDateString("IN")}</span></h2>
          </div>

          {/* 🔒 Lock message */}
          {!enrolled && course.course_type === "PAID" && (
            <p className="text-red-500 font-semibold mt-3">
              Purchase this course to watch full videos
            </p>
          )}
        </div>

      </DialogContent>

      <DialogActions className="flex justify-between px-6 py-3">

        <div className="flex gap-3">

     
         {course.course_type=== "FREE" ? (
           <Button
            variant="contained"
            color={enrolled ? "success" : "primary"}
            onClick={!enrolled ? handleEnroll : undefined}
            disabled={loading || enrolled}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> :
              enrolled ? "Enrolled ✅" : "Enroll"}
          </Button>
         ) : (
           <Button
            variant="contained"
            color={enrolled ? "success" : "primary"}
            onClick={purchaseClick}
            // disabled={loading || enrolled}
          >
            Purchase
          </Button>
         )}

        
          
        </div>

        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default CourseDialog;
