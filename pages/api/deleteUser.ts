const DeleteUser = {
  //for log-in users !
  delete: async (userID: any, token: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deleteUser/${userID}`,
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
      throw new Error("Something went wrong ! ");
    } catch (error) {
      throw error;
    }
  },
};

export default DeleteUser;
