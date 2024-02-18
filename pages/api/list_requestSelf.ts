const ListRequest = {
  list: async (token: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getSelfRequest`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      {
        if (response.ok) {
          const resData = await response.json();
          return resData;
        }
        throw new Error("Something went wrong  ! ");
      }
    } catch (error) {
      throw error;
    }
  },
};

export default ListRequest;
