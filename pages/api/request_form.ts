const RequestForm = {
  request: async (data: any, token: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addRequest`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Add Content-Type header
          },
          body: JSON.stringify(data), // Convert data to JSON string
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
      throw new Error("Something went wrong !");
    } catch (error) {
      throw error;
    }
  },
};

export default RequestForm;
