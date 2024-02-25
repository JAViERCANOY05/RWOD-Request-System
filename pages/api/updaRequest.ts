const UpdateRequest = {
  update: async (token: any, data: any, id: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/editSelfRequest/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
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
      throw new Error("Semething went wrong ! ");
    } catch (error) {
      throw error;
    }
  },
};

export default UpdateRequest;
