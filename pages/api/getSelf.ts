const Student = {
    getSelf: async (token: any) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/getSelfRequest`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            //   if you have to send the data in the server put a body here !
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
        throw new Error(" Something went wrong ! ");
      } catch (error) {
        throw error;
      }
    },
  };
  
  export default Student;
  