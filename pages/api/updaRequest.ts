const RequestForm = {
  update: async (token: any, data: any, id: any) => {
    try {
      const formData = new FormData();

      formData.append("studentId", data.studentId);
      formData.append("emailAddress", data.emailAddress);
      formData.append("isOwner", data.isOwner);
      formData.append("documentationType", data.documentationType);
      formData.append("noOfCopies", data.noOfCopies);
      formData.append("purpose", data.purpose);
      formData.append("name", data.name);
      formData.append("year", data.year);
      formData.append("course", data.course);
      formData.append("address", data.address);
      if (data.image) {
        formData.append("image", data.image[0]);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/editSelfRequest/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default RequestForm;
