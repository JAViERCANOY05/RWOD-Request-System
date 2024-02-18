const DeleteCourse = {
  delete: async (token: any, courID: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deleteCourse/${courID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      }
      throw new Error("Something went wrongQ");
    } catch (error) {
      throw error;
    }
  },
};

export default DeleteCourse;
