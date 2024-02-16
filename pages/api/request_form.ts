const RequestForm = {
  //for log-in users !
  request: async (request_form: any, token: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addRequest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(request_form),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      }
      throw new Error("Something went wrong ! ");
    } catch (error) {
      throw error;
    }
  },
};

export default RequestForm;
