const Request = {
  approved: async (token: any, userID: any, data: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/approveRequest/${userID}`,
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
      throw new Error("Some went Wrong ! ");
    } catch (error) {
      throw error;
    }
  },
  approvedReq: async (token: any, userID: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/approveRequest/${userID}`,
        {
          method: "POST",
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
      throw new Error("Some went Wrong ! ");
    } catch (error) {
      throw error;
    }
  },
  update: async (token: any, userID: any, data: any) => {
    try {
      console.log(data.amount, "asdsadsadsad");
      data.status = "waiting for payment";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/updateRequest/${userID}`,
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
      throw new Error("Some went Wrong ! ");
    } catch (error) {
      throw error;
    }
  },
  approvePayment: async (token: any, userID: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/approvePayment/${userID}`,
        {
          method: "POST",
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
      throw new Error("Some went Wrong ! ");
    } catch (error) {
      throw error;
    }
  },
};

export default Request;
